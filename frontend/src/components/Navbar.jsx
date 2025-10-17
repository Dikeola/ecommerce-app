import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/frontend_assets/logo.png';
import searchIcon from '../assets/frontend_assets/search_icon.png';
import SearchBar from './SearchBar';
import profileIcon from '../assets/frontend_assets/profile_icon.png';
import cartIcon from '../assets/frontend_assets/cart_icon.png';
import menuIcon from '../assets/frontend_assets/menu_icon.png';
import { useShop } from '../context/ShopContext';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const dropdownRef = useRef(null);
  const sidebarRef = useRef(null);
  const { totalItems } = useShop();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (sidebarRef.current && !sidebarRef.current.contains(event.target) && !event.target.closest('button[aria-label="Menu"]')) {
        setIsSidebarOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    // Disable body scroll when sidebar is open
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'auto';
    };
  }, [isSidebarOpen]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const dropdownItemStyle = "block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100";
  // Active link style function
  const navLinkStyle = ({ isActive }) => 
    `uppercase text-sm px-4 py-2 relative ${
      isActive 
        ? 'text-black font-bold border-b-2 border-black' 
        : 'text-gray-600 hover:text-black hover:border-b-2 hover:border-gray-300'
    }`;

  return (
    <>
      <div className='border-b border-gray-200'>
        <div className='max-w-7xl mx-auto px-4'>
          <div className='flex items-center justify-between py-5'>
            <NavLink 
              to="/" 
              className="block hover:opacity-80 transition-opacity duration-200"
              aria-label="Home"
            >
              <img src={logo} alt="Logo" className='w-36' />
            </NavLink>
            
            <nav className='hidden md:flex items-center gap-6 absolute left-1/2 transform -translate-x-1/2'>
              <NavLink to="/" className={navLinkStyle}>
                HOME
              </NavLink>
              <NavLink to="/collection" className={navLinkStyle}>
                COLLECTION
              </NavLink>
              <NavLink to="/about" className={navLinkStyle}>
                ABOUT
              </NavLink>
              <NavLink to="/contact" className={navLinkStyle}>
                CONTACT
              </NavLink>
            </nav>
            
            <div className='flex items-center gap-6 ml-auto' ref={dropdownRef}>
              <button className='text-gray-600 hover:opacity-80' onClick={() => setShowSearch(!showSearch)}>
                <img src={searchIcon} alt="Search" className='w-5 h-5' />
              </button>
              <div className='flex items-center gap-6'>
                <button 
                  className='md:hidden text-gray-600 hover:opacity-80'
                  onClick={() => setIsSidebarOpen(true)}
                  aria-label="Menu"
                >
                  <img src={menuIcon} alt="Menu" className='w-6 h-6' />
                </button>
                <div className='relative'>
                  <button 
                    onClick={toggleDropdown}
                    className='text-gray-600 hover:opacity-80 focus:outline-none w-5 cursor-pointer'
                    aria-haspopup="true"
                    aria-expanded={isDropdownOpen}
                  >
                    <img src={profileIcon} alt="Profile" className='w-5 h-5' />
                  </button>
                  
                  {isDropdownOpen && (
                    <div className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50'>
                      <NavLink 
                        to="/profile" 
                        className={dropdownItemStyle}
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        My Profile
                      </NavLink>
                      <NavLink 
                        to="/orders" 
                        className={dropdownItemStyle}
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Orders
                      </NavLink>
                      <button 
                        className={`${dropdownItemStyle} w-full text-left`}
                        onClick={() => {
                          // Handle logout logic here
                          setIsDropdownOpen(false);
                        }}
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
                <NavLink to="/cart" className='relative hover:opacity-80'>
                  <img src={cartIcon} alt="Cart" className='w-5 h-5' />
                  <span className='absolute -top-2 -right-2 bg-black text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center'>{totalItems}</span>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showSearch && (
        <div className='px-4 pb-4'>
          <SearchBar onClose={() => setShowSearch(false)} />
        </div>
      )}
      {/* Mobile Sidebar */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsSidebarOpen(false)}
      >
        <div 
          ref={sidebarRef}
          className={`fixed top-0 right-0 h-full w-80 bg-white transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className='p-4 border-b border-gray-200'>
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className='text-black hover:opacity-70 flex items-center gap-2'
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Back
            </button>
          </div>
          <div className='p-4 space-y-4'>
            <NavLink 
              to="/" 
              className='block text-lg font-medium text-gray-800 hover:bg-gray-100 p-3 rounded-md transition-colors'
              onClick={() => setIsSidebarOpen(false)}
            >
              HOME
            </NavLink>
            <NavLink 
              to="/collection" 
              className='block text-lg font-medium text-gray-800 hover:bg-gray-100 p-3 rounded-md transition-colors'
              onClick={() => setIsSidebarOpen(false)}
            >
              COLLECTION
            </NavLink>
            <NavLink 
              to="/about" 
              className='block text-lg font-medium text-gray-800 hover:bg-gray-100 p-3 rounded-md transition-colors'
              onClick={() => setIsSidebarOpen(false)}
            >
              ABOUT
            </NavLink>
            <NavLink 
              to="/contact" 
              className='block text-lg font-medium text-gray-800 hover:bg-gray-100 p-3 rounded-md transition-colors'
              onClick={() => setIsSidebarOpen(false)}
            >
              CONTACT
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;