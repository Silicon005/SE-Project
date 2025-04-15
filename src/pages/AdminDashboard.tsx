import React from 'react';
import { Link } from 'react-router-dom';
import { Package, MessageSquare, Phone } from 'lucide-react';

export const AdminDashboard = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-indigo-700 mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Manage Products */}
        <Link
          to="/admin/products"
          className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
        >
          <div className="flex items-center space-x-4">
            <div className="bg-indigo-100 p-4 rounded-full">
              <Package className="h-8 w-8 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Manage Products</h2>
              <p className="text-gray-600">Add, edit, or remove products</p>
            </div>
          </div>
        </Link>

        {/* View Inquiries */}
        <Link
          to="/admin/inquiries"
          className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
        >
          <div className="flex items-center space-x-4">
            <div className="bg-indigo-100 p-4 rounded-full">
              <MessageSquare className="h-8 w-8 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">View Inquiries</h2>
              <p className="text-gray-600">Manage customer inquiries</p>
            </div>
          </div>
        </Link>

        {/* See Contacts */}
        <Link
          to="/admin/contacts"
          className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
        >
          <div className="flex items-center space-x-4">
            <div className="bg-indigo-100 p-4 rounded-full">
              <Phone className="h-8 w-8 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">See Contacts</h2>
              <p className="text-gray-600">View contact form submissions</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};
