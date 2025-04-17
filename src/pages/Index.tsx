
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TripForm from '@/components/TripForm';
import BudgetBreakdown from '@/components/BudgetBreakdown';
import TripItinerary from '@/components/TripItinerary';
import PopularDestinations from '@/components/PopularDestinations';
import TransportOptions from '@/components/TransportOptions';
import HotelOptions from '@/components/HotelOptions';
import RestaurantRecommendations from '@/components/RestaurantRecommendations';
import { TripParams, TripPlan } from '@/types/trip';
import { generateTripPlan, getDestinationById } from '@/utils/tripUtils';
import { generateTrainOptions, generateBusOptions } from '@/utils/transportationUtils';
import { generateHotelOptions } from '@/utils/hotelUtils';
import { Button } from '@/components/ui/button';
import { MapPin, Calendar, Users, IndianRupee, Utensils, Bus, Train } from 'lucide-react';
import { formatDisplayDate } from '@/utils/dateUtils';
import { Badge } from '@/components/ui/badge';

const Index = () => {
  const [tripPlan, setTripPlan] = useState<TripPlan | null>(null);

  const handleFormSubmit = (params: TripParams) => {
    // Generate the base trip plan
    const plan = generateTripPlan(params);
    
    // Generate additional transportation options if requested
    if (params.transportMode === 'any' || params.transportMode === 'train') {
      const firstDestination = plan.destinations[0];
      const destObject = getDestinationById(firstDestination);
      plan.trainOptions = generateTrainOptions(
        plan.budgetBreakdown.travel,
        params.startingLocation,
        destObject?.name || "destination",
        params.persons
      );
    }
    
    if (params.transportMode === 'any' || params.transportMode === 'bus') {
      const firstDestination = plan.destinations[0];
      const destObject = getDestinationById(firstDestination);
      plan.busOptions = generateBusOptions(
        plan.budgetBreakdown.travel,
        params.startingLocation,
        destObject?.name || "destination",
        params.persons
      );
    }
    
    // Generate hotel options for each destination
    plan.hotelOptions = plan.destinations.flatMap(destId => 
      generateHotelOptions(
        destId,
        plan.budgetBreakdown.accommodation,
        params.days,
        params.persons,
        2 // Limit to 2 options per destination
      )
    );
    
    setTripPlan(plan);
    
    // Scroll to results
    setTimeout(() => {
      document.getElementById('trip-results')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const renderHero = () => (
    <div className="relative bg-india-pattern py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Plan Your Dream Trip to India
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Tell us your budget and preferences, and we'll create a personalized 
              itinerary for your perfect Indian adventure.
            </p>
            <Button 
              className="bg-india-saffron hover:bg-india-spice text-white px-8 py-6 text-lg"
              onClick={() => document.getElementById('planner')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Start Planning
            </Button>
          </div>
          <div className="hidden md:block relative">
            <img 
              src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1000" 
              alt="India Travel" 
              className="rounded-lg shadow-xl animate-float"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-india-saffron" />
                <span className="font-medium">Taj Mahal, Agra</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderFeatures = () => (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Plan Your Trip With Us?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <div className="h-16 w-16 bg-india-saffron/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <IndianRupee className="h-8 w-8 text-india-saffron" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Budget Friendly</h3>
            <p className="text-gray-600">
              Customize your trip based on your budget, with transparent cost breakdowns.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <div className="h-16 w-16 bg-india-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-8 w-8 text-india-green" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Personalized Itinerary</h3>
            <p className="text-gray-600">
              Get a day-by-day plan tailored to your travel dates and preferences.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <div className="h-16 w-16 bg-india-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="h-8 w-8 text-india-blue" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Curated Destinations</h3>
            <p className="text-gray-600">
              Discover hidden gems and popular attractions across incredible India.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPlanner = () => (
    <div id="planner" className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-2">
          Plan Your Trip
        </h2>
        <p className="text-center text-gray-600 mb-10">
          Fill in your travel details and we'll create a personalized itinerary
        </p>
        
        <TripForm onSubmit={handleFormSubmit} />
      </div>
    </div>
  );

  const renderTripSummary = () => {
    if (!tripPlan) return null;
    
    const { params, destinations, budgetBreakdown, itinerary, travelRecommendations, 
      foodRecommendations, miscRecommendations, flightOptions, trainOptions, 
      busOptions, hotelOptions, restaurantRecommendations } = tripPlan;
    
    const firstDestination = destinations[0];
    const destObject = getDestinationById(firstDestination);
    
    return (
      <div id="trip-results" className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Your Personalized India Trip
          </h2>
          
          <div className="bg-white p-6 rounded-xl shadow-md mb-10">
            <h3 className="text-xl font-semibold mb-4">Trip Summary</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-india-saffron" />
                <div>
                  <p className="text-sm text-gray-500">Dates</p>
                  <p className="font-medium">
                    {formatDisplayDate(params.startDate)} - {formatDisplayDate(params.endDate)}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-india-green" />
                <div>
                  <p className="text-sm text-gray-500">Travelers</p>
                  <p className="font-medium">{params.persons} {params.persons === 1 ? 'person' : 'people'}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-india-blue" />
                <div>
                  <p className="text-sm text-gray-500">Starting From</p>
                  <p className="font-medium">{params.startingLocation}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <IndianRupee className="h-5 w-5 text-purple-500" />
                <div>
                  <p className="text-sm text-gray-500">Duration</p>
                  <p className="font-medium">{params.days} {params.days === 1 ? 'day' : 'days'}</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 mb-4">
              <Utensils className="h-5 w-5 text-india-spice" />
              <div>
                <p className="text-sm text-gray-500">Food Preferences</p>
                <div className="flex gap-2 mt-1">
                  <Badge variant="outline" className="bg-gray-50">
                    {params.foodPreference === 'vegetarian' 
                      ? 'Vegetarian' 
                      : params.foodPreference === 'non-vegetarian' 
                      ? 'Non-Vegetarian' 
                      : 'No Preference'}
                  </Badge>
                  
                  {params.exploreLocalFood && (
                    <Badge variant="outline" className="bg-india-saffron/10 text-india-spice border-india-saffron/20">
                      Local Cuisine Explorer
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 mb-4">
              <Train className="h-5 w-5 text-india-green" />
              <div>
                <p className="text-sm text-gray-500">Transport Preference</p>
                <div className="flex gap-2 mt-1">
                  <Badge variant="outline" className="bg-gray-50">
                    {params.transportMode === 'flight' 
                      ? 'Flights' 
                      : params.transportMode === 'train' 
                      ? 'Trains' 
                      : params.transportMode === 'bus'
                      ? 'Buses'
                      : 'All Transport Options'}
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <h4 className="font-medium mb-2">Destinations:</h4>
              <div className="flex flex-wrap gap-2">
                {destinations.map(destId => {
                  const dest = getDestinationById(destId);
                  return (
                    <div key={destId} className="bg-gray-100 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                      <MapPin className="h-3.5 w-3.5 mr-1 text-india-saffron" />
                      {dest?.name || destId}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          
          <TransportOptions 
            flightOptions={flightOptions} 
            trainOptions={trainOptions}
            busOptions={busOptions}
            origin={params.startingLocation} 
            destination={destObject?.name || 'destination'} 
          />
          
          {hotelOptions && hotelOptions.length > 0 && (
            <HotelOptions 
              hotelOptions={hotelOptions} 
              destination={destObject?.name || 'destination'} 
            />
          )}
          
          {restaurantRecommendations && restaurantRecommendations.length > 0 && (
            <RestaurantRecommendations recommendations={restaurantRecommendations} />
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <BudgetBreakdown 
                budget={budgetBreakdown} 
                persons={params.persons}
                travelRecommendations={travelRecommendations}
                foodRecommendations={foodRecommendations}
                miscRecommendations={miscRecommendations}
              />
            </div>
            
            <div className="md:col-span-2">
              <TripItinerary itinerary={itinerary} />
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <Button className="bg-india-green hover:bg-india-green/90 text-white">
              Save Trip Plan
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {renderHero()}
        {renderFeatures()}
        {renderPlanner()}
        {renderTripSummary()}
        <PopularDestinations />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
