import React from 'react';
import contactImage from '../assets/frontend_assets/contact_img.png';
import Title from '../components/Title';
import NewsLetterBox from '../components/NewsLetterBox';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <Title text1="CONTACT" text2="US" />
          <p className="mt-4 text-lg text-gray-600">
            Get in touch with us for any inquiries
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 p-6 md:p-8 flex items-center">
              <img 
                src={contactImage} 
                alt="Contact Us" 
                className="w-full h-auto object-cover"
                style={{ imageRendering: 'crisp-edges' }}
              />
            </div>
            <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
              <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Our Store</h3>
                  <p className="text-gray-700">
                    123 Fashion Street<br />
                    New York, NY 10001<br />
                    United States
                  </p>
              </div>
              <div className="space-y-2">
                <div>
                  <p className="text-gray-700">Email: info@example.com</p>
                </div>
                <div>
                  <p className="text-gray-700">Tel: +1 (555) 123-4567</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Business Hours</h3>
                  <p className="text-gray-700">
                    Monday - Friday: 9:00 AM - 6:00 PM<br />
                    Saturday: 10:00 AM - 4:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
              
              
            </div>
          </div>
        </div>
      </div>
      <NewsLetterBox/>
    </div>
  );
};

export default Contact;