import React from 'react'

const NewsLetterBox = () => {
  return (
    <div className="text-center p-8 bg-gray-50">
      <p className="text-2xl font-semibold text-gray-800 mb-2">
        Subscribe now & get 20% off
      </p>
      <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
        Stay updated with our latest products and exclusive offers
      </p>
      <form className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
        <input
          type="email"
          placeholder="Enter your email"
          required
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-black text-white px-6 py-2 hover:bg-gray-800 transition-colors"
        >
          SUBSCRIBE
        </button>
      </form>
    </div>
  )
}

export default NewsLetterBox