import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ onClose }) => {
  const { allProducts } = useShop();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const suggestions = query.trim()
    ? allProducts.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase())
      ).slice(0,8)
    : [];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/collection?search=${encodeURIComponent(query.trim())}`);
      setQuery('');
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    // Update URL parameters in real-time for filtering
    if (value.trim()) {
      navigate(`/collection?search=${encodeURIComponent(value.trim())}`, { replace: true });
    } else {
      navigate('/collection', { replace: true });
    }
  };

  return (
    <div className="relative w-full bg-gray-50 p-4 shadow-sm">
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-500 hover:text-gray-700 transition-colors z-10"
          aria-label="Close search"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
      <div className="max-w-md mx-auto">
        <form onSubmit={handleSubmit} className="relative">
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search products..."
            value={query}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-l-full rounded-r-full py-2 pl-3 pr-10 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </form>
        {suggestions.length > 0 && (
          <ul className="absolute z-20 w-full bg-white border border-gray-200 rounded-md mt-1 max-h-60 overflow-y-auto shadow-lg">
            {suggestions.map(item => (
              <li
                key={item._id}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                onClick={() => {
                  setQuery('');
                  navigate(`/product/${item._id}`);
                }}
              >
                {item.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchBar;