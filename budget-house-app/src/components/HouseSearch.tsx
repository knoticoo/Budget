import React, { useState, useEffect } from 'react';
import { Search, MapPin, Home, Bed, Bath, Square, ExternalLink, SortAsc, SortDesc } from 'lucide-react';

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
}

const HouseSearch: React.FC = () => {
  const [houses, setHouses] = useState<House[]>([
    {
      id: '1',
      title: 'Cozy 2-bedroom apartment in center',
      price: 35000,
      location: 'Riga, Center',
      area: 65,
      rooms: 2,
      bathrooms: 1,
      description: 'Beautiful renovated apartment in the heart of Riga. Close to all amenities.',
      imageUrl: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400',
      url: 'https://ss.lv/msg/lv/real-estate/flats/riga/centre/sample-1',
      type: 'apartment',
      yearBuilt: 2010
    },
    {
      id: '2',
      title: 'Family house with garden',
      price: 45000,
      location: 'Jurmala',
      area: 120,
      rooms: 4,
      bathrooms: 2,
      description: 'Spacious family house with a large garden. Perfect for families.',
      imageUrl: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400',
      url: 'https://ss.lv/msg/lv/real-estate/houses/jurmala/sample-2',
      type: 'house',
      yearBuilt: 2005
    },
    {
      id: '3',
      title: 'Modern studio apartment',
      price: 28000,
      location: 'Riga, Vecriga',
      area: 35,
      rooms: 1,
      bathrooms: 1,
      description: 'Modern studio in Old Riga. Fully furnished and ready to move in.',
      imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400',
      url: 'https://ss.lv/msg/lv/real-estate/flats/riga/old-riga/sample-3',
      type: 'apartment',
      yearBuilt: 2018
    },
    {
      id: '4',
      title: '3-bedroom house with basement',
      price: 38000,
      location: 'Ogre',
      area: 95,
      rooms: 3,
      bathrooms: 1,
      description: 'Solid house with basement storage. Good for renovation project.',
      imageUrl: 'https://images.unsplash.com/photo-1448630360428-65456885c650?w=400',
      url: 'https://ss.lv/msg/lv/real-estate/houses/ogre/sample-4',
      type: 'house',
      yearBuilt: 1995
    },
    {
      id: '5',
      title: 'Luxury 2-bedroom with balcony',
      price: 42000,
      location: 'Riga, Quiet Center',
      area: 78,
      rooms: 2,
      bathrooms: 2,
      description: 'Luxury apartment with beautiful balcony and city views.',
      imageUrl: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400',
      url: 'https://ss.lv/msg/lv/real-estate/flats/riga/quiet-center/sample-5',
      type: 'apartment',
      yearBuilt: 2015
    }
  ]);

  const [filteredHouses, setFilteredHouses] = useState<House[]>(houses);
  const [searchTerm, setSearchTerm] = useState('');
  const [maxPrice, setMaxPrice] = useState<number>(40000);
  const [minArea, setMinArea] = useState<number>(0);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'price' | 'area' | 'rooms'>('price');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [loading, setLoading] = useState(false);

  // Simulate fetching from ss.lv
  const searchSSLV = async () => {
    setLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock additional results that would come from ss.lv scraping
    const mockResults: House[] = [
      {
        id: '6',
        title: 'Renovated 1-bedroom near park',
        price: 32000,
        location: 'Riga, Tornakalns',
        area: 45,
        rooms: 1,
        bathrooms: 1,
        description: 'Recently renovated apartment near Daugava river and parks.',
        imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400',
        url: 'https://ss.lv/msg/lv/real-estate/flats/riga/tornakalns/sample-6',
        type: 'apartment',
        yearBuilt: 2012
      },
      {
        id: '7',
        title: 'Country house with land',
        price: 39000,
        location: 'Sigulda region',
        area: 110,
        rooms: 3,
        bathrooms: 1,
        description: 'House in nature with large plot of land. Perfect for weekend getaway.',
        imageUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400',
        url: 'https://ss.lv/msg/lv/real-estate/houses/sigulda/sample-7',
        type: 'house',
        yearBuilt: 2000
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

    // Sort results
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
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    setFilteredHouses(filtered);
  }, [houses, searchTerm, maxPrice, minArea, selectedType, sortBy, sortOrder]);

  const openHouseListing = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">House Search</h1>
            <p className="text-gray-600 mt-1">Find your perfect home within your budget</p>
          </div>
          <button
            onClick={searchSSLV}
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Searching ss.lv...</span>
              </>
            ) : (
              <>
                <Search className="h-4 w-4" />
                <span>Search ss.lv</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          {/* Search Input */}
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Search Location</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Enter location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Max Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Max Price (€)</label>
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Min Area */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Min Area (m²)</label>
            <input
              type="number"
              value={minArea}
              onChange={(e) => setMinArea(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Property Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Types</option>
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
            </select>
          </div>

          {/* Sort Options */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
            <div className="flex space-x-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'price' | 'area' | 'rooms')}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="price">Price</option>
                <option value="area">Area</option>
                <option value="rooms">Rooms</option>
              </select>
              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                {sortOrder === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="flex justify-between items-center">
        <p className="text-gray-600">
          Found {filteredHouses.length} properties under €{maxPrice.toLocaleString()}
        </p>
        <div className="text-sm text-gray-500">
          Data from ss.lv and other sources
        </div>
      </div>

      {/* House Listings */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHouses.map((house) => (
          <div key={house.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <div className="relative">
              <img
                src={house.imageUrl}
                alt={house.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  house.type === 'apartment' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                }`}>
                  {house.type === 'apartment' ? 'Apartment' : 'House'}
                </span>
              </div>
              <div className="absolute top-4 right-4">
                <span className="bg-white bg-opacity-90 px-2 py-1 rounded-full text-sm font-bold text-gray-900">
                  €{house.price.toLocaleString()}
                </span>
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{house.title}</h3>
              
              <div className="flex items-center text-gray-600 mb-3">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-sm">{house.location}</span>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Square className="h-4 w-4 text-gray-400" />
                  </div>
                  <div className="text-sm font-medium text-gray-900">{house.area}m²</div>
                  <div className="text-xs text-gray-500">Area</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Bed className="h-4 w-4 text-gray-400" />
                  </div>
                  <div className="text-sm font-medium text-gray-900">{house.rooms}</div>
                  <div className="text-xs text-gray-500">Rooms</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Bath className="h-4 w-4 text-gray-400" />
                  </div>
                  <div className="text-sm font-medium text-gray-900">{house.bathrooms}</div>
                  <div className="text-xs text-gray-500">Baths</div>
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{house.description}</p>

              {house.yearBuilt && (
                <div className="text-xs text-gray-500 mb-4">
                  Built in {house.yearBuilt}
                </div>
              )}

              <button
                onClick={() => openHouseListing(house.url)}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2 hover:bg-blue-700 transition-colors"
              >
                <span>View on ss.lv</span>
                <ExternalLink className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredHouses.length === 0 && (
        <div className="text-center py-12">
          <Home className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No properties found</h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your search criteria or increase your budget limit.
          </p>
          <button
            onClick={() => {
              setMaxPrice(50000);
              setMinArea(0);
              setSearchTerm('');
              setSelectedType('all');
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default HouseSearch;