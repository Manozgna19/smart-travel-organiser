
import React from 'react';
import { TripParams } from '@/types/trip';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TripFormBasics from './trip-form/TripFormBasics';
import TripFormDestinations from './trip-form/TripFormDestinations';
import { useTripForm } from '@/hooks/useTripForm';

interface TripFormProps {
  onSubmit: (params: TripParams) => void;
}

const TripForm: React.FC<TripFormProps> = ({ onSubmit }) => {
  const {
    formData,
    errors,
    activeTab,
    setActiveTab,
    handleChange,
    handleStartDateSelect,
    handleDestinationsChange,
    handleFoodPreferenceChange,
    handleExploreLocalFoodChange,
    handleTransportModeChange,
    handleSubmit,
    goToNextStep,
    goToPreviousStep
  } = useTripForm(onSubmit);

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
      <div className="p-6 md:p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Smart Travel Organizer</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="basics">Trip Basics</TabsTrigger>
              <TabsTrigger value="destinations">Select Destinations</TabsTrigger>
            </TabsList>
            
            <TabsContent value="basics">
              <TripFormBasics 
                formData={formData}
                errors={errors}
                handleChange={handleChange}
                handleStartDateSelect={handleStartDateSelect}
                handleFoodPreferenceChange={handleFoodPreferenceChange}
                handleExploreLocalFoodChange={handleExploreLocalFoodChange}
                handleTransportModeChange={handleTransportModeChange}
                onNextStep={goToNextStep}
              />
            </TabsContent>
            
            <TabsContent value="destinations">
              <TripFormDestinations 
                selectedDestinations={formData.destinationPreferences}
                budget={formData.budget}
                days={formData.days}
                persons={formData.persons}
                errors={errors}
                onDestinationsChange={handleDestinationsChange}
                onPreviousStep={goToPreviousStep}
              />
            </TabsContent>
          </Tabs>
        </form>
      </div>
    </div>
  );
};

export default TripForm;
