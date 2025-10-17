import React from 'react';
import { useParams } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const RelatedProducts = () => {
  const { id } = useParams();
  const { allProducts } = useShop();

  // Find the current product
  const currentProduct = allProducts.find(p => p._id === id);

  if (!currentProduct) {
    return null;
  }

  // Get related products (same category, excluding current product, max 4)
  const relatedProducts = allProducts
    .filter(product =>
      product._id !== id &&
      (product.category === currentProduct.category ||
       product.subCategory === currentProduct.subCategory)
    )
    .slice(0, 4);

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Title text1="RELATED" text2="PRODUCTS" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {relatedProducts.map((product) => (
            <ProductItem
              key={product._id}
              id={product._id}
              image={product.image[0]}
              name={product.name}
              price={product.price}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedProducts;