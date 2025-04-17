
import { FlightOption } from "@/types/trip";

// Helper to generate random time string in format "HH:MM"
const generateRandomTime = (): string => {
  const hours = Math.floor(Math.random() * 24).toString().padStart(2, '0');
  const minutes = Math.floor(Math.random() * 60).toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

// Helper to generate random duration string in format "XhYm"
const generateRandomDuration = (maxHours: number = 7): string => {
  const hours = Math.floor(Math.random() * maxHours) + 1;
  const minutes = Math.floor(Math.random() * 60);
  return `${hours}h ${minutes}m`;
};

// List of popular airlines in India
const airlines = [
  "Air India", 
  "IndiGo", 
  "SpiceJet", 
  "Vistara", 
  "AirAsia India", 
  "Go First",
  "Alliance Air"
];

/**
 * Generate flight options based on budget, travel distance and number of travelers
 */
export const generateFlightOptions = (
  budget: number, 
  fromLocation: string, 
  toLocation: string, 
  numTravelers: number
): FlightOption[] => {
  const flightOptions: FlightOption[] = [];
  
  // Calculate budget per person for travel
  const travelBudgetPerPerson = budget / numTravelers / 2; // Assuming round trip
  
  // Generate flight options based on budget tiers
  if (travelBudgetPerPerson <= 3000) {
    // Budget tier
    flightOptions.push({
      airline: airlines[Math.floor(Math.random() * 3)], // Limited airlines
      departureTime: generateRandomTime(),
      arrivalTime: generateRandomTime(),
      duration: generateRandomDuration(6),
      cost: Math.floor(Math.random() * 1000) + 2000,
      stops: Math.random() > 0.3 ? 1 : 2 // More likely to have stops
    });
    
    // Add another budget option
    flightOptions.push({
      airline: airlines[Math.floor(Math.random() * 3)],
      departureTime: generateRandomTime(),
      arrivalTime: generateRandomTime(),
      duration: generateRandomDuration(7),
      cost: Math.floor(Math.random() * 800) + 1800,
      stops: Math.random() > 0.2 ? 1 : 2
    });
  } else if (travelBudgetPerPerson <= 7000) {
    // Mid-range tier
    flightOptions.push({
      airline: airlines[Math.floor(Math.random() * airlines.length)],
      departureTime: generateRandomTime(),
      arrivalTime: generateRandomTime(),
      duration: generateRandomDuration(5),
      cost: Math.floor(Math.random() * 2000) + 4000,
      stops: Math.random() > 0.5 ? 0 : 1 // 50-50 direct or with stops
    });
    
    // Add a budget option
    flightOptions.push({
      airline: airlines[Math.floor(Math.random() * 3)],
      departureTime: generateRandomTime(),
      arrivalTime: generateRandomTime(),
      duration: generateRandomDuration(6),
      cost: Math.floor(Math.random() * 1500) + 2500,
      stops: 1
    });
    
    // Add a premium option
    flightOptions.push({
      airline: airlines[Math.floor(Math.random() * 2) + 2], // Different airlines
      departureTime: generateRandomTime(),
      arrivalTime: generateRandomTime(),
      duration: generateRandomDuration(4),
      cost: Math.floor(Math.random() * 3000) + 6000,
      stops: 0 // Direct flight
    });
  } else {
    // Premium tier
    flightOptions.push({
      airline: airlines[Math.floor(Math.random() * 2)],
      departureTime: generateRandomTime(),
      arrivalTime: generateRandomTime(),
      duration: generateRandomDuration(3),
      cost: Math.floor(Math.random() * 5000) + 8000,
      stops: 0 // Direct flight
    });
    
    // Add a mid-range option
    flightOptions.push({
      airline: airlines[Math.floor(Math.random() * 3) + 1],
      departureTime: generateRandomTime(),
      arrivalTime: generateRandomTime(),
      duration: generateRandomDuration(4),
      cost: Math.floor(Math.random() * 2000) + 5000,
      stops: Math.random() > 0.7 ? 0 : 1
    });
    
    // Add another premium option
    flightOptions.push({
      airline: airlines[Math.floor(Math.random() * 2) + 3],
      departureTime: generateRandomTime(),
      arrivalTime: generateRandomTime(),
      duration: generateRandomDuration(3),
      cost: Math.floor(Math.random() * 6000) + 10000,
      stops: 0
    });
  }
  
  // Sort by price
  return flightOptions.sort((a, b) => a.cost - b.cost);
};

// Helper function to format flight cost
export const formatFlightCost = (cost: number): string => {
  return `₹${cost.toLocaleString('en-IN')}`;
};
