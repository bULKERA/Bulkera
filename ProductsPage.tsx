import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ui/ProductCard';
import { products, getCategories } from '../data/products';
import { Product } from '../types';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import Button from '../components/ui/Button';

const ProductsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [categories, setCategories] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Get URL params
  const categoryParam = searchParams.get('category');
  const searchParam = searchParams.get('search');
  
  // State for filters
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || '');
  const [searchQuery, setSearchQuery] = useState(searchParam || '');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  
  useEffect(() => {
    setCategories(getCategories());
  }, []);
  
  // Update filters when URL params change
  useEffect(() => {
    setSelectedCategory(categoryParam || '');
    setSearchQuery(searchParam || '');
  }, [categoryParam, searchParam]);
  
  // Filter products
  useEffect(() => {
    let filtered = [...products];
    
    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query)
      );
    }
    
    // Filter by price
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    setFilteredProducts(filtered);
  }, [selectedCategory, searchQuery, priceRange]);
  
  // Apply filters to URL
  const applyFilters = () => {
    const params = new URLSearchParams();
    if (selectedCategory) params.set('category', selectedCategory);
    if (searchQuery) params.set('search', searchQuery);
    setSearchParams(params);
    setIsFilterOpen(false);
  };
  
  // Reset filters
  const resetFilters = () => {
    setSelectedCategory('');
    setSearchQuery('');
    setPriceRange([0, 100]);
    setSearchParams({});
    setIsFilterOpen(false);
  };
  
  return (
    <div className="bg-gray-50 min-h-screen pt-24">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">All Products</h1>
          <p className="text-gray-600">
            Browse our collection of premium fitness gear
          </p>
        </div>
        
        {/* Search and Filter Bar */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') applyFilters();
              }}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
          
          <div className="flex gap-2 w-full md:w-auto">
            <Button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              variant="outline"
              className="flex items-center"
            >
              <SlidersHorizontal size={18} className="mr-2" />
              Filters
            </Button>
            
            <Button onClick={applyFilters}>
              Apply Filters
            </Button>
          </div>
        </div>
        
        {/* Filter Panel */}
        {isFilterOpen && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Filters</h3>
              <button 
                onClick={() => setIsFilterOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Categories */}
              <div>
                <h4 className="font-medium mb-3">Categories</h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="all-categories"
                      name="category"
                      className="h-4 w-4 text-blue-600"
                      checked={selectedCategory === ''}
                      onChange={() => setSelectedCategory('')}
                    />
                    <label htmlFor="all-categories" className="ml-2 text-gray-700">
                      All Categories
                    </label>
                  </div>
                  
                  {categories.map((category) => (
                    <div key={category} className="flex items-center">
                      <input
                        type="radio"
                        id={category}
                        name="category"
                        className="h-4 w-4 text-blue-600"
                        checked={selectedCategory === category}
                        onChange={() => setSelectedCategory(category)}
                      />
                      <label htmlFor={category} className="ml-2 text-gray-700 capitalize">
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Price Range */}
              <div>
                <h4 className="font-medium mb-3">Price Range</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">${priceRange[0]}</span>
                    <span className="text-gray-700">${priceRange[1]}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  />
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex items-end">
                <Button variant="outline" onClick={resetFilters} className="w-full">
                  Reset Filters
                </Button>
              </div>
            </div>
          </div>
        )}
        
        {/* Results */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <h3 className="text-xl font-semibold mb-2">No products found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search or filter criteria
            </p>
            <Button onClick={resetFilters}>Clear Filters</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;