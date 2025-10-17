import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Collection from './pages/Collection';
import Product from './pages/Product';
import Cart from './pages/Cart';
import PlaceOrder from './pages/PlaceOrder';
import Orders from './pages/Orders';
import Login from './pages/Login';
import About from './pages/About';
import Contact from './pages/Contact';
import Footer from './components/Footer';

// Create a layout component that includes Navbar and Footer
const Layout = ({ children }) => (
  <div className="min-h-screen bg-white">
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Navbar />
        <main>{children}</main>
      </div>
    </div>
    <Footer />
    <ToastContainer position="top-right" autoClose={3000} />
  </div>
);

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />
      <Route
        path="/collection"
        element={
          <Layout>
            <Collection />
          </Layout>
        }
      />
      <Route
        path="/product/:id"
        element={
          <Layout>
            <Product />
          </Layout>
        }
      />
      <Route
        path="/cart"
        element={
          <Layout>
            <Cart />
          </Layout>
        }
      />
      <Route
        path="/placeorder"
        element={
          <Layout>
            <PlaceOrder />
          </Layout>
        }
      />
      <Route
        path="/orders"
        element={
          <Layout>
            <Orders />
          </Layout>
        }
      />
      <Route
        path="/login"
        element={
          <Layout>
            <Login />
          </Layout>
        }
      />
      <Route
        path="/about"
        element={
          <Layout>
            <About />
          </Layout>
        }
      />
      <Route
        path="/contact"
        element={
          <Layout>
            <Contact />
          </Layout>
        }
      />
    </Routes>
  );
}

export default App;