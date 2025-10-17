import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import Title from '../components/Title';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, totalPrice, deliveryFee, totalWithDelivery, currency } = useShop();
  const [editingQuantity, setEditingQuantity] = useState({ id: null, size: null, value: '' });
  const navigate = useNavigate();
  const handleQuantityClick = (id, size, currentQty) => {
    setEditingQuantity({ id, size, value: currentQty.toString() });
  };
  const handleProceedToCheckout = () => {
    navigate('/placeorder');
  };
  const handleQuantityChange = (e) => {
    const value = e.target.value;
    // Only allow numbers and empty string
    if (value === '' || /^\d+$/.test(value)) {
      setEditingQuantity(prev => ({ ...prev, value }));
    }
  };

  const handleQuantityBlur = () => {
    if (editingQuantity.value === '') {
      // If input is empty, revert to quantity of 1
      updateQuantity(editingQuantity.id, 1, editingQuantity.size);
    } else {
      const newQuantity = parseInt(editingQuantity.value, 10);
      if (newQuantity > 0) {
        updateQuantity(editingQuantity.id, newQuantity, editingQuantity.size);
      } else {
        // If quantity is 0 or negative, set to 1
        updateQuantity(editingQuantity.id, 1, editingQuantity.size);
      }
    }
    setEditingQuantity({ id: null, size: null, value: '' });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleQuantityBlur();
    }
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Title text1="SHOPPING" text2="CART" />

          <div className="text-center py-16">
            <div className="mb-6">
              <svg className="w-24 h-24 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6m0 0h15.5M17 21a2 2 0 100-4 2 2 0 000 4zM9 21a2 2 0 100-4 2 2 0 000 4z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Add some products to your cart to get started!</p>
            <a
              href="/collection"
              className="inline-block bg-black text-white px-8 py-3 rounded-md hover:bg-gray-800 transition-colors"
            >
              Continue Shopping
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <Title text1="SHOPPING" text2="CART" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={`${item._id}-${item.selectedSize}`} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                {/* Product Image */}
                <div className="w-20 h-20 flex-shrink-0">
                  <img
                    src={item.image[0]}
                    alt={item.name}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>

                {/* Product Details */}
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 mb-1">{item.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">
                    Size: <span className="font-medium">{item.selectedSize}</span>
                  </p>
                  <p className="text-lg font-bold text-gray-800">
                    {currency} {item.price.toFixed(2)}
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity - 1, item.selectedSize)}
                    className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
                    disabled={item.quantity <= 1}
                  >
                    <FaMinus className="w-3 h-3" />
                  </button>

                  {editingQuantity.id === item._id && editingQuantity.size === item.selectedSize ? (
                    <input
                      type="text"
                      value={editingQuantity.value}
                      onChange={handleQuantityChange}
                      onBlur={handleQuantityBlur}
                      onKeyPress={handleKeyPress}
                      className="w-12 h-8 border border-gray-300 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                      autoFocus
                    />
                  ) : (
                    <span 
                      className="w-12 h-8 flex items-center justify-center border border-gray-300 rounded-md font-medium cursor-text"
                      onClick={() => handleQuantityClick(item._id, item.selectedSize, item.quantity)}
                    >
                      {item.quantity}
                    </span>
                  )}

                  <button
                    onClick={() => updateQuantity(item._id, item.quantity + 1, item.selectedSize)}
                    className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
                  >
                    <FaPlus className="w-3 h-3" />
                  </button>
                </div>

                

                {/* Remove Button */}
                <button
                  onClick={() => removeFromCart(item._id, item.selectedSize)}
                  className="w-8 h-8 flex items-center justify-center text-red-500 hover:bg-red-50 rounded-md transition-colors"
                >
                  <FaTrash className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 p-6 rounded-lg sticky top-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">{currency} {totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery</span>
                  <span className="font-medium">{currency} {deliveryFee.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 my-3"></div>
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>{currency} {totalWithDelivery.toFixed(2)}</span>
                </div>
              </div>

              <button 
                onClick={handleProceedToCheckout}
                className="w-full bg-black text-white py-3 rounded-md mt-6 hover:bg-gray-800 transition-colors"
              >
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;