
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FlightOption } from '@/types/trip';
import { formatFlightCost } from '@/utils/flightUtils';
import { Plane, Clock, IndianRupee, Waypoints } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface FlightOptionsProps {
  flightOptions: FlightOption[];
  origin: string;
  destination: string;
}

const FlightOptions: React.FC<FlightOptionsProps> = ({ flightOptions, origin, destination }) => {
  if (!flightOptions || flightOptions.length === 0) {
    return null;
  }

  return (
    <Card className="w-full mb-8">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Plane className="h-5 w-5 mr-2 text-india-blue" />
          Flight Options
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-sm text-gray-500 mb-4">
            Available flights from {origin} to {destination}:
          </div>
          
          {flightOptions.map((flight, index) => (
            <div 
              key={index} 
              className="border rounded-lg p-4 hover:border-india-blue transition-colors"
            >
              <div className="flex justify-between items-center mb-3">
                <div className="font-medium text-lg">{flight.airline}</div>
                <div className="text-xl font-semibold text-india-blue">
                  {formatFlightCost(flight.cost)}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="flex flex-col">
                  <div className="text-sm text-gray-500">Departure</div>
                  <div className="font-medium">{flight.departureTime}</div>
                </div>
                
                <div className="flex items-center justify-center">
                  <div className="flex flex-col items-center">
                    <div className="flex items-center">
                      <div className="h-2 w-2 bg-india-saffron rounded-full"></div>
                      <div className="h-0.5 w-16 bg-gray-300"></div>
                      <Plane className="h-4 w-4 text-india-blue" />
                      <div className="h-0.5 w-16 bg-gray-300"></div>
                      <div className="h-2 w-2 bg-india-green rounded-full"></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {flight.stops === 0 
                        ? "Direct Flight" 
                        : `${flight.stops} ${flight.stops === 1 ? "Stop" : "Stops"}`}
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col">
                  <div className="text-sm text-gray-500">Arrival</div>
                  <div className="font-medium">{flight.arrivalTime}</div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-3">
                <div className="flex items-center text-sm">
                  <Clock className="h-4 w-4 mr-1 text-gray-500" />
                  <span>{flight.duration}</span>
                </div>
                
                <div className="flex items-center text-sm">
                  <Waypoints className="h-4 w-4 mr-1 text-gray-500" />
                  <span>
                    {flight.stops === 0 
                      ? "Nonstop" 
                      : `${flight.stops} ${flight.stops === 1 ? "Stop" : "Stops"}`}
                  </span>
                </div>
                
                {flight.stops === 0 && (
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Direct
                  </Badge>
                )}
                
                {flight.cost <= 3000 && (
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    Best Value
                  </Badge>
                )}
              </div>
              
              <Button 
                className="w-full bg-india-saffron hover:bg-india-spice text-white mt-2"
                variant="default"
              >
                Select This Flight
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FlightOptions;
