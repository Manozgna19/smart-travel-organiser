import React from 'react';
import { TripDay, Destination } from '@/types/trip';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';
import { getDestinationById } from '@/utils/tripUtils';
import { 
  CalendarDays, 
  BedDouble, 
  Utensils, 
  MapPin, 
  CheckCircle2,
  Bus,
  Landmark
} from 'lucide-react';

interface TripItineraryProps {
  itinerary: TripDay[];
}

const TripItinerary: React.FC<TripItineraryProps> = ({ itinerary }) => {
  const getDestinationDetails = (destinationId: string): Destination | undefined => {
    return getDestinationById(destinationId);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <CalendarDays className="h-5 w-5 mr-2 text-india-saffron" />
          Trip Itinerary
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {itinerary.map((day) => {
            const isTransitDay = day.isTransitDay || day.destination?.startsWith("Travel");
            const destinationId = isTransitDay ? "" : day.destination;
            const destination = !isTransitDay ? getDestinationDetails(destinationId) : undefined;
            
            return (
              <div key={day.day} className={`border-l-2 ${isTransitDay ? 'border-india-blue' : 'border-india-saffron'} pl-4 relative`}>
                <div className={`absolute -left-[9px] top-0 h-4 w-4 rounded-full ${isTransitDay ? 'bg-india-blue' : 'bg-india-saffron'}`} />
                
                <div className="mb-2">
                  <h3 className="text-lg font-semibold flex items-center">
                    Day {day.day} - {format(day.date, 'EEEE, MMM dd')}
                  </h3>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    {isTransitDay ? (
                      <>
                        <Bus className="h-4 w-4 text-india-blue" />
                        <span className="font-medium text-india-blue">{day.destination}</span>
                      </>
                    ) : (
                      <>
                        <MapPin className="h-4 w-4 text-india-blue" />
                        {destination?.name || day.destination}
                      </>
                    )}
                  </div>
                </div>
                
                <div className="mt-3 space-y-3">
                  <div>
                    <h4 className="text-sm font-medium flex items-center mb-1">
                      {isTransitDay ? (
                        <>
                          <Bus className="h-4 w-4 mr-1 text-india-green" />
                          Travel Plan
                        </>
                      ) : (
                        <>
                          <Landmark className="h-4 w-4 mr-1 text-india-green" />
                          Attractions & Activities
                        </>
                      )}
                    </h4>
                    <ul className="pl-6 list-disc space-y-1">
                      {day.activities.map((activity, index) => (
                        <li key={index} className="text-sm">{activity}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium flex items-center mb-1">
                      <BedDouble className="h-4 w-4 mr-1 text-india-blue" />
                      Accommodation
                    </h4>
                    <p className="text-sm pl-6">{day.accommodation}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium flex items-center mb-1">
                      <Utensils className="h-4 w-4 mr-1 text-india-spice" />
                      Meals
                    </h4>
                    <ul className="pl-6 list-disc space-y-1">
                      {day.meals.map((meal, index) => (
                        <li key={index} className="text-sm">{meal}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default TripItinerary;

