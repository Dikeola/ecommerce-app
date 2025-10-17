import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Title from '../components/Title';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(isLogin ? 'Logging in...' : 'Signing up...', formData);
    // Handle login/signup logic here
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({ name: '', email: '', password: '' });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <Title text1={isLogin ? "SIGN IN" : "SIGN UP"} text2="" />
          <h2 className="mt-2 text-center text-2xl font-medium text-gray-900">
            {isLogin ? 'Welcome back!' : 'Create your account'}
          </h2>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-6">
            {!isLogin && (
              <div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required={!isLogin}
                  placeholder="Full name"
                  value={formData.name}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-3 border-2 border-black text-gray-900 placeholder-gray-500 rounded-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black sm:text-sm"
                />
              </div>
            )}

            <div className={isLogin ? "mb-4" : "mb-8"}>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                className="appearance-none block w-full px-3 py-3 border-2 border-black text-gray-900 placeholder-gray-500 rounded-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black sm:text-sm"
              />
            </div>

            <div className="mb-4">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete={isLogin ? "current-password" : "new-password"}
                required
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="appearance-none block w-full px-3 py-3 border-2 border-black text-gray-900 placeholder-gray-500 rounded-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black sm:text-sm"
              />
            </div>
          </div>

          {!isLogin && (
            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-black focus:ring-black border-2 border-black rounded"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                I agree to the terms and conditions
              </label>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-black focus:ring-black border-2 border-black rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>
            {isLogin && (
              <div className="text-sm">
                <a href="#" className="font-medium text-black hover:text-gray-700">
                  Forgot password?
                </a>
              </div>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border-2 border-transparent rounded-none shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            >
              {isLogin ? 'SIGN IN' : 'CREATE ACCOUNT'}
            </button>
          </div>
        </form>

        <div className="text-center text-sm">
          <span className="text-gray-600">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
          </span>
          <button
            onClick={toggleForm}
            className="font-medium text-black hover:text-gray-700 underline"
          >
            {isLogin ? 'Sign up' : 'Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;