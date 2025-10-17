import React from 'react';
import { assets } from '../assets/frontend_assets/assets';

const PolicyCard = ({ icon, title, description }) => (
  <div className="flex flex-col items-center text-center px-4 py-6">
    <img 
      src={icon} 
      alt={title} 
      className="h-16 w-16 object-contain mb-4"
    />
    <h3 className="text-xl font-semibold text-gray-900 mb-2">
      {title}
    </h3>
    <p className="text-gray-600">
      {description}
    </p>
  </div>
);

const OurPolicy = () => {
  const policies = [
    {
      icon: assets.exchange_icon,
      title: "Easy Exchange Policy",
      description: "We offer hassle free exchange policy"
    },
    {
      icon: assets.quality_icon,
      title: "7 Days Return Policy",
      description: "We provide 7 days free return policy"
    },
    {
      icon: assets.support_img,
      title: "Best Customer Support",
      description: "We provide 24/7 customer support"
    }
  ];

  return (
    <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {policies.map((policy, index) => (
            <PolicyCard
              key={index}
              icon={policy.icon}
              title={policy.title}
              description={policy.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurPolicy;