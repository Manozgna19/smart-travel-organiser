
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FlightOption, TransportOption } from '@/types/trip';
import { formatFlightCost } from '@/utils/flightUtils';
import { formatTransportCost } from '@/utils/transportationUtils';
import { Plane, Train, Bus, Clock, IndianRupee, Waypoints, Wifi, Battery, Map } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface TransportOptionsProps {
  flightOptions?: FlightOption[];
  trainOptions?: TransportOption[];
  busOptions?: TransportOption[];
  origin: string;
  destination: string;
}

const TransportOptions: React.FC<TransportOptionsProps> = ({ 
  flightOptions, 
  trainOptions, 
  busOptions, 
  origin, 
  destination 
}) => {
  const [activeTab, setActiveTab] = useState<string>(
    flightOptions && flightOptions.length > 0 ? 'flight' : 
    trainOptions && trainOptions.length > 0 ? 'train' : 'bus'
  );

  const hasTransportOptions = (
    (flightOptions && flightOptions.length > 0) || 
    (trainOptions && trainOptions.length > 0) || 
    (busOptions && busOptions.length > 0)
  );

  if (!hasTransportOptions) {
    return null;
  }

  return (
    <Card className="w-full mb-8">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Map className="h-5 w-5 mr-2 text-india-blue" />
          Transport Options
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-gray-500 mb-4">
          Available transportation from {origin} to {destination}:
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger 
              value="flight" 
              disabled={!flightOptions || flightOptions.length === 0}
              className="flex items-center gap-1"
            >
              <Plane className="h-4 w-4" /> Flights
            </TabsTrigger>
            <TabsTrigger 
              value="train" 
              disabled={!trainOptions || trainOptions.length === 0}
              className="flex items-center gap-1"
            >
              <Train className="h-4 w-4" /> Trains
            </TabsTrigger>
            <TabsTrigger 
              value="bus" 
              disabled={!busOptions || busOptions.length === 0}
              className="flex items-center gap-1"
            >
              <Bus className="h-4 w-4" /> Buses
            </TabsTrigger>
          </TabsList>

          {/* Flights Tab */}
          <TabsContent value="flight">
            <div className="space-y-4 mt-4">
              {flightOptions && flightOptions.map((flight, index) => (
                <div 
                  key={index} 
                  className="border rounded-lg p-4 hover:border-india-blue transition-colors"
                >
                  <div className="flex justify-between items-center mb-3">
                    <div className="font-medium text-lg flex items-center">
                      <Plane className="h-5 w-5 mr-2 text-india-blue" />
                      {flight.airline}
                    </div>
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
          </TabsContent>

          {/* Trains Tab */}
          <TabsContent value="train">
            <div className="space-y-4 mt-4">
              {trainOptions && trainOptions.map((train, index) => (
                <div 
                  key={index} 
                  className="border rounded-lg p-4 hover:border-india-green transition-colors"
                >
                  <div className="flex justify-between items-center mb-3">
                    <div className="font-medium text-lg flex items-center">
                      <Train className="h-5 w-5 mr-2 text-india-green" />
                      {train.operator}
                    </div>
                    <div className="text-xl font-semibold text-india-green">
                      {formatTransportCost(train.cost)}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex flex-col">
                      <div className="text-sm text-gray-500">Departure</div>
                      <div className="font-medium">{train.departureTime}</div>
                    </div>
                    
                    <div className="flex items-center justify-center">
                      <div className="flex flex-col items-center">
                        <div className="flex items-center">
                          <div className="h-2 w-2 bg-india-saffron rounded-full"></div>
                          <div className="h-0.5 w-16 bg-gray-300"></div>
                          <Train className="h-4 w-4 text-india-green" />
                          <div className="h-0.5 w-16 bg-gray-300"></div>
                          <div className="h-2 w-2 bg-india-green rounded-full"></div>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {train.stops === 0 
                            ? "Direct Train" 
                            : `${train.stops} ${train.stops === 1 ? "Stop" : "Stops"}`}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col">
                      <div className="text-sm text-gray-500">Arrival</div>
                      <div className="font-medium">{train.arrivalTime}</div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    <div className="flex items-center text-sm">
                      <Clock className="h-4 w-4 mr-1 text-gray-500" />
                      <span>{train.duration}</span>
                    </div>
                    
                    <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                      {train.class}
                    </Badge>
                    
                    {train.stops === 0 && (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Express
                      </Badge>
                    )}
                    
                    {train.cost <= 1000 && (
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        Economy
                      </Badge>
                    )}
                  </div>
                  
                  <Button 
                    className="w-full bg-india-green hover:bg-india-green/80 text-white mt-2"
                    variant="default"
                  >
                    Select This Train
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Buses Tab */}
          <TabsContent value="bus">
            <div className="space-y-4 mt-4">
              {busOptions && busOptions.map((bus, index) => (
                <div 
                  key={index} 
                  className="border rounded-lg p-4 hover:border-india-spice transition-colors"
                >
                  <div className="flex justify-between items-center mb-3">
                    <div className="font-medium text-lg flex items-center">
                      <Bus className="h-5 w-5 mr-2 text-india-spice" />
                      {bus.operator}
                    </div>
                    <div className="text-xl font-semibold text-india-spice">
                      {formatTransportCost(bus.cost)}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex flex-col">
                      <div className="text-sm text-gray-500">Departure</div>
                      <div className="font-medium">{bus.departureTime}</div>
                    </div>
                    
                    <div className="flex items-center justify-center">
                      <div className="flex flex-col items-center">
                        <div className="flex items-center">
                          <div className="h-2 w-2 bg-india-saffron rounded-full"></div>
                          <div className="h-0.5 w-16 bg-gray-300"></div>
                          <Bus className="h-4 w-4 text-india-spice" />
                          <div className="h-0.5 w-16 bg-gray-300"></div>
                          <div className="h-2 w-2 bg-india-green rounded-full"></div>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {bus.stops === 0 
                            ? "Direct Bus" 
                            : `${bus.stops} ${bus.stops === 1 ? "Stop" : "Stops"}`}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col">
                      <div className="text-sm text-gray-500">Arrival</div>
                      <div className="font-medium">{bus.arrivalTime}</div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    <div className="flex items-center text-sm">
                      <Clock className="h-4 w-4 mr-1 text-gray-500" />
                      <span>{bus.duration}</span>
                    </div>
                    
                    {bus.amenities && bus.amenities.length > 0 && (
                      <div className="flex flex-wrap gap-1 ml-2">
                        {bus.amenities.includes('WiFi') && (
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 flex items-center gap-1">
                            <Wifi className="h-3 w-3" /> WiFi
                          </Badge>
                        )}
                        {bus.amenities.includes('Charging Point') && (
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1">
                            <Battery className="h-3 w-3" /> Charging
                          </Badge>
                        )}
                        {bus.amenities.length > 2 && (
                          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                            +{bus.amenities.length - 2} more
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>
                  
                  <Button 
                    className="w-full bg-india-spice hover:bg-india-spice/80 text-white mt-2"
                    variant="default"
                  >
                    Select This Bus
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TransportOptions;
