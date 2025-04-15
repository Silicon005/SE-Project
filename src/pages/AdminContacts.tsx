import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface Contact {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp?: { seconds: number; nanoseconds: number };
}

export const AdminContacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const q = query(collection(db, 'contacts'), orderBy('timestamp', 'desc'));
        const querySnapshot = await getDocs(q);
        const contactList: Contact[] = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name || '',
            email: data.email || '',
            message: data.message || '',
            timestamp: data.timestamp,
          };
        });
        setContacts(contactList);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'contacts', id));
      setContacts(contacts.filter((contact) => contact.id !== id)); // Remove deleted contact from the list
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-indigo-700 mb-8">Submitted Contacts</h1>

      {loading ? (
        <p className="text-gray-500 text-lg">Loading...</p>
      ) : contacts.length === 0 ? (
        <p className="text-gray-500 text-lg">No contacts submitted yet.</p>
      ) : (
        <div className="space-y-6">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out"
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900 hover:text-indigo-600 transition-colors duration-200">
                      {contact.name}
                    </h3>
                    <p className="text-sm text-gray-500">{contact.email}</p>
                  </div>
                  <span className="text-sm text-gray-500">
                    {contact.timestamp?.seconds
                      ? new Date(contact.timestamp.seconds * 1000).toLocaleDateString()
                      : 'Timestamp not available'}
                  </span>
                </div>
                <p className="mt-4 text-gray-600 whitespace-pre-line">{contact.message}</p>
                <div className="mt-4 text-right">
                  <button
                    onClick={() => handleDelete(contact.id)}
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
