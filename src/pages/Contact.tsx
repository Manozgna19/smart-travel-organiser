
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Contact: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
        <p className="text-gray-600">
          Have questions or need help planning your trip? Reach out to us!
        </p>
        <div className="mt-8">
          <p>Email: contact@smarttravelorganiser.com</p>
          <p>Phone: +91 1234567890</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
