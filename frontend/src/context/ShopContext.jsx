import React, { createContext, useContext, useState, useEffect } from 'react';
import { products } from '../assets/frontend_assets/assets';

const ShopContext = createContext();
const CURRENCY = 'INR'; // Default currency set to Indian Rupees
const DELIVERY_FEE = 50; // Default delivery fee in INR

export const ShopProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [allProducts] = useState(products);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      setCart(parsedCart);
      updateCartTotals(parsedCart);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart));
    } else {
      localStorage.removeItem('cart');
    }
  }, [cart]);

  const updateCartTotals = (cartItems) => {
    const itemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    const priceTotal = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    setTotalItems(itemsCount);
    setTotalPrice(priceTotal);
  };

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item._id === product._id && item.selectedSize === product.selectedSize);

      let updatedCart;
      if (existingItem) {
        updatedCart = prevCart.map((item) =>
          item._id === product._id && item.selectedSize === product.selectedSize
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedCart = [...prevCart, { ...product, quantity: 1 }];
      }

      updateCartTotals(updatedCart);
      return updatedCart;
    });
  };

  const updateQuantity = (productId, newQuantity, selectedSize = null) => {
    if (newQuantity < 1) {
      removeFromCart(productId, selectedSize);
      return;
    }

    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) => {
        if (selectedSize) {
          // If size is specified, only update items with matching _id AND size
          return item._id === productId && item.selectedSize === selectedSize
            ? { ...item, quantity: newQuantity }
            : item;
        } else {
          // If no size specified, update all items with matching _id
          return item._id === productId ? { ...item, quantity: newQuantity } : item;
        }
      });
      updateCartTotals(updatedCart);
      return updatedCart;
    });
  };

  const removeFromCart = (productId, selectedSize = null) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => {
        if (selectedSize) {
          // If size is specified, only remove items with matching _id AND size
          return !(item._id === productId && item.selectedSize === selectedSize);
        } else {
          // If no size specified, remove all items with matching _id
          return item._id !== productId;
        }
      });
      updateCartTotals(updatedCart);
      return updatedCart;
    });
  };

  const clearCart = () => {
    setCart([]);
    setTotalItems(0);
    setTotalPrice(0);
    localStorage.removeItem('cart');
  };

  const value = {
    cart,
    totalItems,
    totalPrice,
    allProducts,
    currency: CURRENCY,
    deliveryFee: DELIVERY_FEE,
    totalWithDelivery: totalPrice + DELIVERY_FEE,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};