import { BudgetRecommendation, BudgetBreakdown, TripParams } from "@/types/trip";
import { getDestinationById } from "./destinations";

// Calculate budget breakdown based on trip parameters
export const calculateBudgetBreakdown = (params: TripParams, destinationCostFactor: number = 1.0): BudgetBreakdown => {
  const { budget, days, persons } = params;
  
  // Default budget allocation percentages
  const defaultPercentages = {
    travel: 0.30,       // 30% for travel (flights, trains, etc.)
    accommodation: 0.35, // 35% for accommodation
    food: 0.20,         // 20% for food
    activities: 0.10,   // 10% for activities
    miscellaneous: 0.05  // 5% for miscellaneous expenses
  };
  
  // Adjust percentages based on trip duration
  let percentages = { ...defaultPercentages };
  
  // For longer trips, reduce the relative travel percentage
  if (days > 7) {
    percentages.travel = 0.25;
    percentages.accommodation = 0.40;
    percentages.food = 0.20;
    percentages.activities = 0.10;
    percentages.miscellaneous = 0.05;
  } else if (days <= 3) {
    // For shorter trips, increase travel and reduce accommodation
    percentages.travel = 0.35;
    percentages.accommodation = 0.30;
    percentages.food = 0.20;
    percentages.activities = 0.10;
    percentages.miscellaneous = 0.05;
  }
  
  // The original budget is what matters - don't apply the cost factor to the total
  const totalBudget = budget;
  
  // Calculate breakdown with destination cost factor applied to individual components
  // This ensures the total equals the user's original budget
  const breakdown = {
    travel: Math.round(totalBudget * percentages.travel * destinationCostFactor),
    accommodation: Math.round(totalBudget * percentages.accommodation * destinationCostFactor),
    food: Math.round(totalBudget * percentages.food * destinationCostFactor),
    activities: Math.round(totalBudget * percentages.activities * destinationCostFactor),
    miscellaneous: Math.round(totalBudget * percentages.miscellaneous * destinationCostFactor),
    total: totalBudget // This ensures the total equals the user's original budget
  };
  
  // Recalculate components to ensure they sum to the exact budget
  // Calculate the sum of all categories
  const calculatedSum = breakdown.travel + breakdown.accommodation + 
                       breakdown.food + breakdown.activities + 
                       breakdown.miscellaneous;
  
  // Adjust the largest category to make the total match exactly
  const diff = totalBudget - calculatedSum;
  
  if (diff !== 0) {
    // Find the largest category to apply the adjustment
    let largestCategory: keyof BudgetBreakdown = 'accommodation';
    let largestAmount = breakdown.accommodation;
    
    if (breakdown.travel > largestAmount) {
      largestCategory = 'travel';
      largestAmount = breakdown.travel;
    }
    
    // Apply the adjustment
    breakdown[largestCategory] += diff;
  }
  
  return breakdown;
};

// Format currency in Indian Rupees format
export const formatCurrency = (amount: number): string => {
  return `₹${amount.toLocaleString('en-IN')}`;
};

// Generate travel recommendations based on budget
export const generateTravelRecommendations = (
  travelBudget: number,
  persons: number,
  costFactor: number,
  destinations: string[] = []
): BudgetRecommendation[] => {
  const perPersonBudget = travelBudget / persons;
  const recommendations: BudgetRecommendation[] = [];
  
  // Basic travel options
  if (perPersonBudget < 5000) {
    // Budget travel options
    recommendations.push({
      name: "Public Transport",
      cost: 1500 * costFactor,
      description: "Use local buses and trains for intercity travel"
    });
    recommendations.push({
      name: "Shared cabs",
      cost: 2500 * costFactor,
      description: "Book shared cab rides between destinations"
    });
  } else if (perPersonBudget < 10000) {
    // Mid-range travel options
    recommendations.push({
      name: "Taxi/Private Cabs",
      cost: 6000 * costFactor,
      description: "Convenient door-to-door travel with private cabs"
    });
    recommendations.push({
      name: "Economy Flight",
      cost: 5000 * costFactor,
      description: "Economy class flights for longer distances"
    });
  } else {
    // Premium travel options
    recommendations.push({
      name: "Premium Cabs",
      cost: 8000 * costFactor,
      description: "Luxury vehicles with experienced drivers"
    });
    recommendations.push({
      name: "Business Class Flights",
      cost: 15000 * costFactor,
      description: "Comfortable business class travel for longer journeys"
    });
    recommendations.push({
      name: "Private Vehicle Rental",
      cost: 12000 * costFactor,
      description: "Rent a private vehicle for the duration of your trip"
    });
  }
  
  // Add destination-specific travel options
  if (destinations.length > 0) {
    const firstDest = getDestinationById(destinations[0]);
    if (firstDest) {
      if (firstDest.type === 'mountain') {
        recommendations.push({
          name: "Mountain Special Transport",
          cost: 4000 * costFactor,
          description: "Special vehicles suitable for mountain terrain"
        });
      } else if (firstDest.type === 'beach') {
        recommendations.push({
          name: "Beach Town Transport",
          cost: 3000 * costFactor,
          description: "Local transport options ideal for beach destinations"
        });
      }
    }
  }
  
  return recommendations.slice(0, 3);
};

// Generate accommodation recommendations
export const generateAccommodationRecommendations = (
  accommodationBudget: number,
  days: number,
  persons: number,
  costFactor: number,
  destinations: string[] = []
): BudgetRecommendation[] => {
  const perPersonPerNightBudget = accommodationBudget / (days * persons);
  const recommendations: BudgetRecommendation[] = [];
  
  // Real hotel recommendations based on budget tier
  if (perPersonPerNightBudget < 1000) {
    // Budget accommodations
    recommendations.push({
      name: "Budget Hostels",
      cost: 800 * costFactor,
      description: "Clean, basic hostels with shared facilities"
    });
    recommendations.push({
      name: "Guest Houses",
      cost: 950 * costFactor,
      description: "Local guest houses with basic amenities"
    });
  } else if (perPersonPerNightBudget < 3000) {
    // Mid-range accommodations
    recommendations.push({
      name: "3-Star Hotels",
      cost: 2500 * costFactor,
      description: "Comfortable rooms with standard amenities"
    });
    recommendations.push({
      name: "Boutique Stays",
      cost: 2800 * costFactor,
      description: "Unique, locally-owned boutique accommodations"
    });
  } else {
    // Luxury accommodations
    recommendations.push({
      name: "5-Star Luxury Hotels",
      cost: 8000 * costFactor,
      description: "Premium accommodations with excellent amenities"
    });
    recommendations.push({
      name: "Heritage Properties",
      cost: 12000 * costFactor,
      description: "Stay in historic properties converted to luxury hotels"
    });
    recommendations.push({
      name: "Resort Villas",
      cost: 15000 * costFactor,
      description: "Private villas with dedicated staff and services"
    });
  }
  
  // Add destination-specific accommodations
  if (destinations.length > 0) {
    const firstDest = getDestinationById(destinations[0]);
    if (firstDest) {
      if (firstDest.type === 'beach') {
        recommendations.push({
          name: "Beachfront Resort",
          cost: Math.min(perPersonPerNightBudget * 1.2, 20000) * costFactor,
          description: "Resort with direct beach access and sea views"
        });
      } else if (firstDest.type === 'mountain') {
        recommendations.push({
          name: "Mountain View Cottages",
          cost: Math.min(perPersonPerNightBudget * 1.1, 18000) * costFactor,
          description: "Cozy cottages with panoramic mountain views"
        });
      } else if (firstDest.type === 'historical') {
        recommendations.push({
          name: "Heritage Stay",
          cost: Math.min(perPersonPerNightBudget * 1.3, 25000) * costFactor,
          description: "Accommodations in restored historical buildings"
        });
      }
    }
  }
  
  return recommendations.slice(0, 3);
};

// Update the generateFoodRecommendations function to include food preferences
export const generateFoodRecommendations = (
  foodBudget: number,
  days: number,
  persons: number,
  costFactor: number,
  destinations: string[] = [],
  foodPreference: 'vegetarian' | 'non-vegetarian' | 'no-preference' = 'no-preference',
  exploreLocalFood: boolean = true
): BudgetRecommendation[] => {
  // Calculate per person per day food budget
  const perPersonPerDayBudget = foodBudget / (days * persons);
  
  // Base recommendations
  const recommendations: BudgetRecommendation[] = [];
  
  // Food options based on preference
  const foodOptions = {
    vegetarian: [
      { name: "Local vegetarian thalis", cost: 200 * costFactor, description: "Authentic vegetarian thali meals at local restaurants" },
      { name: "South Indian vegetarian fare", cost: 250 * costFactor, description: "Dosas, idlis, and other South Indian specialties" },
      { name: "North Indian vegetarian cuisine", cost: 300 * costFactor, description: "Paneer dishes, rotis, and vegetable curries" },
    ],
    nonVegetarian: [
      { name: "Local meat specialties", cost: 350 * costFactor, description: "Regional non-vegetarian specialties" },
      { name: "Seafood options", cost: 400 * costFactor, description: "Fresh seafood dishes where available" },
      { name: "Mixed cuisine restaurants", cost: 450 * costFactor, description: "Restaurants offering both veg and non-veg options" },
    ],
    noPreference: [
      { name: "Mixed local cuisine", cost: 300 * costFactor, description: "A mix of vegetarian and non-vegetarian local options" },
      { name: "Street food experiences", cost: 200 * costFactor, description: "Local street food from various vendors" },
      { name: "Restaurant dining", cost: 400 * costFactor, description: "Sit-down meals at various restaurants" },
    ]
  };
  
  // Premium options
  const premiumOptions = {
    vegetarian: [
      { name: "Fine dining vegetarian restaurants", cost: 800 * costFactor, description: "Upscale vegetarian dining experiences" },
      { name: "Vegetarian food tours", cost: 600 * costFactor, description: "Guided vegetarian food tours with multiple tastings" },
    ],
    nonVegetarian: [
      { name: "Signature non-veg restaurants", cost: 1000 * costFactor, description: "Renowned restaurants specializing in meat dishes" },
      { name: "Seafood fine dining", cost: 1200 * costFactor, description: "Premium seafood restaurants and experiences" },
    ],
    noPreference: [
      { name: "Premium dining experiences", cost: 1000 * costFactor, description: "Top-rated restaurants in each destination" },
      { name: "Chef's table experiences", cost: 1500 * costFactor, description: "Exclusive dining with custom menus" },
    ]
  };
  
  // Budget-friendly options
  const budgetOptions = {
    vegetarian: [
      { name: "Self-catering with local produce", cost: 150 * costFactor, description: "Buy ingredients from local markets and prepare simple meals" },
      { name: "Budget vegetarian eateries", cost: 180 * costFactor, description: "Affordable pure vegetarian food joints" },
    ],
    nonVegetarian: [
      { name: "Budget non-veg eateries", cost: 220 * costFactor, description: "Affordable meat and seafood options at local joints" },
      { name: "Mixed budget restaurants", cost: 250 * costFactor, description: "Affordable restaurants with variety of options" },
    ],
    noPreference: [
      { name: "Street food and local snacks", cost: 150 * costFactor, description: "Affordable street food options throughout the day" },
      { name: "Budget dining options", cost: 200 * costFactor, description: "Mix of affordable restaurants and food stalls" },
    ]
  };
  
  // Get the appropriate options based on preference
  const preferenceKey = foodPreference === 'vegetarian' 
    ? 'vegetarian' 
    : foodPreference === 'non-vegetarian' 
    ? 'nonVegetarian' 
    : 'noPreference';
  
  // Add options based on budget
  if (perPersonPerDayBudget < 500) {
    // Budget traveler
    recommendations.push(...budgetOptions[preferenceKey as keyof typeof budgetOptions]);
  } else if (perPersonPerDayBudget < 1000) {
    // Regular traveler
    recommendations.push(...foodOptions[preferenceKey as keyof typeof foodOptions]);
  } else {
    // Luxury traveler
    recommendations.push(...premiumOptions[preferenceKey as keyof typeof premiumOptions]);
    // Also add some regular options
    recommendations.push(foodOptions[preferenceKey as keyof typeof foodOptions][0]);
  }
  
  // If explore local food is true, add some special local food recommendations
  if (exploreLocalFood) {
    recommendations.push({
      name: "Local cuisine exploration",
      cost: 400 * costFactor,
      description: "Special focus on regional delicacies and authentic local cuisine"
    });
    
    recommendations.push({
      name: "Cooking class experience",
      cost: 600 * costFactor,
      description: "Learn to cook local dishes with expert chefs"
    });
  } else {
    // Add some familiar food options
    recommendations.push({
      name: "Familiar cuisine restaurants",
      cost: 500 * costFactor,
      description: "Restaurants serving familiar international cuisine"
    });
  }
  
  return recommendations.slice(0, 4);
};

// Generate miscellaneous recommendations
export const generateMiscellaneousRecommendations = (
  miscBudget: number,
  days: number,
  persons: number,
  costFactor: number
): BudgetRecommendation[] => {
  const perPersonBudget = miscBudget / persons;
  const recommendations: BudgetRecommendation[] = [];
  
  // Basic recommendations
  recommendations.push({
    name: "Local SIM Card",
    cost: 300 * costFactor,
    description: "Mobile connectivity with data for navigation and calls"
  });
  
  // Add recommendations based on budget
  if (perPersonBudget < 1000) {
    recommendations.push({
      name: "Souvenir Shopping",
      cost: 500 * costFactor,
      description: "Budget for small souvenirs and mementos"
    });
  } else if (perPersonBudget < 3000) {
    recommendations.push({
      name: "Professional Photography",
      cost: 2000 * costFactor,
      description: "Hire a photographer for a day at select destinations"
    });
    recommendations.push({
      name: "Shopping Budget",
      cost: 1500 * costFactor,
      description: "Budget for local handicrafts and gifts"
    });
  } else {
    recommendations.push({
      name: "Luxury Shopping",
      cost: 5000 * costFactor,
      description: "Shopping for high-quality local products and crafts"
    });
    recommendations.push({
      name: "Wellness Services",
      cost: 3000 * costFactor,
      description: "Spa treatments and wellness experiences"
    });
  }
  
  return recommendations.slice(0, 3);
};
