import React, { useEffect, useState } from 'react';
import { PlusCircle, Pencil, Trash2 } from 'lucide-react';
import { collection, addDoc, getDocs, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Product } from '../types';

export const AdminProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Product, 'id'>>({
    name: '',
    description: '',
    price: 0,
    imageUrl: '',
    category: '',
  });

  const fetchProducts = async () => {
    const querySnapshot = await getDocs(collection(db, 'products'));
    const data = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Product[];
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSaveProduct = async () => {
    if (editingId) {
      const productRef = doc(db, 'products', editingId);
      await setDoc(productRef, formData);
    } else {
      await addDoc(collection(db, 'products'), formData);
    }

    setFormData({ name: '', description: '', price: 0, imageUrl: '', category: '' });
    setShowForm(false);
    setEditingId(null);
    fetchProducts();
  };

  const handleStartEdit = (product: Product) => {
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      imageUrl: product.imageUrl,
      category: product.category,
    });
    setEditingId(product.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, 'products', id));
    fetchProducts();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-indigo-700">Manage Products</h1>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setFormData({ name: '', description: '', price: 0, imageUrl: '', category: '' });
            setEditingId(null);
          }}
          className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-all"
        >
          <PlusCircle className="h-5 w-5" />
          <span>{showForm ? 'Close Form' : 'Add Product'}</span>
        </button>
      </div>

      {showForm && (
        <div className="bg-gray-100 p-6 rounded-md mb-6 shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
            <input
              type="text"
              placeholder="Category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
            <input
              type="number"
              placeholder="Price"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: +e.target.value })}
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
            <input
              type="text"
              placeholder="Image URL"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="border p-2 rounded col-span-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
          <button
            onClick={handleSaveProduct}
            className="mt-4 bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-all"
          >
            {editingId ? 'Update Product' : 'Save Product'}
          </button>
        </div>
      )}

      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-100 uppercase">Product</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-100 uppercase">Category</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-100 uppercase">Price</th>
              <th className="px-6 py-3 text-right text-sm font-medium text-gray-100 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap flex items-center space-x-4">
                  <img src={product.imageUrl} alt={product.name} className="h-12 w-12 rounded-lg object-cover" />
                  <span className="text-lg font-semibold">{product.name}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{product.category}</td>
                <td className="px-6 py-4 whitespace-nowrap">₹{product.price}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <button
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                    onClick={() => handleStartEdit(product)}
                  >
                    <Pencil className="h-5 w-5" />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-900"
                    onClick={() => handleDelete(product.id)}
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
