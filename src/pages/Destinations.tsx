
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Destinations: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-8">Destinations</h1>
        <p className="text-gray-600">Explore our curated list of incredible destinations across India.</p>
      </main>
      <Footer />
    </div>
  );
};

export default Destinations;
