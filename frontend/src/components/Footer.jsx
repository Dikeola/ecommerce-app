import React from 'react';
import { assets } from '../assets/frontend_assets/assets';
import { FaPhone, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white text-gray-800 py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-200">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* First Column - Logo and Description */}
          <div className="md:col-span-5 space-y-4">
            <img 
              src={assets.logo} 
              alt="Company Logo" 
              className="h-10 w-auto"
            />
            <p className="text-gray-600 leading-relaxed">
              Your one-stop destination for the latest fashion trends and styles.
              We offer high-quality products with the best prices and exceptional customer service.
              Discover our curated collection of premium clothing and accessories.
            </p>
          </div>
          
          {/* Second Column - Company Links */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="text-lg font-semibold text-gray-900">COMPANY</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Home</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Delivery</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
          
          {/* Third Column - Contact Info */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">GET IN TOUCH</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <FaPhone className="text-gray-500" />
                <a href="tel:+1234567890" className="text-gray-600 hover:text-gray-900 transition-colors">
                  +1 (234) 567-890
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-gray-500" />
                <a href="mailto:info@example.com" className="text-gray-600 hover:text-gray-900 transition-colors">
                  info@example.com
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Copyright text */}
        <div className="border-t border-gray-200 mt-12 pt-8 text-center text-gray-500 text-sm">
          <p className="font-semibold">© {new Date().getFullYear()} forever.com - All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;