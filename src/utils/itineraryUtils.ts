
import { DestinationType } from "@/types/trip";
import { getDestinationById } from "./destinations";

const getLocalActivities = (destination: string, dayNumber: number): string[] => {
  const dest = getDestinationById(destination);
  if (!dest) return ["Explore the local area"];
  
  switch (dest.type) {
    case 'beach':
      return dayNumber === 1 
        ? ["Visit the beach", "Try water sports", "Relax by the shore"] 
        : ["Boat excursion", "Visit nearby islands", "Beachside meditation session"];
    case 'mountain':
      return dayNumber === 1 
        ? ["Hiking expedition", "Mountain viewpoint visit", "Nature photography"] 
        : ["Visit local villages", "Mountain biking", "Wildlife spotting"];
    case 'city':
      return dayNumber === 1 
        ? ["City tour", "Visit main attractions", "Shopping at local markets"] 
        : ["Museum visit", "Cultural show", "Visit historical sites"];
    case 'wildlife':
      return dayNumber === 1 
        ? ["Safari", "Bird watching", "Visit wildlife sanctuary"] 
        : ["Nature trail", "Visit conservation center", "Wildlife photography"];
    case 'historical':
      return dayNumber === 1 
        ? ["Visit main historical sites", "Guided history tour", "Visit museums"] 
        : ["Visit off-beat historical locations", "Cultural workshop", "Local history exploration"];
    case 'spiritual':
      return dayNumber === 1 
        ? ["Temple/Shrine visit", "Meditation session", "Spiritual discourse"] 
        : ["Yoga class", "Visit sacred sites", "Participate in local rituals"];
    default:
      return ["Explore local attractions", "Try local activities", "Relaxation time"];
  }
};

export const generateActivities = (destination: string, dayNumber: number): string[] => {
  const activities = getLocalActivities(destination, dayNumber);
  
  // Add some generic activities
  const genericActivities = [
    "Take photos of the beautiful scenery",
    "Meet with local residents",
    "Shop for souvenirs",
    "Enjoy the local atmosphere"
  ];
  
  // Pick 1-2 generic activities
  const selectedGeneric = genericActivities
    .sort(() => 0.5 - Math.random())
    .slice(0, Math.floor(Math.random() * 2) + 1);
  
  return [...activities, ...selectedGeneric];
};

export const generateAccommodation = (destination: string, budgetPerNight: number): string => {
  const dest = getDestinationById(destination);
  
  // Based on budget and destination type, suggest accommodation
  if (!dest) return "Standard hotel accommodation";
  
  const accommodationTypes = {
    low: [
      "Budget-friendly guesthouse",
      "Hostel dormitory",
      "Homestay with locals",
      "Budget hotel"
    ],
    medium: [
      "Mid-range hotel",
      "Tourist class accommodation",
      "Serviced apartment",
      "Boutique guesthouse"
    ],
    high: [
      "Luxury resort",
      "Premium hotel suite",
      "Boutique heritage hotel",
      "High-end serviced villa"
    ]
  };
  
  let budgetCategory = "medium";
  
  if (budgetPerNight < 1000) {
    budgetCategory = "low";
  } else if (budgetPerNight > 5000) {
    budgetCategory = "high";
  }
  
  // Add some destination-specific flavor
  const accommodationPool = accommodationTypes[budgetCategory as keyof typeof accommodationTypes];
  const selectedAccommodation = accommodationPool[Math.floor(Math.random() * accommodationPool.length)];
  
  // Add destination flavor
  switch (dest.type) {
    case 'beach':
      return `${selectedAccommodation} with sea views in ${dest.name}`;
    case 'mountain':
      return `${selectedAccommodation} with mountain views in ${dest.name}`;
    case 'city':
      return `Centrally located ${selectedAccommodation} in ${dest.name}`;
    case 'wildlife':
      return `${selectedAccommodation} near the wildlife sanctuary in ${dest.name}`;
    case 'historical':
      return `${selectedAccommodation} in the historical district of ${dest.name}`;
    case 'spiritual':
      return `${selectedAccommodation} near spiritual sites in ${dest.name}`;
    default:
      return `${selectedAccommodation} in ${dest.name}`;
  }
};

export const generateMeals = (
  preference: 'vegetarian' | 'non-vegetarian' | 'no-preference' = 'no-preference',
  exploreLocalFood: boolean = true
): string[] => {
  const vegetarianOptions = [
    "Vegetarian thali with seasonal vegetables",
    "Paneer butter masala with naan",
    "Masala dosa with coconut chutney",
    "Vegetable biryani with raita",
    "Palak paneer with steamed rice"
  ];
  
  const nonVegetarianOptions = [
    "Butter chicken with garlic naan",
    "Mutton biryani with raita",
    "Fish curry with steamed rice",
    "Chicken tikka with mint chutney",
    "Rogan josh with saffron rice"
  ];
  
  const standardMeals = [
    "Continental breakfast at the hotel", 
    "Lunch at a recommended restaurant",
    "Dinner at the accommodation restaurant"
  ];
  
  const localFoodExperiences = [
    "Breakfast with local specialties",
    "Street food tasting for lunch",
    "Authentic regional cuisine dinner experience"
  ];
  
  let meals: string[] = [];
  
  if (exploreLocalFood) {
    // Mix of standard and local food experiences
    meals = localFoodExperiences;
  } else {
    // Mostly standard meals with occasional local touch
    meals = standardMeals;
  }
  
  // Adjust based on food preference
  if (preference === 'vegetarian') {
    const vegMeal = vegetarianOptions[Math.floor(Math.random() * vegetarianOptions.length)];
    meals[2] = meals[2] + ` (${vegMeal})`;
  } else if (preference === 'non-vegetarian') {
    const nonVegMeal = nonVegetarianOptions[Math.floor(Math.random() * nonVegetarianOptions.length)];
    meals[2] = meals[2] + ` (${nonVegMeal})`;
  } else {
    // No preference - mix of both
    const allOptions = [...vegetarianOptions, ...nonVegetarianOptions];
    const randomMeal = allOptions[Math.floor(Math.random() * allOptions.length)];
    meals[2] = meals[2] + ` (${randomMeal})`;
  }
  
  return meals;
};
