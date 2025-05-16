import React from 'react';
import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-gray-900 border-b border-gray-800">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-md">
              <Mail className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              GetMail
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-gray-300 hover:text-white transition-colors">
              Home
            </Link>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">
              How It Works
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">
              FAQ
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;