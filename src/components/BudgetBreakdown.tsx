
import React, { useState } from 'react';
import { BudgetBreakdown as BudgetBreakdownType, BudgetRecommendation } from '@/types/trip';
import { formatCurrency } from '@/utils/tripUtils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Luggage, 
  Building, 
  Utensils, 
  Ticket, 
  Package, 
  IndianRupee,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface BudgetBreakdownProps {
  budget: BudgetBreakdownType;
  persons: number;
  travelRecommendations?: BudgetRecommendation[];
  accommodationRecommendations?: BudgetRecommendation[];
  foodRecommendations?: BudgetRecommendation[];
  miscRecommendations?: BudgetRecommendation[];
}

const BudgetBreakdown: React.FC<BudgetBreakdownProps> = ({ 
  budget, 
  persons,
  travelRecommendations = [],
  accommodationRecommendations = [],
  foodRecommendations = [],
  miscRecommendations = []
}) => {
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };
  
  const categories = [
    { 
      name: 'Travel', 
      amount: budget.travel, 
      percentage: (budget.travel / budget.total) * 100,
      icon: <Luggage className="h-5 w-5 text-blue-500" />,
      color: 'bg-blue-500',
      recommendations: travelRecommendations
    },
    { 
      name: 'Accommodation', 
      amount: budget.accommodation, 
      percentage: (budget.accommodation / budget.total) * 100,
      icon: <Building className="h-5 w-5 text-green-500" />,
      color: 'bg-green-500',
      recommendations: accommodationRecommendations
    },
    { 
      name: 'Food', 
      amount: budget.food, 
      percentage: (budget.food / budget.total) * 100,
      icon: <Utensils className="h-5 w-5 text-yellow-500" />,
      color: 'bg-yellow-500',
      recommendations: foodRecommendations
    },
    { 
      name: 'Activities', 
      amount: budget.activities, 
      percentage: (budget.activities / budget.total) * 100,
      icon: <Ticket className="h-5 w-5 text-purple-500" />,
      color: 'bg-purple-500',
      recommendations: []
    },
    { 
      name: 'Miscellaneous', 
      amount: budget.miscellaneous, 
      percentage: (budget.miscellaneous / budget.total) * 100,
      icon: <Package className="h-5 w-5 text-gray-500" />,
      color: 'bg-gray-500',
      recommendations: miscRecommendations
    }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {categories.map((category) => (
        <div key={category.name} className="space-y-2">
          <div 
            className={`flex items-center justify-between ${
              category.recommendations.length > 0 ? "cursor-pointer" : ""
            }`}
            onClick={() => category.recommendations.length > 0 && toggleCategory(category.name)}
          >
            <div className="flex items-center gap-2">
              {category.icon}
              <span className="font-medium">{category.name}</span>
              {category.recommendations.length > 0 && (
                expandedCategories[category.name] 
                  ? <ChevronUp className="h-4 w-4" /> 
                  : <ChevronDown className="h-4 w-4" />
              )}
            </div>
            <div className="flex items-center gap-1">
              <span className="font-semibold">{formatCurrency(category.amount)}</span>
              <span className="text-xs text-gray-500">
                ({formatCurrency(Math.round(category.amount / persons))} per person)
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Progress value={category.percentage} className={`h-2 ${category.color}`} />
            <span className="text-xs font-medium w-12">{Math.round(category.percentage)}%</span>
          </div>
          
          {expandedCategories[category.name] && category.recommendations.length > 0 && (
            <div className="mt-3 ml-6 space-y-3 border-l-2 pl-3 border-gray-200">
              {category.recommendations.map((rec, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between">
                    <span className="font-medium text-sm">{rec.name}</span>
                    <span className="text-sm">{formatCurrency(rec.cost)}</span>
                  </div>
                  <p className="text-xs text-gray-500">{rec.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderDetailedBreakdown = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="font-medium flex items-center gap-2">
          <Luggage className="h-5 w-5 text-blue-500" />
          Travel ({formatCurrency(budget.travel)})
        </h3>
        {travelRecommendations.length > 0 ? (
          <div className="space-y-3">
            {travelRecommendations.map((rec, idx) => (
              <div key={idx} className="p-3 border rounded-md">
                <div className="flex justify-between font-medium">
                  <span>{rec.name}</span>
                  <span>{formatCurrency(rec.cost)}</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{rec.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No travel recommendations available.</p>
        )}
      </div>
      
      <div className="space-y-4">
        <h3 className="font-medium flex items-center gap-2">
          <Building className="h-5 w-5 text-green-500" />
          Accommodation ({formatCurrency(budget.accommodation)})
        </h3>
        {accommodationRecommendations.length > 0 ? (
          <div className="space-y-3">
            {accommodationRecommendations.map((rec, idx) => (
              <div key={idx} className="p-3 border rounded-md">
                <div className="flex justify-between font-medium">
                  <span>{rec.name}</span>
                  <span>{formatCurrency(rec.cost)}</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{rec.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No accommodation recommendations available.</p>
        )}
      </div>
      
      <div className="space-y-4">
        <h3 className="font-medium flex items-center gap-2">
          <Utensils className="h-5 w-5 text-yellow-500" />
          Food ({formatCurrency(budget.food)})
        </h3>
        {foodRecommendations.length > 0 ? (
          <div className="space-y-3">
            {foodRecommendations.map((rec, idx) => (
              <div key={idx} className="p-3 border rounded-md">
                <div className="flex justify-between font-medium">
                  <span>{rec.name}</span>
                  <span>{formatCurrency(rec.cost)}</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{rec.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No food recommendations available.</p>
        )}
      </div>
      
      <div className="space-y-4">
        <h3 className="font-medium flex items-center gap-2">
          <Package className="h-5 w-5 text-gray-500" />
          Miscellaneous ({formatCurrency(budget.miscellaneous)})
        </h3>
        {miscRecommendations.length > 0 ? (
          <div className="space-y-3">
            {miscRecommendations.map((rec, idx) => (
              <div key={idx} className="p-3 border rounded-md">
                <div className="flex justify-between font-medium">
                  <span>{rec.name}</span>
                  <span>{formatCurrency(rec.cost)}</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{rec.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No miscellaneous recommendations available.</p>
        )}
      </div>
    </div>
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Budget Breakdown</span>
          <div className="flex items-center text-india-saffron">
            <IndianRupee className="h-5 w-5 mr-1" />
            <span>{formatCurrency(budget.total)}</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="detailed">Details</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="pt-4">
            {renderOverview()}
          </TabsContent>
          
          <TabsContent value="detailed" className="pt-4">
            {renderDetailedBreakdown()}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default BudgetBreakdown;
