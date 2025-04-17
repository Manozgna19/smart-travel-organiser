
import React from 'react';
import { TripParams } from '@/types/trip';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface TripFormBasicsProps {
  formData: TripParams;
  errors: Partial<Record<keyof TripParams, string>>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleStartDateSelect: (date: Date | undefined) => void;
  handleFoodPreferenceChange: (value: 'vegetarian' | 'non-vegetarian' | 'no-preference') => void;
  handleExploreLocalFoodChange: (checked: boolean) => void;
  handleTransportModeChange: (value: 'flight' | 'train' | 'bus' | 'any') => void;
  onNextStep: () => void;
}

const TripFormBasics: React.FC<TripFormBasicsProps> = ({
  formData,
  errors,
  handleChange,
  handleStartDateSelect,
  handleFoodPreferenceChange,
  handleExploreLocalFoodChange,
  handleTransportModeChange,
  onNextStep
}) => {
  return (
    <div className="space-y-6 pt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="budget">Budget (₹)</Label>
          <Input
            id="budget"
            name="budget"
            type="number"
            value={formData.budget}
            onChange={handleChange}
            min="5000"
            placeholder="Enter your total budget in INR"
            className={errors.budget ? "border-red-500" : ""}
          />
          {errors.budget && (
            <p className="text-red-500 text-sm">{errors.budget}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="days">Number of Days</Label>
          <Input
            id="days"
            name="days"
            type="number"
            value={formData.days}
            onChange={handleChange}
            min="1"
            placeholder="How many days?"
            className={errors.days ? "border-red-500" : ""}
          />
          {errors.days && (
            <p className="text-red-500 text-sm">{errors.days}</p>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="persons">Number of Travelers</Label>
          <Input
            id="persons"
            name="persons"
            type="number"
            value={formData.persons}
            onChange={handleChange}
            min="1"
            placeholder="How many people are traveling?"
            className={errors.persons ? "border-red-500" : ""}
          />
          {errors.persons && (
            <p className="text-red-500 text-sm">{errors.persons}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label>Start Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={`w-full justify-start text-left font-normal ${
                  errors.startDate ? "border-red-500" : ""
                }`}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.startDate ? (
                  format(formData.startDate, "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={formData.startDate}
                onSelect={handleStartDateSelect}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {errors.startDate && (
            <p className="text-red-500 text-sm">{errors.startDate}</p>
          )}
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="startingLocation">Starting Location</Label>
        <Input
          id="startingLocation"
          name="startingLocation"
          value={formData.startingLocation}
          onChange={handleChange}
          placeholder="Where are you starting from?"
          className={errors.startingLocation ? "border-red-500" : ""}
        />
        {errors.startingLocation && (
          <p className="text-red-500 text-sm">{errors.startingLocation}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <Label>Preferred Mode of Transport</Label>
        <Select 
          value={formData.transportMode || 'any'} 
          onValueChange={(value) => handleTransportModeChange(value as 'flight' | 'train' | 'bus' | 'any')}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select transport mode" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any (Show All Options)</SelectItem>
            <SelectItem value="flight">Flight</SelectItem>
            <SelectItem value="train">Train</SelectItem>
            <SelectItem value="bus">Bus</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-4">
        <Label>Food Preferences</Label>
        <RadioGroup 
          value={formData.foodPreference} 
          onValueChange={(value) => handleFoodPreferenceChange(value as 'vegetarian' | 'non-vegetarian' | 'no-preference')}
          className="flex flex-col space-y-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="vegetarian" id="vegetarian" />
            <Label htmlFor="vegetarian">Vegetarian</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="non-vegetarian" id="non-vegetarian" />
            <Label htmlFor="non-vegetarian">Non-Vegetarian</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no-preference" id="no-preference" />
            <Label htmlFor="no-preference">No Preference</Label>
          </div>
        </RadioGroup>
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="exploreLocalFood" 
            checked={formData.exploreLocalFood}
            onCheckedChange={handleExploreLocalFoodChange}
          />
          <Label htmlFor="exploreLocalFood" className="font-normal">
            I want to explore local cuisine
          </Label>
        </div>
      </div>
      
      <div className="pt-4">
        <Button 
          onClick={onNextStep} 
          className="w-full bg-india-saffron hover:bg-india-spice text-white"
        >
          Next: Select Destinations
        </Button>
      </div>
    </div>
  );
};

export default TripFormBasics;
