import React from 'react';
import { Link } from 'react-router-dom';
import { Package, MessageSquare } from 'lucide-react';

export const AdminDashboard = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          to="/admin/products"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center space-x-4">
            <div className="bg-indigo-100 p-3 rounded-full">
              <Package className="h-6 w-6 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Manage Products</h2>
              <p className="text-gray-500">Add, edit, or remove products</p>
            </div>
          </div>
        </Link>

        <Link
          to="/admin/inquiries"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center space-x-4">
            <div className="bg-indigo-100 p-3 rounded-full">
              <MessageSquare className="h-6 w-6 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">View Inquiries</h2>
              <p className="text-gray-500">Manage customer inquiries</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};