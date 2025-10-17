import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Title from '../components/Title';
import { useShop } from '../context/ShopContext';
import ProductItem from '../components/ProductItem';

const Collection = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    men: false,
    women: false,
    kids: false,
    topwear: false,
    bottomwear: false,
    winterwear: false
  });

  const [showFilters, setShowFilters] = useState(true);
  const [sortBy, setSortBy] = useState('default');
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  // Get search query from URL params
  const searchQuery = searchParams.get('search') || '';

  const { allProducts } = useShop();

  const sortOptions = [
    { value: 'default', label: 'Sort by: Default' },
    { value: 'low-to-high', label: 'Sort by: Low to High' },
    { value: 'high-to-low', label: 'Sort by: High to Low' }
  ];

  // Filter products based on selected filters
  const getFilteredProducts = () => {
    let filtered = allProducts;

    // Filter by search query (case-insensitive)
    if (searchQuery.trim()) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by gender/category
    const activeGenderFilters = Object.entries(filters)
      .filter(([key, value]) => ['men', 'women', 'kids'].includes(key) && value)
      .map(([key]) => key.charAt(0).toUpperCase() + key.slice(1));

    if (activeGenderFilters.length > 0) {
      filtered = filtered.filter(product =>
        activeGenderFilters.includes(product.category)
      );
    }

    // Filter by type
    const activeTypeFilters = Object.entries(filters)
      .filter(([key, value]) => ['topwear', 'bottomwear', 'winterwear'].includes(key) && value)
      .map(([key]) => key.charAt(0).toUpperCase() + key.slice(1).replace('wear', 'wear'));

    if (activeTypeFilters.length > 0) {
      filtered = filtered.filter(product =>
        activeTypeFilters.includes(product.subCategory)
      );
    }

    return filtered;
  };

  const filteredProducts = getFilteredProducts();

  // Sort products based on sortBy selection
  const getSortedProducts = (products) => {
    const sorted = [...products];

    switch (sortBy) {
      case 'low-to-high':
        return sorted.sort((a, b) => a.price - b.price);
      case 'high-to-low':
        return sorted.sort((a, b) => b.price - a.price);
      default:
        return sorted;
    }
  };

  const sortedProducts = getSortedProducts(filteredProducts);

  const handleFilterChange = (e) => {
    const { name, checked } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar - Left Column */}
        <div className="lg:col-span-1">
          {/* Filters Section */}
          <div className="mb-8">
            <div
              className="flex items-center justify-center cursor-pointer mb-4"
              onClick={() => setShowFilters(!showFilters)}
            >
              <h2 className="text-xl font-semibold font-bold">FILTERS</h2>
              <svg
                className={`w-5 h-5 ml-2 transition-transform duration-200 ${showFilters ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            {showFilters && (
              <>
                {/* Categories Filter */}
                <div className="border border-gray-200 rounded-lg p-4 mb-4">
                  <h3 className="font-medium mb-3 font-bold">CATEGORIES</h3>
                  <div className="space-y-2">
                    {['Men', 'Women', 'Kids'].map((gender) => (
                      <label key={gender} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          name={gender.toLowerCase()}
                          checked={filters[gender.toLowerCase()]}
                          onChange={handleFilterChange}
                          className="rounded border-gray-300 text-black focus:ring-black"
                        />
                        <span>{gender}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Type Filter */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-medium mb-3 font-bold">TYPE</h3>
                  <div className="space-y-2">
                    {['Topwear', 'Bottomwear', 'Winterwear'].map((type) => (
                      <label key={type} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          name={type.toLowerCase()}
                          checked={filters[type.toLowerCase()]}
                          onChange={handleFilterChange}
                          className="rounded border-gray-300 text-black focus:ring-black"
                        />
                        <span>{type}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Main Content - Right Column (3/4 width) */}
        <div className="lg:col-span-3">
          {/* Page Title and Sort */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              <span className="text-gray-400 font-normal">ALL</span>
              <span className="mx-2">|</span>
              COLLECTIONS
            </h1>

            {/* Sort Dropdown */}
            <div className="relative">
              <div
                className="border-2 border-gray-300 rounded-md px-3 py-2 text-sm bg-white cursor-pointer hover:border-gray-400 focus-within:border-black focus-within:ring-1 focus-within:ring-black"
                onClick={() => setShowSortDropdown(!showSortDropdown)}
              >
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">
                    {sortOptions.find(option => option.value === sortBy)?.label || 'Sort by: Default'}
                  </span>
                  <svg
                    className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${showSortDropdown ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {showSortDropdown && (
                <div className="absolute right-0 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
                  {sortOptions.map((option) => (
                    <div
                      key={option.value}
                      className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer first:rounded-t-md last:rounded-b-md"
                      onClick={() => {
                        setSortBy(option.value);
                        setShowSortDropdown(false);
                      }}
                    >
                      {option.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedProducts.length > 0 ? (
              sortedProducts.map((product) => (
                <ProductItem
                  key={product._id}
                  id={product._id}
                  image={product.image[0]}
                  name={product.name}
                  price={product.price}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-lg">No products found matching your filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collection;