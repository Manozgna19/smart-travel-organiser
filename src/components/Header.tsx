
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="w-full py-4 px-6 bg-white shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <MapPin className="h-8 w-8 text-india-saffron" />
          <h1 className="text-2xl font-bold bg-clip-text text-transparent india-gradient">
            Smart Travel Organiser
          </h1>
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-600 hover:text-india-saffron transition-colors">
            Home
          </Link>
          <Link to="/destinations" className="text-gray-600 hover:text-india-saffron transition-colors">
            Destinations
          </Link>
          <Link to="/about" className="text-gray-600 hover:text-india-saffron transition-colors">
            About
          </Link>
          <Link to="/contact" className="text-gray-600 hover:text-india-saffron transition-colors">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
