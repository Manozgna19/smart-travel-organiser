import React, { useState, useEffect } from 'react';
import { popularDestinations, getAllStates, getDestinationsByState } from '@/utils/destinations';
import DestinationCard from '@/components/DestinationCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getDestinationAffordability, isDestinationAffordable, getBestDestinationCombination } from '@/utils/destinationUtils';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, AlertCircle, MapPin } from 'lucide-react';
import { Destination } from '@/types/trip';

interface DestinationSelectorProps {
  selectedDestinations: string[];
  onChange: (destinations: string[]) => void;
  budget?: number;
  days?: number;
  persons?: number;
  startingLocation?: string;
}

const DestinationSelector: React.FC<DestinationSelectorProps> = ({ 
  selectedDestinations, 
  onChange,
  budget = 50000,
  days = 5,
  persons = 2,
  startingLocation = ""
}) => {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [showAffordableOnly, setShowAffordableOnly] = useState(true);
  const [recommendedCombinations, setRecommendedCombinations] = useState<string[]>([]);
  
  const allStates = getAllStates();
  const dailyBudget = budget / (days * persons);

  useEffect(() => {
    // Determine max destinations based on budget size
    let maxDestinations = 2; // Default
    
    if (budget >= 100000) {
      maxDestinations = 3; // For very high budgets
    } else if (budget >= 50000) {
      maxDestinations = 2; // For medium budgets
    } else {
      maxDestinations = 1; // For smaller budgets
    }
    
    // Adjust for trip length
    if (days >= 10) {
      maxDestinations = Math.min(maxDestinations + 1, 3);
    }
    
    // Generate recommended combinations when budget or other params change
    // Pass starting location to consider when generating recommendations
    const bestCombo = getBestDestinationCombination(budget, days, persons, maxDestinations, startingLocation);
    setRecommendedCombinations(bestCombo);
  }, [budget, days, persons, startingLocation]);

  const handleDestinationToggle = (destinationId: string, isChecked: boolean) => {
    if (isChecked) {
      onChange([...selectedDestinations, destinationId]);
    } else {
      onChange(selectedDestinations.filter(id => id !== destinationId));
    }
  };

  const applyRecommendedCombination = () => {
    onChange(recommendedCombinations);
  };

  // Filter destinations based on search term, type, and affordability
  const filterDestinations = (destinations: typeof popularDestinations) => {
    return destinations.filter(destination => {
      const matchesSearch = 
        destination.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        destination.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
        destination.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesType = filterType === "all" || destination.type === filterType;
      
      const isAffordable = !showAffordableOnly || isDestinationAffordable(destination, budget, days, persons);
      
      return matchesSearch && matchesType && isAffordable;
    });
  };

  const renderRecommendedCombination = () => {
    if (!recommendedCombinations.length) return null;
    
    // Determine recommendation message based on budget and number of destinations
    let recommendationMessage = "";
    if (recommendedCombinations.length === 1) {
      recommendationMessage = "This destination fits well within your budget.";
    } else if (recommendedCombinations.length === 2) {
      recommendationMessage = "These two destinations can be visited together within your budget.";
    } else if (recommendedCombinations.length >= 3) {
      recommendationMessage = "Your generous budget allows for these multiple destinations.";
    }
    
    return (
      <div className="mb-6 p-4 border border-india-saffron/30 bg-orange-50 rounded-lg">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 text-india-saffron" />
            <h3 className="font-medium">Recommended Combination</h3>
          </div>
          <Button 
            variant="outline" 
            className="border-india-saffron text-india-saffron hover:bg-india-saffron/10"
            onClick={applyRecommendedCombination}
          >
            Select All
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recommendedCombinations.map(destId => {
            const destination = popularDestinations.find(d => d.id === destId);
            if (!destination) return null;
            
            return (
              <DestinationCard
                key={destination.id}
                destination={destination}
                isSelected={selectedDestinations.includes(destination.id)}
                onToggle={handleDestinationToggle}
                budgetCompatibility={getDestinationAffordability(destination, dailyBudget)}
                isRecommended={true}
              />
            );
          })}
        </div>
        
        <div className="mt-4 bg-white p-3 rounded-lg border border-gray-100">
          <div className="flex items-start gap-2">
            <MapPin className="h-5 w-5 text-india-saffron mt-0.5" />
            <div>
              <p className="text-sm text-gray-600">
                {recommendationMessage}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Budget: ₹{budget.toLocaleString('en-IN')} · {persons} {persons === 1 ? 'person' : 'people'} · {days} {days === 1 ? 'day' : 'days'}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderAllDestinations = () => {
    const filteredDestinations = filterDestinations(popularDestinations);
    
    if (filteredDestinations.length === 0) {
      return (
        <div className="p-6 text-center">
          <AlertCircle className="h-10 w-10 text-amber-500 mx-auto mb-2" />
          <h3 className="text-lg font-medium mb-2">No destinations match your criteria</h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your budget, search terms, or filters.
          </p>
          {showAffordableOnly && (
            <Button 
              variant="outline" 
              onClick={() => setShowAffordableOnly(false)}
            >
              Show All Destinations
            </Button>
          )}
        </div>
      );
    }
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDestinations.map((destination) => (
          <DestinationCard
            key={destination.id}
            destination={destination}
            isSelected={selectedDestinations.includes(destination.id)}
            onToggle={handleDestinationToggle}
            budgetCompatibility={getDestinationAffordability(destination, dailyBudget)}
            isRecommended={recommendedCombinations.includes(destination.id)}
          />
        ))}
      </div>
    );
  };

  const renderDestinationsByState = () => {
    return (
      <div className="space-y-6">
        {allStates.map(state => {
          const stateDestinations = getDestinationsByState(state);
          const filteredDestinations = filterDestinations(stateDestinations);
          
          if (filteredDestinations.length === 0) return null;
          
          return (
            <div key={state} className="space-y-2">
              <h3 className="font-medium text-gray-700">{state}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredDestinations.map((destination) => (
                  <DestinationCard
                    key={destination.id}
                    destination={destination}
                    isSelected={selectedDestinations.includes(destination.id)}
                    onToggle={handleDestinationToggle}
                    budgetCompatibility={getDestinationAffordability(destination, dailyBudget)}
                    isRecommended={recommendedCombinations.includes(destination.id)}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="flex-1">
          <Input
            placeholder="Search destinations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="w-full md:w-48">
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="beach">Beaches</SelectItem>
              <SelectItem value="mountain">Mountains</SelectItem>
              <SelectItem value="city">Cities</SelectItem>
              <SelectItem value="wildlife">Wildlife</SelectItem>
              <SelectItem value="historical">Historical</SelectItem>
              <SelectItem value="spiritual">Spiritual</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="flex items-center">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={showAffordableOnly}
            onChange={(e) => setShowAffordableOnly(e.target.checked)}
            className="rounded text-india-saffron"
          />
          <span>Show affordable destinations only</span>
        </label>
      </div>
      
      {renderRecommendedCombination()}
      
      <div className="space-y-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="all">All Destinations</TabsTrigger>
            <TabsTrigger value="by-state">By State</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="pt-4">
            {renderAllDestinations()}
          </TabsContent>
          
          <TabsContent value="by-state" className="pt-4">
            {renderDestinationsByState()}
          </TabsContent>
        </Tabs>
      </div>
      
      <div className="pt-2">
        <div className="flex items-center gap-2 text-sm">
          <Label className="font-medium">Budget guide:</Label>
          <Badge className="bg-green-100 text-green-800">budget</Badge>
          <Badge className="bg-yellow-100 text-yellow-800">moderate</Badge>
          <Badge className="bg-red-100 text-red-800">luxury</Badge>
        </div>
      </div>
      
      {selectedDestinations.length === 0 && (
        <p className="text-sm text-amber-600">
          Please select at least one destination
        </p>
      )}
    </div>
  );
};

export default DestinationSelector;
