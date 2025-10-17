import React from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useShop();

  return (
    <Link 
      to={`/product/${id}`}
      className="block"
    >
      <div className="bg-white rounded-lg overflow-hidden transition-shadow duration-300 h-full flex flex-col">
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden">
          <img 
            src={image} 
            alt={name}
            className="w-full h-full object-contain p-4 hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-2">{name}</h3>
          <p className="text-lg font-bold text-gray-900">
            {currency} {price.toFixed(2)}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;