// src/pages/Gallery.tsx
import React from 'react';

export const Gallery = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Gallery</h1>
      <div className="grid grid-cols-3 gap-4">
        {/* Add images or gallery items */}
        <div className="bg-gray-200 p-4 rounded-md">Item 1</div>
        <div className="bg-gray-200 p-4 rounded-md">Item 2</div>
        <div className="bg-gray-200 p-4 rounded-md">Item 3</div>
      </div>
    </div>
  );
};

export default Gallery;
