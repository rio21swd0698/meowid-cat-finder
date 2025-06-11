
import React from 'react';
import Navbar from '../components/Navbar';
import UploadArea from '../components/UploadArea';

const Upload = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <Navbar />
      <div className="py-12">
        <UploadArea />
      </div>
    </div>
  );
};

export default Upload;
