
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

// List of train operators in India
const trainOperators = [
  "Indian Railways",
  "Rajdhani Express",
  "Shatabdi Express",
  "Duronto Express",
  "Tejas Express",
  "Vande Bharat Express"
];

// List of bus operators in India
const busOperators = [
  "KSRTC",
  "MSRTC",
  "APSRTC",
  "UPSRTC",
  "RSRTC",
  "Volvo",
  "Abhibus",
  "RedBus"
];

export interface TransportOption {
  operator: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  cost: number;
  stops: number;
  type: 'train' | 'bus';
  class?: string; // For trains: "Sleeper", "AC 3-Tier", "AC 2-Tier", etc.
  amenities?: string[]; // For buses: "WiFi", "Charging", "TV", etc.
}

/**
 * Generate train options based on budget, travel distance and number of travelers
 */
export const generateTrainOptions = (
  budget: number, 
  fromLocation: string, 
  toLocation: string, 
  numTravelers: number
): TransportOption[] => {
  const trainOptions: TransportOption[] = [];
  
  // Calculate budget per person for travel
  const travelBudgetPerPerson = budget / numTravelers / 3; // Lower cost than flights
  
  // Budget tier
  if (travelBudgetPerPerson <= 1500) {
    trainOptions.push({
      operator: trainOperators[Math.floor(Math.random() * 3)],
      departureTime: generateRandomTime(),
      arrivalTime: generateRandomTime(),
      duration: generateRandomDuration(10), // Trains typically take longer
      cost: Math.floor(Math.random() * 500) + 800,
      stops: Math.random() > 0.5 ? 2 : 3,
      type: 'train',
      class: "Sleeper"
    });
    
    trainOptions.push({
      operator: trainOperators[Math.floor(Math.random() * 3)],
      departureTime: generateRandomTime(),
      arrivalTime: generateRandomTime(),
      duration: generateRandomDuration(12),
      cost: Math.floor(Math.random() * 300) + 600,
      stops: Math.random() > 0.3 ? 3 : 4,
      type: 'train',
      class: "General"
    });
  } else if (travelBudgetPerPerson <= 3000) {
    trainOptions.push({
      operator: trainOperators[Math.floor(Math.random() * trainOperators.length)],
      departureTime: generateRandomTime(),
      arrivalTime: generateRandomTime(),
      duration: generateRandomDuration(8),
      cost: Math.floor(Math.random() * 800) + 1200,
      stops: Math.random() > 0.6 ? 1 : 2,
      type: 'train',
      class: "AC 3-Tier"
    });
    
    trainOptions.push({
      operator: trainOperators[Math.floor(Math.random() * trainOperators.length)],
      departureTime: generateRandomTime(),
      arrivalTime: generateRandomTime(),
      duration: generateRandomDuration(7),
      cost: Math.floor(Math.random() * 1000) + 1800,
      stops: Math.random() > 0.7 ? 0 : 1,
      type: 'train',
      class: "AC 2-Tier"
    });
  } else {
    trainOptions.push({
      operator: trainOperators[3 + Math.floor(Math.random() * 3)], // Premium operators
      departureTime: generateRandomTime(),
      arrivalTime: generateRandomTime(),
      duration: generateRandomDuration(6),
      cost: Math.floor(Math.random() * 1500) + 2500,
      stops: 0, // Express train
      type: 'train',
      class: "AC 1st Class"
    });
    
    trainOptions.push({
      operator: trainOperators[3 + Math.floor(Math.random() * 3)],
      departureTime: generateRandomTime(),
      arrivalTime: generateRandomTime(),
      duration: generateRandomDuration(5),
      cost: Math.floor(Math.random() * 2000) + 3000,
      stops: 0,
      type: 'train',
      class: "Executive Chair Car"
    });
  }
  
  return trainOptions.sort((a, b) => a.cost - b.cost);
};

/**
 * Generate bus options based on budget, travel distance and number of travelers
 */
export const generateBusOptions = (
  budget: number, 
  fromLocation: string, 
  toLocation: string, 
  numTravelers: number
): TransportOption[] => {
  const busOptions: TransportOption[] = [];
  
  // Calculate budget per person for travel
  const travelBudgetPerPerson = budget / numTravelers / 4; // Buses are generally cheaper
  
  // Budget tier
  if (travelBudgetPerPerson <= 1000) {
    busOptions.push({
      operator: busOperators[Math.floor(Math.random() * 5)],
      departureTime: generateRandomTime(),
      arrivalTime: generateRandomTime(),
      duration: generateRandomDuration(12), // Buses typically take longer
      cost: Math.floor(Math.random() * 300) + 400,
      stops: Math.random() > 0.3 ? 3 : 4,
      type: 'bus',
      amenities: ["Water Bottle"]
    });
    
    busOptions.push({
      operator: busOperators[Math.floor(Math.random() * 5)],
      departureTime: generateRandomTime(),
      arrivalTime: generateRandomTime(),
      duration: generateRandomDuration(10),
      cost: Math.floor(Math.random() * 200) + 600,
      stops: Math.random() > 0.4 ? 2 : 3,
      type: 'bus',
      amenities: ["Water Bottle", "Blanket"]
    });
  } else if (travelBudgetPerPerson <= 2000) {
    busOptions.push({
      operator: busOperators[Math.floor(Math.random() * busOperators.length)],
      departureTime: generateRandomTime(),
      arrivalTime: generateRandomTime(),
      duration: generateRandomDuration(9),
      cost: Math.floor(Math.random() * 500) + 800,
      stops: Math.random() > 0.6 ? 1 : 2,
      type: 'bus',
      amenities: ["Water Bottle", "Blanket", "Charging Point"]
    });
    
    busOptions.push({
      operator: busOperators[Math.floor(Math.random() * busOperators.length)],
      departureTime: generateRandomTime(),
      arrivalTime: generateRandomTime(),
      duration: generateRandomDuration(8),
      cost: Math.floor(Math.random() * 700) + 1000,
      stops: Math.random() > 0.7 ? 0 : 1,
      type: 'bus',
      amenities: ["Water Bottle", "Blanket", "Charging Point", "WiFi"]
    });
  } else {
    busOptions.push({
      operator: busOperators[5 + Math.floor(Math.random() * 3)], // Premium operators
      departureTime: generateRandomTime(),
      arrivalTime: generateRandomTime(),
      duration: generateRandomDuration(7),
      cost: Math.floor(Math.random() * 1000) + 1500,
      stops: 0, // Express bus
      type: 'bus',
      amenities: ["Water Bottle", "Blanket", "Charging Point", "WiFi", "Entertainment System"]
    });
    
    busOptions.push({
      operator: busOperators[5 + Math.floor(Math.random() * 3)],
      departureTime: generateRandomTime(),
      arrivalTime: generateRandomTime(),
      duration: generateRandomDuration(6),
      cost: Math.floor(Math.random() * 1200) + 1800,
      stops: 0,
      type: 'bus',
      amenities: ["Water Bottle", "Blanket", "Charging Point", "WiFi", "Entertainment System", "Snacks"]
    });
  }
  
  return busOptions.sort((a, b) => a.cost - b.cost);
};

// Helper function to format transportation cost
export const formatTransportCost = (cost: number): string => {
  return `₹${cost.toLocaleString('en-IN')}`;
};
