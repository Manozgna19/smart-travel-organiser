
import React from 'react';
import { MapPin, Mail, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-gray-800 text-white py-10 mt-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="h-6 w-6 text-india-saffron" />
              <h2 className="text-xl font-semibold">Smart Travel Organiser</h2>
            </div>
            <p className="text-gray-300 mb-4">
              Plan your dream trip to India with customized itineraries based on your budget and preferences.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-india-saffron transition-colors">Home</a></li>
              <li><a href="#" className="text-gray-300 hover:text-india-saffron transition-colors">Destinations</a></li>
              <li><a href="#" className="text-gray-300 hover:text-india-saffron transition-colors">Trip Planner</a></li>
              <li><a href="#" className="text-gray-300 hover:text-india-saffron transition-colors">About Us</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-india-saffron" />
                <span className="text-gray-300">contact@smarttravelorganiser.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-india-saffron" />
                <span className="text-gray-300">+91 1234567890</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Smart Travel Organiser. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
