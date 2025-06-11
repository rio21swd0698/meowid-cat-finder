
import React from 'react';
import Navbar from '../components/Navbar';
import BreedGallery from '../components/BreedGallery';

const Breeds = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <Navbar />
      <div className="py-12">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Kenali Ras Kucing
          </h1>
          <p className="text-xl text-gray-600">
            Jelajahi berbagai ras kucing domestik dan pelajari karakteristik unik masing-masing
          </p>
        </div>
        <BreedGallery />
      </div>
    </div>
  );
};

export default Breeds;
