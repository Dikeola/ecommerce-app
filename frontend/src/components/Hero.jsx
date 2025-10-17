import React from 'react';
import heroImage from '../assets/frontend_assets/hero_img.png';

const Hero = () => {
  return (
    <div className="border-4 border-gray-200 rounded-lg overflow-hidden my-8">
      <div className="flex flex-col md:flex-row h-full">
        {/* Left side - Text content */}
        <div className="md:w-1/2 p-8 flex flex-col justify-center">
          <div className="flex items-center justify-center mb-2">
            <div className="w-12 h-1 bg-black mr-3"></div>
            <span className="text-sm uppercase tracking-widest text-gray-500">OUR BESTSELLERS</span>
          </div>
          <h5 className="text-4xl font-bold mb-6 text-center">Latest Arrivals</h5>
          <div className="flex items-center justify-center">
            <a href="#" className="text-sm uppercase tracking-widest hover:text-gray-900 transition-colors">
              SHOP NOW
            </a>
            <div className="w-12 h-1 bg-black ml-3"></div>
          </div>
        </div>
        
        {/* Right side - Hero Image */}
        <div className="md:w-1/2 flex-shrink-0">
          <img 
            src={heroImage} 
            alt="Latest Arrivals" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;