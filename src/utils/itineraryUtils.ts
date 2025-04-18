import { DestinationType } from "@/types/trip";
import { getDestinationById } from "./destinations";

// Famous landmarks and attractions for each destination
const famousPlaces: Record<string, string[]> = {
  "goa": ["Calangute Beach", "Basilica of Bom Jesus", "Fort Aguada", "Anjuna Beach", "Dudhsagar Falls"],
  "jaipur": ["Amber Fort", "Hawa Mahal", "City Palace", "Jantar Mantar", "Jal Mahal"],
  "varanasi": ["Dashashwamedh Ghat", "Kashi Vishwanath Temple", "Sarnath", "Assi Ghat", "Ramnagar Fort"],
  "darjeeling": ["Tiger Hill", "Darjeeling Himalayan Railway", "Batasia Loop", "Peace Pagoda", "Happy Valley Tea Estate"],
  "mumbai": ["Gateway of India", "Marine Drive", "Elephanta Caves", "Chhatrapati Shivaji Terminus", "Juhu Beach"],
  "ranthambore": ["Ranthambore Fort", "Padam Talao", "Jogi Mahal", "Trinetra Ganesh Temple", "Safari zones"],
  "munnar": ["Eravikulam National Park", "Tea Gardens", "Mattupetty Dam", "Echo Point", "Atukkad Waterfalls"],
  "rishikesh": ["Laxman Jhula", "Ram Jhula", "Triveni Ghat", "Beatles Ashram", "Neelkanth Mahadev Temple"],
  "udaipur": ["City Palace", "Lake Pichola", "Jag Mandir", "Jagdish Temple", "Fateh Sagar Lake"],
  "andaman": ["Radhanagar Beach", "Cellular Jail", "Ross Island", "North Bay Island", "Baratang Island"],
  "ladakh": ["Pangong Lake", "Nubra Valley", "Magnetic Hill", "Shanti Stupa", "Hemis Monastery"],
  "kaziranga": ["Kaziranga National Park Safari", "Orchid Park", "Kakochang Waterfall", "Deopahar Archaeological Site"],
  "hampi": ["Virupaksha Temple", "Vittala Temple & Stone Chariot", "Hampi Bazaar", "Lotus Mahal", "Elephant Stables"],
  "khajuraho": ["Western Group of Temples", "Eastern Group of Temples", "Raneh Falls", "Panna National Park", "Archeological Museum"],
  "kodaikanal": ["Kodaikanal Lake", "Coaker's Walk", "Bryant Park", "Pillar Rocks", "Silver Cascade Falls"],
  "mahabalipuram": ["Shore Temple", "Pancha Rathas", "Arjuna's Penance", "Krishna's Butter Ball", "Tiger Cave"],
  "pushkar": ["Pushkar Lake", "Brahma Temple", "Savitri Temple", "Pushkar Camel Fair Grounds", "Rose Garden"],
  "shillong": ["Elephant Falls", "Shillong Peak", "Ward's Lake", "Don Bosco Museum", "Umiam Lake"],
  "amritsar": ["Golden Temple", "Jallianwala Bagh", "Wagah Border", "Gobindgarh Fort", "Durgiana Temple"],
  "kochi": ["Fort Kochi", "Chinese Fishing Nets", "Mattancherry Palace", "St. Francis Church", "Kochi Marina"]
};

const getLocalActivities = (destination: string, dayNumber: number): string[] => {
  const dest = getDestinationById(destination);
  if (!dest) return ["Explore the local area"];
  
  // Get famous places for this destination
  const destinationPlaces = famousPlaces[destination] || [];
  
  // Base activities based on destination type
  let baseActivities: string[] = [];
  
  switch (dest.type) {
    case 'beach':
      baseActivities = dayNumber === 1 
        ? ["Enjoy beach activities", "Try water sports"] 
        : ["Boat excursion", "Visit nearby coastal areas"];
      break;
    case 'mountain':
      baseActivities = dayNumber === 1 
        ? ["Hiking expedition", "Visit mountain viewpoints"] 
        : ["Visit local mountain villages", "Mountain adventure activities"];
      break;
    case 'city':
      baseActivities = dayNumber === 1 
        ? ["City tour", "Shopping at local markets"] 
        : ["Visit museums", "Experience local culture"];
      break;
    case 'wildlife':
      baseActivities = dayNumber === 1 
        ? ["Wildlife safari", "Bird watching"] 
        : ["Nature trail", "Visit conservation centers"];
      break;
    case 'historical':
      baseActivities = dayNumber === 1 
        ? ["Guided history tour", "Visit museums"] 
        : ["Explore historical ruins", "Cultural workshops"];
      break;
    case 'spiritual':
      baseActivities = dayNumber === 1 
        ? ["Temple/Shrine visits", "Meditation session"] 
        : ["Yoga class", "Participate in local rituals"];
      break;
    default:
      baseActivities = ["Explore local attractions", "Relaxation time"];
  }
  
  // Select 2-3 famous places based on the day number to spread them across days
  const placesToVisit: string[] = [];
  if (destinationPlaces.length > 0) {
    // For day 1, take first 2 famous places
    if (dayNumber === 1 && destinationPlaces.length >= 2) {
      placesToVisit.push(`Visit ${destinationPlaces[0]}`);
      placesToVisit.push(`Explore ${destinationPlaces[1]}`);
    } 
    // For day 2, take next 2 famous places
    else if (dayNumber === 2 && destinationPlaces.length >= 4) {
      placesToVisit.push(`Visit ${destinationPlaces[2]}`);
      placesToVisit.push(`Explore ${destinationPlaces[3]}`);
    }
    // For day 3 and beyond, take remaining places or cycle through
    else {
      const index1 = (dayNumber * 2) % destinationPlaces.length;
      const index2 = (dayNumber * 2 + 1) % destinationPlaces.length;
      placesToVisit.push(`Visit ${destinationPlaces[index1]}`);
      if (index1 !== index2) { // Avoid duplicates
        placesToVisit.push(`Explore ${destinationPlaces[index2]}`);
      }
    }
  }
  
  // Combine base activities with famous places
  return [...placesToVisit, ...baseActivities.slice(0, 2)];
};

export const generateActivities = (destination: string, dayNumber: number): string[] => {
  const activities = getLocalActivities(destination, dayNumber);
  
  // Add some generic activities
  const genericActivities = [
    "Take photos of the beautiful scenery",
    "Meet with local residents",
    "Shop for souvenirs",
    "Enjoy the local atmosphere",
    "Try traditional food at a local restaurant"
  ];
  
  // Pick 1 generic activity
  const selectedGeneric = genericActivities
    .sort(() => 0.5 - Math.random())
    .slice(0, 1);
  
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