
import React from 'react';
import { RestaurantRecommendation } from '@/types/trip';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Utensils, Star, MapPin, DollarSign } from 'lucide-react';

interface RestaurantRecommendationsProps {
  recommendations: RestaurantRecommendation[];
}

const RestaurantRecommendations: React.FC<RestaurantRecommendationsProps> = ({ 
  recommendations
}) => {
  if (!recommendations || recommendations.length === 0) {
    return null;
  }

  return (
    <Card className="w-full mb-8">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Utensils className="h-5 w-5 mr-2 text-india-spice" />
          Restaurant Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendations.map((restaurant, index) => (
            <div 
              key={index} 
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-lg">{restaurant.name}</h3>
                <div className="flex items-center bg-amber-100 px-2 py-1 rounded text-amber-700">
                  <Star className="h-4 w-4 mr-1 fill-amber-500 text-amber-500" />
                  <span className="text-sm font-medium">{restaurant.rating}</span>
                </div>
              </div>
              
              <div className="flex items-center text-gray-500 text-sm mt-1">
                <MapPin className="h-3.5 w-3.5 mr-1" />
                <span>{restaurant.location}</span>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge variant="outline" className="bg-gray-50">
                  {restaurant.cuisine}
                </Badge>
                <Badge variant="outline" className="bg-gray-50">
                  {restaurant.priceRange}
                </Badge>
                {restaurant.isVegetarian && (
                  <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                    Vegetarian
                  </Badge>
                )}
              </div>
              
              <p className="text-sm text-gray-600 mt-3">{restaurant.description}</p>
              
              {restaurant.specialDish && (
                <div className="mt-2 text-sm">
                  <span className="font-medium">Special dish: </span>
                  <span className="text-india-spice">{restaurant.specialDish}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RestaurantRecommendations;
