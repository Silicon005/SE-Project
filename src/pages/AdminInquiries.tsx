
import React, { useEffect, useState } from 'react';
import { collection, getDocs, orderBy, query, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface Inquiry {
  id: string;
  productId: string;
  name: string;
  email: string;
  message: string;
  createdAt: any;
}

export const AdminInquiries = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);

  useEffect(() => {
    const fetchInquiries = async () => {
      const q = query(collection(db, 'inquiries'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const results: Inquiry[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Inquiry[];
      setInquiries(results);
    };

    fetchInquiries();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'inquiries', id));
      setInquiries(inquiries.filter(inquiry => inquiry.id !== id)); // Remove deleted inquiry from the list
    } catch (error) {
      console.error('Error deleting inquiry:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-indigo-700 mb-8">Customer Inquiries</h1>

      {inquiries.length === 0 ? (
        <p className="text-gray-500 text-lg">No inquiries submitted yet.</p>
      ) : (
        <div className="space-y-6">
          {inquiries.map((inquiry) => (
            <div
              key={inquiry.id}
              className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out"
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900 hover:text-indigo-600 transition-colors duration-200">
                      {inquiry.name}
                    </h3>
                    <p className="text-sm text-gray-500">{inquiry.email}</p>
                    <p className="text-sm text-indigo-600">Product ID: {inquiry.productId}</p>
                  </div>
                  <span className="text-sm text-gray-500">
                    {inquiry.createdAt?.toDate().toLocaleDateString()}
                  </span>
                </div>
                <p className="mt-4 text-gray-600 whitespace-pre-line">{inquiry.message}</p>
                <div className="mt-4 text-right">
                  <button
                    onClick={() => handleDelete(inquiry.id)}
                    className="text-red-600 hover:text-red-900 font-semibold"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
