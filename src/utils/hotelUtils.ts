
import { getDestinationById } from "./destinations";

// List of hotel chains in India
const hotelChains = [
  "Taj Hotels", 
  "Oberoi Hotels", 
  "ITC Hotels", 
  "Leela Palaces",
  "Radisson", 
  "Marriott", 
  "Hyatt", 
  "Novotel",
  "OYO Rooms",
  "Fabhotels",
  "Treebo"
];

export interface HotelOption {
  name: string;
  chain: string;
  pricePerNight: number;
  rating: number; // 1-5 stars
  amenities: string[];
  distanceFromAttraction: string; // e.g., "1.2 km"
  thumbnailUrl?: string;
}

/**
 * Generate hotel options based on destination and budget
 */
export const generateHotelOptions = (
  destinationId: string,
  budget: number,
  days: number,
  persons: number,
  maxOptions: number = 3
): HotelOption[] => {
  const hotelOptions: HotelOption[] = [];
  const destination = getDestinationById(destinationId);
  
  if (!destination) {
    return [];
  }
  
  // Calculate budget per night
  const budgetPerNight = (budget * 0.4) / days; // Allocate 40% of budget to accommodation
  const budgetPerRoom = budgetPerNight / Math.ceil(persons / 2); // Assume 2 persons per room
  
  // Destination cost factor affects hotel prices
  const destinationFactor = destination.costFactor;
  
  // Generate budget hotel options
  if (budgetPerRoom >= 1000) {
    const budgetHotel: HotelOption = {
      name: `${destination.name} ${["Inn", "Lodge", "Stays", "Rooms"][Math.floor(Math.random() * 4)]}`,
      chain: hotelChains[Math.floor(Math.random() * 3) + 8], // Budget chains
      pricePerNight: Math.floor(Math.random() * 500) + (1000 * destinationFactor),
      rating: Math.floor(Math.random() * 2) + 2, // 2-3 stars
      amenities: [
        "Free Wi-Fi",
        "Air Conditioning",
        "TV"
      ],
      distanceFromAttraction: `${(Math.random() * 3 + 1).toFixed(1)} km`
    };
    hotelOptions.push(budgetHotel);
  }
  
  // Generate mid-range hotel options
  if (budgetPerRoom >= 3000) {
    const midRangeHotel: HotelOption = {
      name: `${["Hotel", "Suites", "Residency"][Math.floor(Math.random() * 3)]} ${destination.name}`,
      chain: hotelChains[Math.floor(Math.random() * 4) + 4], // Mid-range chains
      pricePerNight: Math.floor(Math.random() * 1000) + (3000 * destinationFactor),
      rating: Math.floor(Math.random() * 2) + 3, // 3-4 stars
      amenities: [
        "Free Wi-Fi",
        "Air Conditioning",
        "Room Service",
        "Restaurant",
        "Swimming Pool"
      ],
      distanceFromAttraction: `${(Math.random() * 1 + 0.5).toFixed(1)} km`
    };
    hotelOptions.push(midRangeHotel);
  }
  
  // Generate luxury hotel options
  if (budgetPerRoom >= 6000) {
    const luxuryHotel: HotelOption = {
      name: `${hotelChains[Math.floor(Math.random() * 4)]} ${destination.name}`,
      chain: hotelChains[Math.floor(Math.random() * 4)], // Luxury chains
      pricePerNight: Math.floor(Math.random() * 4000) + (6000 * destinationFactor),
      rating: 5, // 5 stars
      amenities: [
        "Free Wi-Fi",
        "Air Conditioning",
        "Room Service",
        "Multiple Restaurants",
        "Swimming Pool",
        "Spa",
        "Fitness Center",
        "Bar/Lounge",
        "Concierge Service"
      ],
      distanceFromAttraction: `${(Math.random() * 0.5 + 0.1).toFixed(1)} km`
    };
    hotelOptions.push(luxuryHotel);
  }
  
  // Sort by price
  hotelOptions.sort((a, b) => a.pricePerNight - b.pricePerNight);
  
  // Limit options to requested number
  return hotelOptions.slice(0, maxOptions);
};

// Helper function to format hotel price
export const formatHotelPrice = (price: number): string => {
  return `₹${price.toLocaleString('en-IN')}`;
};
