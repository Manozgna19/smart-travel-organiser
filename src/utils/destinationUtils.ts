import { TripParams, BudgetBreakdown, Destination } from "../types/trip";
import { popularDestinations, getBudgetFriendlyDestinations } from "./destinations";

// Find suitable destinations based on budget and preferences
export const findSuitableDestinations = (params: TripParams, budget: BudgetBreakdown): string[] => {
  // If user has selected specific destinations, prioritize those
  if (params.destinationPreferences && params.destinationPreferences.length > 0) {
    // Ensure all selected destinations exist
    const validDestinations = params.destinationPreferences.filter(destId => 
      popularDestinations.some(dest => dest.id === destId)
    );
    
    // If we have valid selections, return them (limited by trip length)
    if (validDestinations.length > 0) {
      const maxDestinations = Math.min(validDestinations.length, Math.ceil(params.days / 2));
      return validDestinations.slice(0, maxDestinations);
    }
  }
  
  // Fallback to algorithm-based selection
  const dailyBudget = budget.total / (params.days * params.persons);
  
  // Calculate a reasonable cost factor based on budget
  // Lower budget means we need more affordable destinations
  const maxAffordableCostFactor = dailyBudget / 2000; // Adjusted baseline for better filtering
  
  // Get destinations that fit within budget
  let affordableDestinations = popularDestinations
    .filter(dest => dest.costFactor <= maxAffordableCostFactor)
    .sort((a, b) => {
      // Complex sorting algorithm that combines:
      // 1. Popularity (higher is better)
      // 2. Value for money (lower cost factor relative to budget is better)
      const aValueRatio = a.popularity / a.costFactor;
      const bValueRatio = b.popularity / b.costFactor;
      return bValueRatio - aValueRatio;
    })
    .map(dest => dest.id);
  
  // If we have no affordable destinations, get the most budget-friendly ones
  if (affordableDestinations.length === 0) {
    affordableDestinations = getBudgetFriendlyDestinations(1.5) // Lower threshold for budget options
      .sort((a, b) => a.costFactor - b.costFactor) // Sort by increasing cost
      .map(dest => dest.id);
  }
  
  // Ensure diverse state selection - avoid too many destinations from same state
  const selectedDestinations: string[] = [];
  const selectedStates = new Set<string>();
  
  // First pass: select destinations from different states
  for (const destId of affordableDestinations) {
    const dest = popularDestinations.find(d => d.id === destId);
    if (dest && !selectedStates.has(dest.state)) {
      selectedDestinations.push(destId);
      selectedStates.add(dest.state);
      
      // Limit selections based on trip length
      if (selectedDestinations.length >= Math.min(3, Math.ceil(params.days / 2))) {
        break;
      }
    }
  }
  
  // Second pass: if we don't have enough destinations, add more regardless of state
  if (selectedDestinations.length < Math.ceil(params.days / 3)) {
    for (const destId of affordableDestinations) {
      if (!selectedDestinations.includes(destId)) {
        selectedDestinations.push(destId);
        
        if (selectedDestinations.length >= Math.ceil(params.days / 2)) {
          break;
        }
      }
    }
  }
  
  // Prioritize multi-destination trips but ensure we stay within budget
  // Try to offer at least 2 destinations if the trip is long enough
  if (params.days >= 4 && selectedDestinations.length < 2 && affordableDestinations.length >= 2) {
    return affordableDestinations.slice(0, 2);
  }
  
  return selectedDestinations;
};

// Calculate destination affordability more precisely
export const getDestinationAffordability = (
  destination: Destination, 
  dailyBudget: number
): 'budget' | 'moderate' | 'luxury' => {
  // More precise calculation based on real daily costs
  const affordabilityRatio = dailyBudget / (2000 * destination.costFactor);
  
  if (affordabilityRatio < 0.8) return 'luxury'; // More expensive than budget allows
  if (affordabilityRatio < 1.2) return 'moderate'; // Just within budget
  return 'budget'; // Comfortably within budget
};

// Calculate if a destination is affordable for a given budget
export const isDestinationAffordable = (
  destination: Destination,
  budget: number,
  days: number,
  persons: number
): boolean => {
  const dailyBudget = budget / (days * persons);
  // A destination is affordable if it's not a luxury option
  const affordability = getDestinationAffordability(destination, dailyBudget);
  return affordability !== 'luxury';
};

// Get the best combination of destinations within budget
export const getBestDestinationCombination = (
  budget: number,
  days: number,
  persons: number,
  maxDestinations: number = 2,
  startingLocation: string = ""
): string[] => {
  const dailyBudget = budget / (days * persons);
  
  // Determine max destinations based on budget size
  let actualMaxDestinations = maxDestinations;
  
  // Dynamically adjust max destinations based on budget size
  if (budget >= 100000) {
    actualMaxDestinations = 3; // For very high budgets, allow up to 3 destinations
  } else if (budget >= 50000) {
    actualMaxDestinations = 2; // For medium budgets, allow up to 2 destinations
  } else {
    actualMaxDestinations = 1; // For smaller budgets, recommend just 1 destination
  }
  
  // For longer trips, we may want to visit more places
  if (days >= 10) {
    actualMaxDestinations = Math.min(actualMaxDestinations + 1, 3);
  }
  
  // Find the starting location destination ID (if it exists in our destinations)
  const startingLocationDestination = popularDestinations.find(
    dest => dest.name.toLowerCase() === startingLocation.toLowerCase()
  );
  
  // Filter to affordable destinations and exclude the starting location
  const affordableDestinations = popularDestinations.filter(dest => {
    const affordability = getDestinationAffordability(dest, dailyBudget);
    const isNotStartingLocation = !startingLocationDestination || 
                                 dest.id !== startingLocationDestination.id;
    return affordability !== 'luxury' && isNotStartingLocation;
  });
  
  // If no affordable destinations, return the cheapest one that's not the starting location
  if (affordableDestinations.length === 0) {
    const cheapestDests = popularDestinations.sort((a, b) => a.costFactor - b.costFactor);
    // Filter out starting location
    const eligibleDests = cheapestDests.filter(dest => 
      !startingLocationDestination || dest.id !== startingLocationDestination.id
    );
    return eligibleDests.length > 0 ? [eligibleDests[0].id] : [];
  }
  
  // If only one affordable destination, return it
  if (affordableDestinations.length === 1) {
    return [affordableDestinations[0].id];
  }
  
  // Introduce some variability in recommendations based on budget
  // Lower budget favors cheaper destinations, higher budget favors more popular destinations
  const isBudgetOriented = budget < 30000; // Threshold to determine if we focus on budget
  
  // Add randomization factor to provide variety in recommendations
  const randomFactor = Math.random() * 0.3; // Random factor of up to 30%
  
  // Sort criteria changes based on budget orientation with randomization
  const sortedDestinations = [...affordableDestinations].sort((a, b) => {
    if (isBudgetOriented) {
      // Budget oriented: prioritize cost factor first, then popularity with randomization
      return a.costFactor === b.costFactor 
        ? (b.popularity * (1 + randomFactor)) - a.popularity // If same cost, higher popularity wins
        : a.costFactor - b.costFactor; // Lower cost wins
    } else {
      // Experience oriented: prioritize popularity first, then cost factor with randomization
      return a.popularity === b.popularity
        ? a.costFactor - b.costFactor // If same popularity, lower cost wins
        : (b.popularity * (1 + randomFactor)) - (a.popularity * (1 - randomFactor)); // Higher popularity wins
    }
  });
  
  // Try to include destinations from different states
  const selectedDestinations: Destination[] = [];
  const selectedStates = new Set<string>();
  
  // First pass: try to get destinations from different states
  for (const dest of sortedDestinations) {
    if (selectedDestinations.length >= actualMaxDestinations) break;
    
    // If we already have a destination from this state, skip it unless we're running out of options
    if (selectedStates.has(dest.state) && selectedDestinations.length < actualMaxDestinations - 1) {
      continue;
    }
    
    selectedDestinations.push(dest);
    selectedStates.add(dest.state);
  }
  
  // If we couldn't fill all slots with different states, add more regardless of state
  if (selectedDestinations.length < actualMaxDestinations && sortedDestinations.length > selectedDestinations.length) {
    for (const dest of sortedDestinations) {
      if (!selectedDestinations.includes(dest) && selectedDestinations.length < actualMaxDestinations) {
        selectedDestinations.push(dest);
      }
    }
  }
  
  return selectedDestinations.map(dest => dest.id);
};

