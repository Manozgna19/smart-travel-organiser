
import { TripParams, BudgetBreakdown, TripPlan, TripDay, BudgetRecommendation } from "../types/trip";
import { addDays } from "date-fns";
import { popularDestinations, getDestinationById } from "./destinations";
import { 
  calculateBudgetBreakdown, 
  formatCurrency, 
  generateTravelRecommendations,
  generateFoodRecommendations,
  generateMiscellaneousRecommendations,
  generateAccommodationRecommendations
} from "./budgetUtils";
import { formatDisplayDate } from "./dateUtils";
import { findSuitableDestinations, getBestDestinationCombination } from "./destinationUtils";
import { generateActivities, generateAccommodation, generateMeals } from "./itineraryUtils";
import { generateFlightOptions } from "./flightUtils";
import { generateRestaurantRecommendations } from "./restaurantUtils";

// Generate a complete trip plan
export const generateTripPlan = (params: TripParams): TripPlan => {
  // If no destinations were selected, recommend the best combination
  // Determine max destinations based on budget size
  let maxDestinations = 2; // Default
  
  if (params.budget >= 100000) {
    maxDestinations = 3; // For very high budgets, allow up to 3 destinations
  } else if (params.budget >= 50000) {
    maxDestinations = 2; // For medium budgets, allow up to 2 destinations
  } else {
    maxDestinations = 1; // For smaller budgets, recommend just 1 destination
  }
  
  // Adjust for trip length
  if (params.days >= 10) {
    maxDestinations = Math.min(maxDestinations + 1, 3);
  }
  
  const selectedDestinations = params.destinationPreferences.length > 0 
    ? params.destinationPreferences 
    : getBestDestinationCombination(params.budget, params.days, params.persons, maxDestinations);
  
  // Calculate destination cost factor
  const destinationCostFactor = calculateDestinationCostFactor(selectedDestinations);
  
  // Use the cost factor to adjust the budget breakdown
  const budgetBreakdown = calculateBudgetBreakdown(params, destinationCostFactor);
  
  // Generate budget recommendations
  const travelRecommendations = generateTravelRecommendations(
    budgetBreakdown.travel,
    params.persons,
    destinationCostFactor,
    selectedDestinations
  );
  
  const accommodationRecommendations = generateAccommodationRecommendations(
    budgetBreakdown.accommodation,
    params.days,
    params.persons,
    destinationCostFactor,
    selectedDestinations
  );
  
  // Generate food recommendations based on preferences
  const foodRecommendations = generateFoodRecommendations(
    budgetBreakdown.food,
    params.days,
    params.persons,
    destinationCostFactor,
    selectedDestinations,
    params.foodPreference,
    params.exploreLocalFood
  );
  
  const miscRecommendations = generateMiscellaneousRecommendations(
    budgetBreakdown.miscellaneous,
    params.days,
    params.persons,
    destinationCostFactor
  );

  // Generate restaurant recommendations for each destination
  const restaurantRecommendations = generateRestaurantRecommendations(
    selectedDestinations,
    params.foodPreference,
    budgetBreakdown.food,
    params.persons
  );

  // Generate flight options for the first destination
  const firstDestination = selectedDestinations[0];
  const firstDestObj = getDestinationById(firstDestination);
  const flightOptions = generateFlightOptions(
    budgetBreakdown.travel,
    params.startingLocation,
    firstDestObj?.name || "destination",
    params.persons
  );
  
  // Calculate days per destination - adjust based on destination importance and include travel time
  const daysPerDestination: Record<string, number> = {};
  
  // Calculate required travel days between destinations
  const travelDaysNeeded = selectedDestinations.length > 1 ? selectedDestinations.length - 1 : 0;
  
  // Adjust available days for actual destination stays
  const effectiveDays = params.days - travelDaysNeeded;
  let remainingDays = effectiveDays;
  
  // Prioritize days allocation based on destination popularity and type
  const destinationsWithPriority = selectedDestinations.map(destId => {
    const dest = getDestinationById(destId);
    return {
      id: destId,
      priority: dest ? dest.popularity : 5 // Default to medium priority if not found
    };
  }).sort((a, b) => b.priority - a.priority); // Sort by priority descending
  
  // Allocate days
  destinationsWithPriority.forEach((dest, index) => {
    const isLastDestination = index === destinationsWithPriority.length - 1;
    
    // If it's a higher priority destination or the last one, give it more days
    const daysAtThisDestination = isLastDestination 
      ? remainingDays 
      : Math.max(1, Math.floor(effectiveDays * (dest.priority / 10) * (1.5 / selectedDestinations.length)));
    
    daysPerDestination[dest.id] = Math.min(remainingDays, daysAtThisDestination);
    remainingDays -= daysPerDestination[dest.id];
    
    // Safety check - ensure we don't allocate negative days
    if (remainingDays < 0) remainingDays = 0;
  });
  
  // Make a final balancing pass to ensure all days are allocated
  if (remainingDays > 0) {
    // Distribute remaining days to all destinations
    for (let i = 0; i < remainingDays; i++) {
      const destId = selectedDestinations[i % selectedDestinations.length];
      daysPerDestination[destId] = (daysPerDestination[destId] || 0) + 1;
    }
  }
  
  // Generate itinerary
  const itinerary: TripDay[] = [];
  let currentDay = 1;
  let currentDate = new Date(params.startDate);
  
  // First destination doesn't need a travel day before it
  let previousDestination: string | null = null;
  
  destinationsWithPriority.forEach(destObj => {
    const destId = destObj.id;
    const daysHere = daysPerDestination[destId] || 0;
    const accommodationBudgetPerNight = budgetBreakdown.accommodation / params.days;
    
    // Add a travel day between destinations
    if (previousDestination && selectedDestinations.length > 1) {
      // Create a travel day
      itinerary.push({
        day: currentDay,
        date: new Date(currentDate),
        destination: `Travel from ${getDestinationById(previousDestination)?.name || "previous location"} to ${getDestinationById(destId)?.name || "next location"}`,
        isTransitDay: true,
        activities: [`Travel to ${getDestinationById(destId)?.name || destId}`],
        accommodation: generateAccommodation(destId, accommodationBudgetPerNight),
        meals: generateMeals(params.foodPreference, params.exploreLocalFood)
      });
      
      currentDay++;
      currentDate = addDays(currentDate, 1);
    }
    
    // Add regular days at the destination
    for (let i = 0; i < daysHere; i++) {
      itinerary.push({
        day: currentDay,
        date: new Date(currentDate),
        destination: destId,
        activities: generateActivities(destId, i + 1),
        accommodation: generateAccommodation(destId, accommodationBudgetPerNight),
        meals: generateMeals(params.foodPreference, params.exploreLocalFood)
      });
      
      currentDay++;
      currentDate = addDays(currentDate, 1);
    }
    
    previousDestination = destId;
  });
  
  return {
    id: `trip-${Date.now()}`,
    params,
    destinations: selectedDestinations,
    budgetBreakdown,
    travelRecommendations,
    accommodationRecommendations,
    foodRecommendations,
    miscRecommendations,
    restaurantRecommendations,
    flightOptions,
    itinerary,
    createdAt: new Date()
  };
};

// Calculate the average cost factor of selected destinations
const calculateDestinationCostFactor = (destinationIds: string[]): number => {
  if (!destinationIds.length) return 1.0; // Default if no destinations selected
  
  let totalCostFactor = 0;
  let validDestinationsCount = 0;
  
  destinationIds.forEach(id => {
    const destination = getDestinationById(id);
    if (destination) {
      totalCostFactor += destination.costFactor;
      validDestinationsCount++;
    }
  });
  
  return validDestinationsCount > 0 
    ? totalCostFactor / validDestinationsCount 
    : 1.0;
};

// Export all the functionality from the module files
export { 
  popularDestinations,
  getDestinationById,
  calculateBudgetBreakdown,
  formatCurrency,
  formatDisplayDate
};
