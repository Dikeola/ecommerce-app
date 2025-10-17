import React from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import Title from '../components/Title';

const Orders = () => {
  const { orders = [] } = useShop();

  // Mock data - replace with actual data from your backend
  const mockOrders = [
    {
      id: 'ORD-12345',
      date: '2023-10-15T10:30:00Z',
      status: 'delivered',
      totalPrice: 149.99,
      currency: '₹',
      paymentMethod: 'razorpay',
      isPaid: true,
      paidAt: '2023-10-15T10:32:15Z',
      shippingAddress: {
        name: 'John Doe',
        address: '123 Main St',
        city: 'Mumbai',
        postalCode: '400001',
        country: 'India'
      },
      items: [
        {
          id: '1',
          name: 'Classic White T-Shirt',
          price: 1499.99,
          quantity: 1,
          image: 'https://example.com/tshirt.jpg',
          size: 'M'
        },
        {
          id: '2',
          name: 'Slim Fit Jeans',
          price: 2499.99,
          quantity: 1,
          image: 'https://example.com/jeans.jpg',
          size: '32'
        }
      ]
    },
    {
      id: 'ORD-12346',
      date: '2023-10-10T14:20:00Z',
      status: 'shipped',
      totalPrice: 899.99,
      currency: '₹',
      paymentMethod: 'stripe',
      isPaid: true,
      paidAt: '2023-10-10T14:22:30Z',
      shippingAddress: {
        name: 'Jane Smith',
        address: '456 Oak Ave',
        city: 'Delhi',
        postalCode: '110001',
        country: 'India'
      },
      items: [
        {
          id: '3',
          name: 'Casual Sneakers',
          price: 899.99,
          quantity: 1,
          image: 'https://example.com/sneakers.jpg',
          size: '9'
        }
      ]
    }
  ];

  // Use mock data if no orders are available from context
  const displayOrders = orders.length > 0 ? orders : mockOrders;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <Title text1="YOUR" text2="ORDERS" />
        
        <div className="mt-8 space-y-6">
          {displayOrders.length > 0 ? (
            displayOrders.flatMap(order => 
              order.items.map((item, index) => (
                <div 
                  key={`${order.id}-${item.id}-${index}`} 
                  className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex"
                >
                  {/* Item Image */}
                  <div className="w-24 h-24 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                    <img
                      src={item.image || 'https://via.placeholder.com/96'}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/96';
                      }}
                    />
                  </div>
                  
                  {/* Item Details */}
                  <div className="ml-4 flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                      <span className="text-sm font-medium text-gray-900">
                        {order.currency || '₹'}{(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                    
                    <div className="mt-1 text-sm text-gray-500">
                      <p>Qty: {item.quantity} × {order.currency || '₹'}{item.price.toFixed(2)}</p>
                      {item.size && <p>Size: {item.size}</p>}
                      <p className="text-xs text-gray-400 mt-1">
                        Ordered on {new Date(order.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                    
                    <div className="mt-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        order.status === 'delivered' 
                          ? 'bg-green-100 text-green-800' 
                          : order.status === 'shipped'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                    
                    <div className="mt-2 text-xs text-gray-500">
                      <p>Order #{order.id}</p>
                    </div>
                  </div>
                </div>
              ))
            )
          ) : (
            <div className="text-center py-12">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">No orders yet</h3>
              <p className="mt-1 text-sm text-gray-500">
                You haven't placed any orders yet. Start shopping to see your orders here.
              </p>
              <div className="mt-6">
                <Link
                  to="/collection"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;