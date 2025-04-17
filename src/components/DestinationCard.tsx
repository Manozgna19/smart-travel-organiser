
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Destination } from '@/types/trip';
import { Badge } from '@/components/ui/badge';
import { MapPin, IndianRupee, Star, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface DestinationCardProps {
  destination: Destination;
  isSelected: boolean;
  onToggle: (destinationId: string, isChecked: boolean) => void;
  budgetCompatibility?: 'budget' | 'moderate' | 'luxury';
  isRecommended?: boolean;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ 
  destination, 
  isSelected, 
  onToggle,
  budgetCompatibility = 'moderate',
  isRecommended = false
}) => {
  const handleClick = (e: React.MouseEvent) => {
    // Prevent event propagation if the click is on the checkbox itself
    if (e.target instanceof HTMLInputElement) {
      return;
    }
    onToggle(destination.id, !isSelected);
  };

  // Color mapping for budget compatibility
  const budgetColorMap = {
    'budget': 'bg-green-100 text-green-800',
    'moderate': 'bg-yellow-100 text-yellow-800',
    'luxury': 'bg-red-100 text-red-800'
  };

  // Budget compatibility explanation
  const getBudgetCompatibilityDescription = () => {
    switch (budgetCompatibility) {
      case 'budget':
        return "This destination is comfortably within your budget";
      case 'moderate':
        return "This destination is within your budget but might limit other expenses";
      case 'luxury':
        return "This destination may exceed your budget";
      default:
        return "Budget compatibility indicator";
    }
  };

  // Cost indicator based on costFactor
  const renderCostIndicator = () => {
    const rupees = [];
    const filledColor = 'text-india-saffron';
    const emptyColor = 'text-gray-300';
    
    // Calculate how many rupee symbols to show (1-5 scale based on cost factor)
    const maxRupees = 5;
    const filledRupees = Math.ceil(destination.costFactor * (maxRupees / 2));
    
    for (let i = 0; i < maxRupees; i++) {
      rupees.push(
        <IndianRupee 
          key={i} 
          className={`h-3.5 w-3.5 ${i < filledRupees ? filledColor : emptyColor}`} 
        />
      );
    }
    
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center cursor-help">
              {rupees}
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-xs">
              {filledRupees === 1 && "Very affordable destination"}
              {filledRupees === 2 && "Affordable destination"}
              {filledRupees === 3 && "Moderately priced destination"}
              {filledRupees === 4 && "Somewhat expensive destination"}
              {filledRupees === 5 && "Premium destination"}
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  return (
    <div 
      className={`p-3 border rounded-lg flex items-start gap-3 cursor-pointer transition-colors ${
        isSelected 
          ? 'border-india-saffron bg-orange-50' 
          : isRecommended
            ? 'border-india-saffron/50 bg-orange-50/50'
            : 'border-gray-200 hover:border-gray-300'
      }`}
      onClick={handleClick}
    >
      <Checkbox 
        id={`destination-${destination.id}`}
        checked={isSelected}
        className="mt-0.5"
        onCheckedChange={(checked) => onToggle(destination.id, checked as boolean)}
      />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Label 
              htmlFor={`destination-${destination.id}`}
              className="font-medium cursor-pointer"
            >
              {destination.name}
            </Label>
            {isRecommended && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <Star className="h-3.5 w-3.5 text-india-saffron ml-1" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">Recommended for your budget</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
          {renderCostIndicator()}
        </div>
        
        <div className="flex items-center mt-1 gap-1">
          <MapPin className="h-3 w-3 text-gray-500" />
          <p className="text-xs text-gray-500">{destination.state}</p>
        </div>
        
        <div className="flex items-center justify-between mt-2">
          <Badge variant="outline" className="text-xs capitalize">
            {destination.type}
          </Badge>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge className={`text-xs ${budgetColorMap[budgetCompatibility]}`}>
                  {budgetCompatibility}
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">{getBudgetCompatibilityDescription()}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;
