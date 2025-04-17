
export interface TripParams {
  budget: number;
  days: number;
  persons: number;
  startDate: Date;
  endDate: Date;
  startingLocation: string;
  destinationPreferences: string[]; // New field for selected destinations
  foodPreference: 'vegetarian' | 'non-vegetarian' | 'no-preference';
  exploreLocalFood: boolean;
  transportMode?: 'flight' | 'train' | 'bus' | 'any'; // New field for transport preference
}

export interface Destination {
  id: string;
  name: string;
  state: string;
  description: string;
  imageUrl: string;
  type: DestinationType;
  costFactor: number; // Relative cost (1 = average, <1 = cheaper, >1 = more expensive)
  popularity: number; // 1-10 scale
}

export type DestinationType = 'beach' | 'mountain' | 'city' | 'wildlife' | 'historical' | 'spiritual';

export interface BudgetRecommendation {
  name: string;
  cost: number;
  description: string;
}

export interface FlightOption {
  airline: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  cost: number;
  stops: number;
}

export interface TransportOption {
  operator: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  cost: number;
  stops: number;
  type: 'train' | 'bus';
  class?: string;
  amenities?: string[];
}

export interface HotelOption {
  name: string;
  chain: string;
  pricePerNight: number;
  rating: number;
  amenities: string[];
  distanceFromAttraction: string;
  thumbnailUrl?: string;
}

export interface RestaurantRecommendation {
  name: string;
  cuisine: string;
  priceRange: string;
  rating: number;
  description: string;
  isVegetarian: boolean;
  specialDish?: string;
  location: string;
}

export interface BudgetBreakdown {
  travel: number;
  accommodation: number;
  food: number;
  activities: number;
  miscellaneous: number;
  total: number;
}

export interface TripDay {
  day: number;
  date: Date;
  destination: string;
  activities: string[];
  accommodation: string;
  meals: string[];
  isTransitDay?: boolean; // Added this property as optional
}

export interface TripPlan {
  id: string;
  params: TripParams;
  destinations: string[];
  budgetBreakdown: BudgetBreakdown;
  travelRecommendations?: BudgetRecommendation[];
  accommodationRecommendations?: BudgetRecommendation[];
  foodRecommendations?: BudgetRecommendation[];
  miscRecommendations?: BudgetRecommendation[];
  flightOptions?: FlightOption[];
  trainOptions?: TransportOption[];
  busOptions?: TransportOption[];
  hotelOptions?: HotelOption[];
  restaurantRecommendations?: RestaurantRecommendation[];
  itinerary: TripDay[];
  createdAt: Date;
}
