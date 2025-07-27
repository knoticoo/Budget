import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Wallet, Home, Menu, X } from 'lucide-react';
import BudgetApp from './components/BudgetApp';
import HouseSearch from './components/HouseSearch';
import './App.css';

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-blue-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 text-white text-xl font-bold">
              <Wallet className="h-8 w-8" />
              <span className="hidden sm:block">Budget & House Finder</span>
              <span className="sm:hidden">BHF</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/') || isActive('')
                  ? 'bg-blue-700 text-white'
                  : 'text-blue-100 hover:bg-blue-500 hover:text-white'
              }`}
            >
              <Wallet className="h-5 w-5" />
              <span>Budget</span>
            </Link>
            <Link
              to="/house-search"
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/house-search')
                  ? 'bg-blue-700 text-white'
                  : 'text-blue-100 hover:bg-blue-500 hover:text-white'
              }`}
            >
              <Home className="h-5 w-5" />
              <span>House Search</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-blue-100 hover:text-white focus:outline-none focus:text-white"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/') || isActive('')
                    ? 'bg-blue-700 text-white'
                    : 'text-blue-100 hover:bg-blue-500 hover:text-white'
                }`}
              >
                <Wallet className="h-5 w-5" />
                <span>Budget</span>
              </Link>
              <Link
                to="/house-search"
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/house-search')
                    ? 'bg-blue-700 text-white'
                    : 'text-blue-100 hover:bg-blue-500 hover:text-white'
                }`}
              >
                <Home className="h-5 w-5" />
                <span>House Search</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<BudgetApp />} />
            <Route path="/house-search" element={<HouseSearch />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
