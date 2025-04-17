
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HotelOption } from '@/types/trip';
import { Hotel, Star, MapPin, Wifi, Utensils, Dumbbell } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatHotelPrice } from '@/utils/hotelUtils';

interface HotelOptionsProps {
  hotelOptions: HotelOption[];
  destination: string;
}

const HotelOptions: React.FC<HotelOptionsProps> = ({ hotelOptions, destination }) => {
  if (!hotelOptions || hotelOptions.length === 0) {
    return null;
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
      />
    ));
  };

  const renderAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case 'Free Wi-Fi':
        return <Wifi className="h-4 w-4 text-blue-500" />;
      case 'Swimming Pool':
        return <Dumbbell className="h-4 w-4 text-blue-500" />; // Changed from Pool to Dumbbell
      case 'Restaurant':
      case 'Multiple Restaurants':
        return <Utensils className="h-4 w-4 text-blue-500" />;
      case 'Fitness Center':
        return <Dumbbell className="h-4 w-4 text-blue-500" />;
      default:
        return null;
    }
  };

  return (
    <Card className="w-full mb-8">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Hotel className="h-5 w-5 mr-2 text-india-blue" />
          Hotel Options in {destination}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-sm text-gray-500 mb-4">
            Recommended accommodation options near attractions:
          </div>
          
          {hotelOptions.map((hotel, index) => (
            <div 
              key={index} 
              className="border rounded-lg p-4 hover:border-india-blue transition-colors"
            >
              <div className="flex justify-between items-center mb-3">
                <div>
                  <div className="font-medium text-lg">{hotel.name}</div>
                  <div className="text-sm text-gray-500">{hotel.chain}</div>
                </div>
                <div className="text-xl font-semibold text-india-blue">
                  {formatHotelPrice(hotel.pricePerNight)}
                  <span className="text-sm font-normal text-gray-500">/night</span>
                </div>
              </div>
              
              <div className="flex items-center mb-3">
                {renderStars(hotel.rating)}
                <span className="ml-2 text-sm text-gray-500">
                  {hotel.rating}-star hotel
                </span>
              </div>
              
              <div className="flex items-center gap-1 mb-3 text-sm">
                <MapPin className="h-4 w-4 text-india-saffron" />
                <span>
                  {hotel.distanceFromAttraction} from main attractions
                </span>
              </div>
              
              <div className="mb-4">
                <div className="text-sm font-medium mb-2">Amenities:</div>
                <div className="flex flex-wrap gap-2">
                  {hotel.amenities.slice(0, 5).map((amenity, i) => (
                    <Badge key={i} variant="outline" className="flex items-center gap-1">
                      {renderAmenityIcon(amenity)}
                      {amenity}
                    </Badge>
                  ))}
                  
                  {hotel.amenities.length > 5 && (
                    <Badge variant="outline">
                      +{hotel.amenities.length - 5} more
                    </Badge>
                  )}
                </div>
              </div>
              
              <Button 
                className="w-full bg-india-green hover:bg-india-green/90 text-white mt-2"
                variant="default"
              >
                Book This Hotel
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default HotelOptions;
