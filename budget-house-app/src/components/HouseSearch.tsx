import React, { useState, useEffect } from 'react';
import { Search, MapPin, Home, Bed, Bath, Square, ExternalLink, SortAsc, SortDesc, Filter, Star, Heart, Calendar, Eye } from 'lucide-react';

interface House {
  id: string;
  title: string;
  price: number;
  location: string;
  area: number;
  rooms: number;
  bathrooms: number;
  description: string;
  imageUrl: string;
  url: string;
  type: 'house' | 'apartment';
  yearBuilt?: number;
  rating?: number;
  saved?: boolean;
  views?: number;
}

const HouseSearch: React.FC = () => {
  const [houses, setHouses] = useState<House[]>([
    {
      id: '1',
      title: 'Modern 2-bedroom apartment in city center',
      price: 35000,
      location: 'Riga, Center',
      area: 65,
      rooms: 2,
      bathrooms: 1,
      description: 'Beautiful renovated apartment in the heart of Riga. Close to all amenities, shops, and public transport. Recently renovated with modern finishes.',
      imageUrl: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&h=400&fit=crop',
      url: 'https://ss.lv/msg/lv/real-estate/flats/riga/centre/sample-1',
      type: 'apartment',
      yearBuilt: 2010,
      rating: 4.5,
      saved: false,
      views: 156
    },
    {
      id: '2',
      title: 'Spacious family house with garden',
      price: 45000,
      location: 'Jurmala',
      area: 120,
      rooms: 4,
      bathrooms: 2,
      description: 'Perfect family home with a large garden and garage. Quiet neighborhood with excellent schools nearby. Move-in ready condition.',
      imageUrl: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&h=400&fit=crop',
      url: 'https://ss.lv/msg/lv/real-estate/houses/jurmala/sample-2',
      type: 'house',
      yearBuilt: 2005,
      rating: 4.8,
      saved: true,
      views: 203
    },
    {
      id: '3',
      title: 'Contemporary studio in Old Town',
      price: 28000,
      location: 'Riga, Vecriga',
      area: 35,
      rooms: 1,
      bathrooms: 1,
      description: 'Stylish studio apartment in the historic Old Town. Perfect for young professionals or as an investment property.',
      imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop',
      url: 'https://ss.lv/msg/lv/real-estate/flats/riga/old-riga/sample-3',
      type: 'apartment',
      yearBuilt: 2018,
      rating: 4.2,
      saved: false,
      views: 89
    },
    {
      id: '4',
      title: 'Charming 3-bedroom house with potential',
      price: 38000,
      location: 'Ogre',
      area: 95,
      rooms: 3,
      bathrooms: 1,
      description: 'Solid house with great potential for renovation. Large lot with mature trees. Great opportunity for DIY enthusiasts.',
      imageUrl: 'https://images.unsplash.com/photo-1448630360428-65456885c650?w=600&h=400&fit=crop',
      url: 'https://ss.lv/msg/lv/real-estate/houses/ogre/sample-4',
      type: 'house',
      yearBuilt: 1995,
      rating: 3.8,
      saved: false,
      views: 67
    },
    {
      id: '5',
      title: 'Luxury apartment with city views',
      price: 42000,
      location: 'Riga, Quiet Center',
      area: 78,
      rooms: 2,
      bathrooms: 2,
      description: 'Premium apartment with stunning city views and high-end finishes. Building amenities include gym and rooftop terrace.',
      imageUrl: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&h=400&fit=crop',
      url: 'https://ss.lv/msg/lv/real-estate/flats/riga/quiet-center/sample-5',
      type: 'apartment',
      yearBuilt: 2015,
      rating: 4.7,
      saved: true,
      views: 324
    }
  ]);

  const [filteredHouses, setFilteredHouses] = useState<House[]>(houses);
  const [searchTerm, setSearchTerm] = useState('');
  const [maxPrice, setMaxPrice] = useState<number>(40000);
  const [minArea, setMinArea] = useState<number>(0);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'price' | 'area' | 'rooms' | 'rating'>('price');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Simulate fetching from ss.lv
  const searchSSLV = async () => {
    setLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const mockResults: House[] = [
      {
        id: '6',
        title: 'Renovated apartment near Daugava',
        price: 32000,
        location: 'Riga, Tornakalns',
        area: 45,
        rooms: 1,
        bathrooms: 1,
        description: 'Recently renovated apartment with river views. Walking distance to parks and city center.',
        imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop',
        url: 'https://ss.lv/msg/lv/real-estate/flats/riga/tornakalns/sample-6',
        type: 'apartment',
        yearBuilt: 2012,
        rating: 4.3,
        saved: false,
        views: 78
      },
      {
        id: '7',
        title: 'Country house with large grounds',
        price: 39000,
        location: 'Sigulda region',
        area: 110,
        rooms: 3,
        bathrooms: 1,
        description: 'Peaceful country home surrounded by nature. Perfect for those seeking tranquility.',
        imageUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop',
        url: 'https://ss.lv/msg/lv/real-estate/houses/sigulda/sample-7',
        type: 'house',
        yearBuilt: 2000,
        rating: 4.1,
        saved: false,
        views: 134
      }
    ];
    
    setHouses(prev => [...prev, ...mockResults]);
    setLoading(false);
  };

  // Filter and sort houses
  useEffect(() => {
    let filtered = houses.filter(house => {
      const matchesSearch = house.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           house.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPrice = house.price <= maxPrice;
      const matchesArea = house.area >= minArea;
      const matchesType = selectedType === 'all' || house.type === selectedType;
      
      return matchesSearch && matchesPrice && matchesArea && matchesType;
    });

    filtered.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'price':
          comparison = a.price - b.price;
          break;
        case 'area':
          comparison = a.area - b.area;
          break;
        case 'rooms':
          comparison = a.rooms - b.rooms;
          break;
        case 'rating':
          comparison = (a.rating || 0) - (b.rating || 0);
          break;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    setFilteredHouses(filtered);
  }, [houses, searchTerm, maxPrice, minArea, selectedType, sortBy, sortOrder]);

  const toggleSaved = (houseId: string) => {
    setHouses(prev => prev.map(house => 
      house.id === houseId ? { ...house, saved: !house.saved } : house
    ));
  };

  const openHouseListing = (url: string) => {
    window.open(url, '_blank');
  };

  const PropertyCard: React.FC<{ house: House }> = ({ house }) => (
    <div className="property-card group">
      {/* Image Section */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={house.imageUrl}
          alt={house.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Overlay Badges */}
        <div className="absolute top-4 left-4">
          <span className={`badge ${house.type === 'apartment' ? 'badge-primary' : 'badge-success'}`}>
            {house.type === 'apartment' ? 'Apartment' : 'House'}
          </span>
        </div>
        
        <div className="absolute top-4 right-4 flex space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleSaved(house.id);
            }}
            className={`p-2 rounded-xl backdrop-blur-sm transition-colors ${
              house.saved 
                ? 'bg-red-500 bg-opacity-90 text-white' 
                : 'bg-white bg-opacity-90 text-gray-600 hover:text-red-500'
            }`}
          >
            <Heart className={`h-4 w-4 ${house.saved ? 'fill-current' : ''}`} />
          </button>
        </div>

        <div className="absolute bottom-4 left-4">
          <div className="bg-white bg-opacity-95 backdrop-blur-sm px-3 py-1 rounded-xl">
            <span className="text-lg font-bold text-gray-900">€{house.price.toLocaleString()}</span>
          </div>
        </div>

        {house.rating && (
          <div className="absolute bottom-4 right-4">
            <div className="bg-white bg-opacity-95 backdrop-blur-sm px-2 py-1 rounded-xl flex items-center space-x-1">
              <Star className="h-3 w-3 text-yellow-400 fill-current" />
              <span className="text-xs font-medium text-gray-900">{house.rating}</span>
            </div>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
          {house.title}
        </h3>
        
        <div className="flex items-center text-gray-600 mb-3">
          <MapPin className="h-4 w-4 mr-1 text-gray-400" />
          <span className="text-sm">{house.location}</span>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-1">
              <Square className="h-4 w-4 text-gray-600" />
            </div>
            <div className="text-sm font-medium text-gray-900">{house.area}m²</div>
            <div className="text-xs text-gray-500">Area</div>
          </div>
          <div className="text-center">
            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-1">
              <Bed className="h-4 w-4 text-gray-600" />
            </div>
            <div className="text-sm font-medium text-gray-900">{house.rooms}</div>
            <div className="text-xs text-gray-500">Rooms</div>
          </div>
          <div className="text-center">
            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-1">
              <Bath className="h-4 w-4 text-gray-600" />
            </div>
            <div className="text-sm font-medium text-gray-900">{house.bathrooms}</div>
            <div className="text-xs text-gray-500">Baths</div>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{house.description}</p>

        <div className="flex items-center justify-between mb-4">
          {house.yearBuilt && (
            <div className="flex items-center text-xs text-gray-500">
              <Calendar className="h-3 w-3 mr-1" />
              Built {house.yearBuilt}
            </div>
          )}
          {house.views && (
            <div className="flex items-center text-xs text-gray-500">
              <Eye className="h-3 w-3 mr-1" />
              {house.views} views
            </div>
          )}
        </div>

        <button
          onClick={() => openHouseListing(house.url)}
          className="btn-primary w-full group"
        >
          <span>View Details</span>
          <ExternalLink className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Property Search</h1>
          <p className="text-gray-600 mt-1">Find your perfect home within your budget</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="btn-secondary lg:hidden"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </button>
          
          <button
            onClick={searchSSLV}
            disabled={loading}
            className="btn-primary"
          >
            {loading ? (
              <>
                <div className="loading-spinner mr-2" />
                Searching...
              </>
            ) : (
              <>
                <Search className="h-4 w-4 mr-2" />
                Search ss.lv
              </>
            )}
          </button>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className={`filter-section ${showFilters ? 'block' : 'hidden lg:block'}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Search Input */}
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Search Location</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Enter location or property name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>

          {/* Max Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Max Price: €{maxPrice.toLocaleString()}
            </label>
            <input
              type="range"
              min="20000"
              max="100000"
              step="5000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>€20k</span>
              <span>€100k</span>
            </div>
          </div>

          {/* Min Area */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Min Area: {minArea}m²
            </label>
            <input
              type="range"
              min="0"
              max="200"
              step="10"
              value={minArea}
              onChange={(e) => setMinArea(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0m²</span>
              <span>200m²</span>
            </div>
          </div>

          {/* Property Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="select-field"
            >
              <option value="all">All Types</option>
              <option value="apartment">Apartments</option>
              <option value="house">Houses</option>
            </select>
          </div>
        </div>

        {/* Sort Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4 border-t border-gray-200 mt-4">
          <div className="flex items-center space-x-4 mb-4 sm:mb-0">
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="select-field"
              >
                <option value="price">Price</option>
                <option value="area">Area</option>
                <option value="rooms">Rooms</option>
                <option value="rating">Rating</option>
              </select>
            </div>
            
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="btn-secondary"
            >
              {sortOrder === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
            </button>
          </div>

          <div className="text-sm text-gray-600">
            Found <span className="font-medium text-gray-900">{filteredHouses.length}</span> properties 
            under <span className="font-medium text-gray-900">€{maxPrice.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Properties Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-soft border border-gray-100">
              <div className="skeleton h-64" />
              <div className="p-6 space-y-3">
                <div className="skeleton-text h-4 w-3/4" />
                <div className="skeleton-text h-3 w-1/2" />
                <div className="flex space-x-4">
                  <div className="skeleton-text h-3 w-12" />
                  <div className="skeleton-text h-3 w-12" />
                  <div className="skeleton-text h-3 w-12" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : filteredHouses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHouses.map((house) => (
            <PropertyCard key={house.id} house={house} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Home className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No properties found</h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Try adjusting your search criteria or increase your budget limit to see more options.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => {
                setMaxPrice(60000);
                setMinArea(0);
                setSearchTerm('');
                setSelectedType('all');
              }}
              className="btn-primary"
            >
              Reset Filters
            </button>
            <button
              onClick={searchSSLV}
              className="btn-secondary"
            >
              Search ss.lv
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HouseSearch;