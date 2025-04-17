
import { Destination } from "../types/trip";

// Sample destinations data with more state representation
export const popularDestinations: Destination[] = [
  {
    id: "goa",
    name: "Goa",
    state: "Goa",
    description: "Famous for its beautiful beaches, vibrant nightlife, and Portuguese influence.",
    imageUrl: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1000",
    type: "beach",
    costFactor: 1.2,
    popularity: 9
  },
  {
    id: "jaipur",
    name: "Jaipur",
    state: "Rajasthan",
    description: "Known as the Pink City, famous for its stunning Amber Fort and City Palace.",
    imageUrl: "https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=1000",
    type: "historical",
    costFactor: 1.0,
    popularity: 8
  },
  {
    id: "varanasi",
    name: "Varanasi",
    state: "Uttar Pradesh",
    description: "One of the oldest living cities, known for its spiritual significance and ghats along the Ganges.",
    imageUrl: "https://images.unsplash.com/photo-1561361058-c24cecae35ca?q=80&w=1000",
    type: "spiritual",
    costFactor: 0.8,
    popularity: 7
  },
  {
    id: "darjeeling",
    name: "Darjeeling",
    state: "West Bengal",
    description: "A beautiful hill station known for its tea plantations and views of the Himalayas.",
    imageUrl: "https://images.unsplash.com/photo-1544634076-92f89048ed78?q=80&w=1000",
    type: "mountain",
    costFactor: 0.9,
    popularity: 7
  },
  {
    id: "mumbai",
    name: "Mumbai",
    state: "Maharashtra",
    description: "India's financial capital and home to Bollywood, offering a mix of colonial architecture and modern skyscrapers.",
    imageUrl: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?q=80&w=1000",
    type: "city",
    costFactor: 1.5,
    popularity: 8
  },
  {
    id: "ranthambore",
    name: "Ranthambore National Park",
    state: "Rajasthan",
    description: "One of the best places in India to see tigers in their natural habitat.",
    imageUrl: "https://images.unsplash.com/photo-1549366021-9f761d450615?q=80&w=1000",
    type: "wildlife",
    costFactor: 1.3,
    popularity: 7
  },
  {
    id: "munnar",
    name: "Munnar",
    state: "Kerala",
    description: "A hill station known for its tea plantations, picturesque valleys, and cool climate.",
    imageUrl: "https://images.unsplash.com/photo-1609766428220-323afdd35cfa?q=80&w=1000",
    type: "mountain",
    costFactor: 0.85,
    popularity: 8
  },
  {
    id: "rishikesh",
    name: "Rishikesh",
    state: "Uttarakhand",
    description: "A spiritual hub and adventure capital, famous for yoga, meditation, and river rafting.",
    imageUrl: "https://images.unsplash.com/photo-1591018533273-5321ca58073b?q=80&w=1000",
    type: "spiritual",
    costFactor: 0.75,
    popularity: 8
  },
  {
    id: "udaipur",
    name: "Udaipur",
    state: "Rajasthan",
    description: "Known as the City of Lakes, with beautiful palaces, temples, and traditional Rajasthani culture.",
    imageUrl: "https://images.unsplash.com/photo-1568557380294-3cd814df5b94?q=80&w=1000",
    type: "historical",
    costFactor: 1.1,
    popularity: 8
  },
  {
    id: "andaman",
    name: "Andaman Islands",
    state: "Andaman & Nicobar",
    description: "Pristine beaches, crystal clear waters, and vibrant coral reefs perfect for snorkeling and diving.",
    imageUrl: "https://images.unsplash.com/photo-1583839657959-89274903f359?q=80&w=1000",
    type: "beach",
    costFactor: 1.6,
    popularity: 9
  },
  {
    id: "ladakh",
    name: "Leh-Ladakh",
    state: "Ladakh",
    description: "Known for its remote mountain beauty, Buddhist monasteries, and high-altitude desert landscapes.",
    imageUrl: "https://images.unsplash.com/photo-1590490051060-06ec18799fe5?q=80&w=1000",
    type: "mountain",
    costFactor: 1.4,
    popularity: 9
  },
  {
    id: "kaziranga",
    name: "Kaziranga National Park",
    state: "Assam",
    description: "Home to two-thirds of the world's great one-horned rhinoceroses and diverse wildlife.",
    imageUrl: "https://images.unsplash.com/photo-1589824783837-6a4468bec03c?q=80&w=1000",
    type: "wildlife",
    costFactor: 1.1,
    popularity: 7
  },
  // Adding new destinations with wider state coverage
  {
    id: "hampi",
    name: "Hampi",
    state: "Karnataka",
    description: "Ancient ruins of Vijayanagara Empire with stunning boulder-strewn landscape and temples.",
    imageUrl: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=80&w=1000",
    type: "historical",
    costFactor: 0.85,
    popularity: 8
  },
  {
    id: "khajuraho",
    name: "Khajuraho",
    state: "Madhya Pradesh",
    description: "Famous for its nagara-style architectural temples and intricate sculptures.",
    imageUrl: "https://images.unsplash.com/photo-1612438214708-f428a707dd0e?q=80&w=1000",
    type: "historical",
    costFactor: 0.9,
    popularity: 7
  },
  {
    id: "kodaikanal",
    name: "Kodaikanal",
    state: "Tamil Nadu",
    description: "A beautiful hill station known as the 'Princess of Hill Stations' with a star-shaped lake.",
    imageUrl: "https://images.unsplash.com/photo-1613267320143-7d7ee0425f3b?q=80&w=1000",
    type: "mountain",
    costFactor: 0.9,
    popularity: 7
  },
  {
    id: "mahabalipuram",
    name: "Mahabalipuram",
    state: "Tamil Nadu",
    description: "UNESCO World Heritage site with ancient temples and rock-cut caves near the Bay of Bengal.",
    imageUrl: "https://images.unsplash.com/photo-1621622040528-90ce8fb85858?q=80&w=1000",
    type: "historical",
    costFactor: 0.85,
    popularity: 7
  },
  {
    id: "pushkar",
    name: "Pushkar",
    state: "Rajasthan",
    description: "Sacred town famous for its annual camel fair, Brahma Temple, and holy lake.",
    imageUrl: "https://images.unsplash.com/photo-1621250755389-11c2bae9d494?q=80&w=1000",
    type: "spiritual",
    costFactor: 0.8,
    popularity: 7
  },
  {
    id: "shillong",
    name: "Shillong",
    state: "Meghalaya",
    description: "Capital of Meghalaya known as the 'Scotland of the East' with rolling hills and waterfalls.",
    imageUrl: "https://images.unsplash.com/photo-1598092921278-908570abd437?q=80&w=1000",
    type: "mountain",
    costFactor: 1.0,
    popularity: 7
  },
  {
    id: "amritsar",
    name: "Amritsar",
    state: "Punjab",
    description: "Home to the Golden Temple, Jallianwala Bagh, and the Wagah Border ceremony.",
    imageUrl: "https://images.unsplash.com/photo-1588096344356-9b4c97016e61?q=80&w=1000",
    type: "spiritual",
    costFactor: 0.95,
    popularity: 8
  },
  {
    id: "kochi",
    name: "Kochi",
    state: "Kerala",
    description: "Coastal city with Chinese fishing nets, colonial architecture, and vibrant art scene.",
    imageUrl: "https://images.unsplash.com/photo-1590766740178-78128a8f4948?q=80&w=1000",
    type: "city",
    costFactor: 1.1,
    popularity: 8
  }
];

// Get destination by ID
export const getDestinationById = (id: string): Destination | undefined => {
  return popularDestinations.find(dest => dest.id === id);
};

// Get all available states from destinations
export const getAllStates = (): string[] => {
  const states = popularDestinations.map(dest => dest.state);
  return [...new Set(states)]; // Remove duplicates
};

// Get destinations by state
export const getDestinationsByState = (state: string): Destination[] => {
  return popularDestinations.filter(dest => dest.state === state);
};

// Get destinations by type
export const getDestinationsByType = (type: string): Destination[] => {
  return popularDestinations.filter(dest => dest.type === type);
};

// Get budget-friendly destinations
export const getBudgetFriendlyDestinations = (maxCostFactor: number): Destination[] => {
  return popularDestinations.filter(dest => dest.costFactor <= maxCostFactor);
};

