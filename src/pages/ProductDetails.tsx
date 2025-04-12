import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { DEMO_PRODUCTS } from './Products';
import toast from 'react-hot-toast';

export const ProductDetails = () => {
  const { id } = useParams();
  const product = DEMO_PRODUCTS.find(p => p.id === id);
  const [inquiry, setInquiry] = useState({
    name: '',
    email: '',
    message: ''
  });

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-gray-900">Product not found</h2>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save to Firebase
    toast.success('Inquiry submitted successfully!');
    setInquiry({ name: '', email: '', message: '' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Details */}
        <div>
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-96 object-cover rounded-lg shadow-lg"
          />
          <h1 className="mt-6 text-3xl font-bold text-gray-900">{product.name}</h1>
          <p className="mt-2 text-xl text-indigo-600">${product.price}</p>
          <p className="mt-4 text-gray-600">{product.description}</p>
          <div className="mt-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
              {product.category}
            </span>
          </div>
        </div>

        {/* Inquiry Form */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Inquire About This Product</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={inquiry.name}
                onChange={(e) => setInquiry({ ...inquiry, name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={inquiry.email}
                onChange={(e) => setInquiry({ ...inquiry, email: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                value={inquiry.message}
                onChange={(e) => setInquiry({ ...inquiry, message: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Submit Inquiry
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};