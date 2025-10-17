import React from 'react';
import { useShop } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {
  const { allProducts } = useShop();
  
  // Get the first 6 products and filter out the second one (index 1)
  const bestSellers = allProducts.slice(0, 6).filter((_, index) => index !== 1).slice(0, 5);

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <Title text1="BEST" text2="SELLERS" />
        <p className="text-gray-600 mt-2">
          Discover our most loved products that customers can't get enough of. These bestsellers combine 
          exceptional quality, timeless design, and outstanding value.
        </p>
      </div>
      
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {bestSellers.map((product) => (
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

export default BestSeller;