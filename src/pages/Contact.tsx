
// src/pages/Contact.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSend, FiUser, FiMail, FiMessageSquare } from 'react-icons/fi';
import { Toaster, toast } from 'react-hot-toast';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';

export const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const docRef = await addDoc(collection(db, 'contacts'), {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        timestamp: serverTimestamp(),
      });
      toast.success('Message sent successfully!');
      console.log('Submitted contact with ID:', docRef.id);
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message.');
    }

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
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700"><FiUser className="mr-2" /> Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange}
              className="mt-1 w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500" required />
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-700"><FiMail className="mr-2" /> Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange}
              className="mt-1 w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500" required />
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-700"><FiMessageSquare className="mr-2" /> Message</label>
            <textarea name="message" rows={5} value={formData.message} onChange={handleChange}
              className="mt-1 w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500" required />
          </div>

          <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            disabled={isSubmitting}
            className={`w-full py-3 px-4 rounded-lg text-white font-medium focus:ring-2 focus:ring-offset-2 transition-all ${isSubmitting ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'}`}>
            {isSubmitting ? 'Sending...' : <><FiSend className="inline mr-2" />Send Message</>}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Contact;
