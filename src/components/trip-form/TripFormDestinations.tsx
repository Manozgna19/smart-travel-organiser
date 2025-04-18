import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import DestinationSelector from '@/components/DestinationSelector';
import { TripParams } from '@/types/trip';

interface TripFormDestinationsProps {
  selectedDestinations: string[];
  budget: number;
  days: number;
  persons: number;
  startingLocation: string;
  errors: Partial<Record<keyof TripParams, string>>;
  onDestinationsChange: (destinations: string[]) => void;
  onPreviousStep: () => void;
}

const TripFormDestinations: React.FC<TripFormDestinationsProps> = ({
  selectedDestinations,
  budget,
  days,
  persons,
  startingLocation,
  errors,
  onDestinationsChange,
  onPreviousStep
}) => {
  return (
    <div className="space-y-6 pt-4">
      <div className="space-y-4">
        <Label>Select Destinations You Want to Visit</Label>
        <DestinationSelector 
          selectedDestinations={selectedDestinations}
          onChange={onDestinationsChange}
          budget={budget}
          days={days}
          persons={persons}
          startingLocation={startingLocation}
        />
        {errors.destinationPreferences && (
          <p className="text-red-500 text-sm">{errors.destinationPreferences}</p>
        )}
      </div>
      
      <div className="flex justify-between pt-2">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onPreviousStep}
          className="w-1/3"
        >
          Back
        </Button>
        <Button 
          type="submit" 
          className="w-2/3 bg-india-saffron hover:bg-india-spice text-white"
        >
          Plan My Trip
        </Button>
      </div>
    </div>
  );
};

export default TripFormDestinations;
