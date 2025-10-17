import React from 'react';
import aboutImage from '../assets/frontend_assets/about_img.png';
import Title from '../components/Title';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <Title text1="ABOUT" text2="US" />
          <p className="mt-4 text-lg text-gray-600">
            Learn more about our story and what makes us different
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="md:flex">
                <div className="md:w-1/2 p-6 md:p-8 flex items-center">
                            <img 
                                src={aboutImage} 
                                alt="About Us" 
                                className="w-full h-auto object-cover"
                                style={{ imageRendering: 'crisp-edges' }}
                            />
                </div>
            <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Story</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Welcome to our e-commerce platform, where style meets convenience. 
                  Founded in 2023, we've been committed to bringing you the latest 
                  trends and timeless classics at your fingertips.
                </p>
                <p>
                  Our mission is to provide an exceptional shopping experience with 
                  a carefully curated selection of high-quality products, competitive 
                  prices, and outstanding customer service.
                </p>
                <p>
                  We believe in sustainable fashion and ethical business practices. 
                  Each product in our collection is selected with care, considering 
                  both style and environmental impact.
                </p>
              </div>
              
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Why Choose Us?</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Premium Quality Products</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Fast & Reliable Shipping</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>24/7 Customer Support</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Secure Payment Options</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;