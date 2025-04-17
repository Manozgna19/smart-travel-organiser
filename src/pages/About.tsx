
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const About: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-8">About Smart Travel Organiser</h1>
        <p className="text-gray-600">
          We are passionate about helping travelers discover the magic of India, 
          creating personalized and unforgettable journeys tailored to your dreams.
        </p>
      </main>
      <Footer />
    </div>
  );
};

export default About;
