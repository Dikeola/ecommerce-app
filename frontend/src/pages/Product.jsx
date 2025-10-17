import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import RelatedProducts from '../components/RelatedProducts';
import { toast } from 'react-toastify';

const Product = () => {
  const { id } = useParams();
  const { allProducts, addToCart, totalItems } = useShop();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [activeTab, setActiveTab] = useState('description');

  // Find the product by ID
  const product = allProducts.find(p => p._id === id);

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Please select a size first', {
        autoClose: 3000,
      });
      return;
    }

    // Add product to cart with selected size
    addToCart({
      ...product,
      selectedSize: selectedSize
    });
  };

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h2>
          <p className="text-gray-600">The product you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start h-full">
        {/* Main Image Section - Left Side */}
        <div className="space-y-4 flex flex-col h-full">
          <div className="aspect-[3/4] bg-gray-100 overflow-hidden max-w-sm mx-auto">
            <img
              src={product.image[selectedImageIndex]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Thumbnail images - Below main image */}
          <div className="grid grid-cols-4 gap-2 mt-auto">
            {product.image.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                className={`aspect-square bg-gray-100 rounded-none overflow-hidden border-2 transition-all ${
                  selectedImageIndex === index
                    ? 'border-black'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <img
                  src={img}
                  alt={`${product.name} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details Section - Right Side */}
        <div className="space-y-6 flex flex-col h-full justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-3">{product.name}</h1>

            {/* Rating and Count */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-gray-600">4.0 (120 reviews)</span>
            </div>

            {/* Price */}
            <p className="text-2xl font-bold text-gray-800 mb-4">₹{product.price.toFixed(2)}</p>
          </div>

          <div className="space-y-4">
            {/* Tabbed Section */}
          <div className="space-y-4">
            {/* Tab Headers */}
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab('description')}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  activeTab === 'description'
                    ? 'border-b-2 border-black text-black'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  activeTab === 'reviews'
                    ? 'border-b-2 border-black text-black'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Reviews(10)
              </button>
            </div>

            {/* Tab Content */}
            <div className="min-h-[200px]">
              {activeTab === 'description' ? (
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Product Description</h3>
                  <p className="text-gray-600 leading-relaxed">
                    This is a sample product description. In a real application, this would contain
                    detailed information about the {product.name.toLowerCase()}, including features,
                    specifications, materials, care instructions, and other relevant details that help
                    customers make informed purchasing decisions.
                  </p>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-1">Category</h4>
                        <p className="text-gray-600 capitalize">{product.category}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-800 mb-1">Type</h4>
                        <p className="text-gray-600 capitalize">{product.subCategory}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className="font-semibold text-gray-800 mb-4">Customer Reviews</h3>
                  <div className="space-y-4">
                    {/* Sample Reviews */}
                    <div className="border-b border-gray-200 pb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-4 h-4 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">John D. - 2 days ago</span>
                      </div>
                      <p className="text-gray-700">Great quality product! Fits perfectly and the material feels premium.</p>
                    </div>

                    <div className="border-b border-gray-200 pb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-4 h-4 ${i < 5 ? 'text-yellow-400' : 'text-gray-300'}`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">Sarah M. - 1 week ago</span>
                      </div>
                      <p className="text-gray-700">Absolutely love this! The sizing is perfect and it arrived quickly.</p>
                    </div>

                    <div className="text-center py-8">
                      <button className="text-gray-600 hover:text-gray-900 transition-colors">
                        View all 10 reviews →
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

        
          </div>

          

          {/* Size Selection */}
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Select Size</h3>
              <div className="grid grid-cols-5 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`border py-2 px-2 text-sm transition-colors ${
                      selectedSize === size
                        ? 'border-black bg-black text-white'
                        : 'border-gray-300 hover:border-black'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-black text-white py-3 px-6 hover:bg-gray-800 transition-colors"
            >
              ADD TO CART
            </button>
            
          </div>

          {/* Product Policies */}
          <div className="space-y-3 pt-6 border-t border-gray-200">
            <p className="text-gray-700 font-medium">100% original</p>
            <p className="text-gray-700">Cash on delivery is available on this product</p>
            <p className="text-gray-700">Easy return and exchange policy within 7 days</p>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <RelatedProducts />
    </div>
  );
};

export default Product;