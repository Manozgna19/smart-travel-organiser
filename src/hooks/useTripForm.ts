
import { useState } from 'react';
import { TripParams } from '@/types/trip';
import { addDays } from 'date-fns';

const defaultStartDate = new Date();
defaultStartDate.setDate(defaultStartDate.getDate() + 30); // Default to 30 days from now

export const useTripForm = (onSubmit: (params: TripParams) => void) => {
  const [formData, setFormData] = useState<TripParams>({
    budget: 50000,
    days: 5,
    persons: 2,
    startDate: defaultStartDate,
    endDate: addDays(defaultStartDate, 5),
    startingLocation: '',
    destinationPreferences: [],
    foodPreference: 'no-preference',
    exploreLocalFood: true,
    transportMode: 'any',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof TripParams, string>>>({});
  const [activeTab, setActiveTab] = useState<string>('basics');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'days') {
      const days = parseInt(value);
      setFormData({
        ...formData,
        days,
        endDate: addDays(formData.startDate, days),
      });
    } else {
      setFormData({
        ...formData,
        [name]: name === 'budget' || name === 'persons' ? parseInt(value) : value,
      });
    }
  };

  const handleStartDateSelect = (date: Date | undefined) => {
    if (date) {
      const newEndDate = addDays(date, formData.days);
      setFormData({
        ...formData,
        startDate: date,
        endDate: newEndDate,
      });
    }
  };

  const handleDestinationsChange = (destinations: string[]) => {
    setFormData({
      ...formData,
      destinationPreferences: destinations,
    });
  };
  
  const handleFoodPreferenceChange = (preference: 'vegetarian' | 'non-vegetarian' | 'no-preference') => {
    setFormData({
      ...formData,
      foodPreference: preference,
    });
  };
  
  const handleExploreLocalFoodChange = (checked: boolean) => {
    setFormData({
      ...formData,
      exploreLocalFood: checked,
    });
  };
  
  const handleTransportModeChange = (mode: 'flight' | 'train' | 'bus' | 'any') => {
    setFormData({
      ...formData,
      transportMode: mode,
    });
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof TripParams, string>> = {};
    
    if (!formData.budget || formData.budget < 5000) {
      newErrors.budget = 'Budget must be at least ₹5,000';
    }
    
    if (!formData.days || formData.days < 1) {
      newErrors.days = 'Trip must be at least 1 day';
    }
    
    if (!formData.persons || formData.persons < 1) {
      newErrors.persons = 'Number of travelers must be at least 1';
    }
    
    if (!formData.startingLocation) {
      newErrors.startingLocation = 'Please enter your starting location';
    }
    
    if (formData.destinationPreferences.length === 0) {
      newErrors.destinationPreferences = 'Please select at least one destination';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    } else {
      // If we're on the basics tab but have destination errors, switch to destinations tab
      if (activeTab === 'basics' && errors.destinationPreferences) {
        setActiveTab('destinations');
      }
    }
  };

  const goToNextStep = () => setActiveTab('destinations');
  const goToPreviousStep = () => setActiveTab('basics');

  return {
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
  };
};
