// src/pages/Contact.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSend, FiUser, FiMail, FiMessageSquare } from 'react-icons/fi';
import { Toaster, toast } from 'react-hot-toast';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Form Data Submitted:', formData);
    toast.success('Message sent successfully!');
    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-center" />
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden"
      >
        <div className="bg-indigo-600 py-6 px-8">
          <h1 className="text-3xl font-bold text-white">Get in Touch</h1>
          <p className="text-indigo-100 mt-2">We'd love to hear from you</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <motion.div 
            whileFocus={{ scale: 1.02 }}
            className="space-y-1"
          >
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 flex items-center">
              <FiUser className="mr-2" /> Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              placeholder="Your name"
              required
            />
          </motion.div>

          <motion.div 
            whileFocus={{ scale: 1.02 }}
            className="space-y-1"
          >
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 flex items-center">
              <FiMail className="mr-2" /> Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              placeholder="your.email@example.com"
              required
            />
          </motion.div>

          <motion.div 
            whileFocus={{ scale: 1.02 }}
            className="space-y-1"
          >
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 flex items-center">
              <FiMessageSquare className="mr-2" /> Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              placeholder="Your message here..."
              required
            />
          </motion.div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isSubmitting}
            className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all ${isSubmitting ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'}`}
          >
            {isSubmitting ? (
              'Sending...'
            ) : (
              <>
                <FiSend className="mr-2" />
                Send Message
              </>
            )}
          </motion.button>
        </form>

        <div className="bg-gray-50 px-8 py-6 text-center">
          <p className="text-gray-600">
            Alternatively, email us at <a href="mailto:contact@producthub.com" className="text-indigo-600 hover:underline">contact@producthub.com</a>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;