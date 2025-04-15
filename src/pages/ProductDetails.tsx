

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import toast from 'react-hot-toast';
import { Product } from '../types';

export const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [inquiry, setInquiry] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      const docRef = doc(db, 'products', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProduct({ id: docSnap.id, ...docSnap.data() } as Product);
      }
    };
    fetchProduct();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'inquiries'), {
        productId: id,
        name: inquiry.name,
        email: inquiry.email,
        message: inquiry.message,
        createdAt: Timestamp.now(),
      });
      toast.success('Inquiry submitted successfully!');
      setInquiry({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      toast.error('Failed to submit inquiry.');
    }
  };

  if (!product) {
    return <div className="p-12 text-2xl font-semibold">Product not found</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Inquire About This Product</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              value={inquiry.name}
              onChange={(e) => setInquiry({ ...inquiry, name: e.target.value })}
              required
              className="w-full border rounded p-2"
            />
            <input
              type="email"
              placeholder="Email"
              value={inquiry.email}
              onChange={(e) => setInquiry({ ...inquiry, email: e.target.value })}
              required
              className="w-full border rounded p-2"
            />
            <textarea
              placeholder="Message"
              value={inquiry.message}
              onChange={(e) => setInquiry({ ...inquiry, message: e.target.value })}
              required
              className="w-full border rounded p-2"
              rows={4}
            />
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
            >
              Submit Inquiry
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
