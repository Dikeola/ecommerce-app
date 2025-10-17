import React from 'react';
import { useShop } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const LatestCollection = () => {
  const { allProducts } = useShop();
  
  // Get the first 11 products and filter out the second one (index 1)
  const latestProducts = allProducts.slice(0, 11).filter((_, index) => index !== 1).slice(0, 10);

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <Title text1="LATEST" text2="COLLECTIONS" />
        <p className="text-gray-600 mt-2">
          Discover our newest arrivals and stay ahead of the fashion curve with our latest collection of premium products.
        </p>
      </div>
      
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {latestProducts.map((product) => (
            <ProductItem
              key={product._id}
              id={product._id}
              image={product.image}
              name={product.name}
              price={product.price}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestCollection;