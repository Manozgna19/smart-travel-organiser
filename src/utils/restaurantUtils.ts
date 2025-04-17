
import { RestaurantRecommendation } from '@/types/trip';
import { getDestinationById } from './destinations';

// Generate restaurant recommendations based on destination and food preferences
export const generateRestaurantRecommendations = (
  destinationIds: string[],
  foodPreference: 'vegetarian' | 'non-vegetarian' | 'no-preference',
  budget: number,
  persons: number
): RestaurantRecommendation[] => {
  const recommendations: RestaurantRecommendation[] = [];
  const perPersonFoodBudget = budget / persons;
  
  // Determine price range based on budget
  let priceRange = '₹';
  if (perPersonFoodBudget > 1000) {
    priceRange = '₹₹₹';
  } else if (perPersonFoodBudget > 500) {
    priceRange = '₹₹';
  }

  // Generate recommendations for each destination
  destinationIds.forEach(destId => {
    const destination = getDestinationById(destId);
    if (!destination) return;

    // Base recommendations on destination type
    switch (destination.type) {
      case 'beach':
        if (foodPreference === 'vegetarian' || foodPreference === 'no-preference') {
          recommendations.push({
            name: "Coconut Grove",
            cuisine: "Coastal",
            priceRange,
            rating: 4.6,
            description: "Fresh seafood and coastal delicacies with beautiful beach views",
            isVegetarian: true,
            specialDish: "Vegetable Coconut Curry",
            location: destination.name
          });
        }
        
        if (foodPreference === 'non-vegetarian' || foodPreference === 'no-preference') {
          recommendations.push({
            name: "Ocean Spice",
            cuisine: "Seafood",
            priceRange,
            rating: 4.7,
            description: "Specializing in local seafood prepared with traditional spices",
            isVegetarian: false,
            specialDish: "Prawn Masala",
            location: destination.name
          });
        }
        break;
        
      case 'mountain':
        recommendations.push({
          name: "Mountain Hearth",
          cuisine: "Himalayan",
          priceRange,
          rating: 4.5,
          description: "Authentic mountain cuisine with locally sourced ingredients",
          isVegetarian: foodPreference === 'vegetarian',
          specialDish: foodPreference === 'vegetarian' ? "Siddu (Steamed Bread)" : "Mutton Rara",
          location: destination.name
        });
        break;
        
      case 'historical':
        recommendations.push({
          name: "Royal Heritage",
          cuisine: "Traditional Indian",
          priceRange,
          rating: 4.8,
          description: "Recipes from royal kitchens served in a historical setting",
          isVegetarian: foodPreference === 'vegetarian',
          specialDish: foodPreference === 'vegetarian' ? "Paneer Lababdar" : "Laal Maas",
          location: destination.name
        });
        break;
        
      case 'city':
        recommendations.push({
          name: "Urban Flavors",
          cuisine: "Fusion",
          priceRange,
          rating: 4.4,
          description: "Modern fusion cuisine combining traditional and international flavors",
          isVegetarian: foodPreference === 'vegetarian',
          specialDish: foodPreference === 'vegetarian' ? "Jackfruit Biryani" : "Butter Chicken Pasta",
          location: destination.name
        });
        
        // Add a street food option for cities
        recommendations.push({
          name: "Street Food Market",
          cuisine: "Local Street Food",
          priceRange: "₹",
          rating: 4.2,
          description: "Collection of local street food vendors offering authentic flavors",
          isVegetarian: true,
          location: destination.name
        });
        break;
        
      case 'spiritual':
        recommendations.push({
          name: "Sattvic Bites",
          cuisine: "Sattvic",
          priceRange,
          rating: 4.3,
          description: "Pure vegetarian food following ancient Sattvic principles",
          isVegetarian: true,
          specialDish: "Sabudana Khichdi",
          location: destination.name
        });
        break;
        
      case 'wildlife':
        recommendations.push({
          name: "Wilderness Kitchen",
          cuisine: "Regional",
          priceRange,
          rating: 4.4,
          description: "Authentic regional cuisine using forest-inspired ingredients",
          isVegetarian: foodPreference === 'vegetarian',
          specialDish: foodPreference === 'vegetarian' ? "Wild Mushroom Curry" : "Jungle Fowl Masala",
          location: destination.name
        });
        break;
    }
    
    // Add a general recommendation for every destination
    if (foodPreference === 'vegetarian') {
      recommendations.push({
        name: "Green Leaf",
        cuisine: "Pure Vegetarian",
        priceRange,
        rating: 4.3,
        description: "Specializing in creative vegetarian dishes using local produce",
        isVegetarian: true,
        location: destination.name
      });
    } else if (foodPreference === 'non-vegetarian') {
      recommendations.push({
        name: "Spice & Grill",
        cuisine: "North Indian",
        priceRange,
        rating: 4.4,
        description: "Famous for its kebabs and curries with rich flavors",
        isVegetarian: false,
        location: destination.name
      });
    } else {
      recommendations.push({
        name: "India Flavors",
        cuisine: "Multi-cuisine",
        priceRange,
        rating: 4.5,
        description: "A variety of dishes catering to all preferences with authentic Indian flavors",
        isVegetarian: false,
        location: destination.name
      });
    }
  });

  // Limit to a reasonable number of recommendations
  return recommendations.slice(0, 6);
};
