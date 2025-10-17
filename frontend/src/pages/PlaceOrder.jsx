import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { toast } from 'react-toastify';
import Title from '../components/Title';
import razorpayLogo from '../assets/frontend_assets/razorpay_logo.png';

const PlaceOrder = () => {
  const { cart, totalPrice, deliveryFee, totalWithDelivery, currency } = useShop();
  const navigate = useNavigate();
  const [selectedPayment, setSelectedPayment] = useState(null);

  const handlePaymentSelect = (paymentMethod) => {
    setSelectedPayment(paymentMethod);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedPayment) {
      toast.error('Please select a payment method');
      return;
    }
    // Here you would typically handle the order submission to your backend
    // For now, we'll just navigate to the orders page
    navigate('/orders');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <Title text1="PLACE" text2="ORDER" />

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-5 gap-8 mt-8">
          {/* Delivery Information */}
          <div className="lg:col-span-3">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 h-full">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">Delivery Information</h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                  />
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Delivery Address *
                  </label>
                  <textarea
                    id="address"
                    rows="3"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      id="city"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                    />
                  </div>
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                      State/Province
                    </label>
                    <input
                      type="text"
                      id="state"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                    />
                  </div>
                  <div>
                    <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
                      Postal Code *
                    </label>
                    <input
                      type="text"
                      id="postalCode"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="instructions" className="block text-sm font-medium text-gray-700 mb-1">
                    Delivery Instructions (Optional)
                  </label>
                  <textarea
                    id="instructions"
                    rows="2"
                    placeholder="Any special instructions for delivery..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className="bg-gray-50 p-6 rounded-lg sticky top-4">
              <Title text1="ORDER" text2="SUMMARY" size="sm" className="mb-4" />
              
              <div className="space-y-4">
                {/* Cart Items */}
                <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
                  {cart.map((item) => (
                    <div key={`${item._id}-${item.selectedSize}`} className="flex items-start gap-3">
                      <div className="w-14 h-14 flex-shrink-0">
                        <img
                          src={item.image[0]}
                          alt={item.name}
                          className="w-full h-full object-cover rounded-md"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xs font-medium text-gray-800 mb-0.5">{item.name}</h4>
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] text-gray-500 leading-none">Size: {item.selectedSize}</span>
                          <span className="text-[10px] text-gray-500 leading-none">Qty: {item.quantity}</span>
                        </div>
                        <p className="text-xs font-medium text-gray-900 mt-1">
                          {currency} {item.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Totals */}
                <div className="border-t border-gray-200 pt-3 space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-900">{currency} {totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-gray-900">{deliveryFee === 0 ? 'Free' : `${currency} ${deliveryFee.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between font-medium pt-2 mt-2 border-t border-gray-200 text-sm">
                    <span className="text-gray-900">Total</span>
                    <span className="text-gray-900">{currency} {totalWithDelivery.toFixed(2)}</span>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="space-y-3">
                  <div className="border-t border-gray-200 my-3"></div>
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-gray-700">Payment Method</p>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => handlePaymentSelect('stripe')}
                        className={`relative flex items-center justify-center p-3 border-2 rounded-md hover:bg-gray-50 transition-colors ${
                          selectedPayment === 'stripe' 
                            ? 'border-green-500' 
                            : 'border-gray-200'
                        }`}
                      >
                        {selectedPayment === 'stripe' && (
                          <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                        <img 
                          src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" 
                          alt="Stripe" 
                          className="h-5"
                        />
                      </button>
                      <button
                        type="button"
                        onClick={() => handlePaymentSelect('razorpay')}
                        className={`relative flex items-center justify-center p-3 border-2 rounded-md hover:bg-gray-50 transition-colors ${
                          selectedPayment === 'razorpay' 
                            ? 'border-green-500' 
                            : 'border-gray-200'
                        }`}
                      >
                        {selectedPayment === 'razorpay' && (
                          <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                        <img 
                          src={razorpayLogo}
                          alt="Razorpay" 
                          className="h-5"
                        />
                      </button>
                      <button
                        type="button"
                        onClick={() => handlePaymentSelect('cod')}
                        className={`relative py-2 px-3 border-2 rounded-md hover:bg-gray-50 transition-colors text-sm font-medium ${
                          selectedPayment === 'cod' 
                            ? 'border-green-500' 
                            : 'border-gray-200'
                        }`}
                      >
                        {selectedPayment === 'cod' && (
                          <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                        Cash on Delivery
                      </button>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-colors mt-4"
                >
                  PLACE ORDER
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PlaceOrder;