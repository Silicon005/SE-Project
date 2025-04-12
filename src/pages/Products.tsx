import React from 'react';
import { ProductCard } from '../components/ProductCard';
import { Product } from '../types';

export const DEMO_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation and premium sound quality.',
    price: 299.99,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=60',
    category: 'Electronics'
  },
  {
    id: '2',
    name: 'Smart Watch Pro',
    description: 'Advanced smartwatch with health tracking and notifications.',
    price: 199.99,
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=60',
    category: 'Wearables'
  },
  {
    id: '3',
    name: 'Professional Camera Kit',
    description: 'Complete camera kit for professional photography enthusiasts.',
    price: 1299.99,
    imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=60',
    category: 'Photography'
  }
];

export const Products = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {DEMO_PRODUCTS.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};