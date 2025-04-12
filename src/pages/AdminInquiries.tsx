import React from 'react';

const DEMO_INQUIRIES = [
  {
    id: '1',
    productId: '1',
    name: 'John Doe',
    email: 'john@example.com',
    message: 'I\'m interested in the wireless headphones. Do they come with a warranty?',
    createdAt: new Date('2024-03-10T10:00:00')
  },
  {
    id: '2',
    productId: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    message: 'What\'s the battery life of the Smart Watch Pro?',
    createdAt: new Date('2024-03-09T15:30:00')
  }
];

export const AdminInquiries = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Customer Inquiries</h1>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="divide-y divide-gray-200">
          {DEMO_INQUIRIES.map((inquiry) => (
            <div key={inquiry.id} className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{inquiry.name}</h3>
                  <p className="text-sm text-gray-500">{inquiry.email}</p>
                </div>
                <span className="text-sm text-gray-500">
                  {inquiry.createdAt.toLocaleDateString()}
                </span>
              </div>
              <p className="mt-2 text-gray-600">{inquiry.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};