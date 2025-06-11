
import React from 'react';
import Navbar from '../components/Navbar';
import UploadArea from '../components/UploadArea';
import BreedGallery from '../components/BreedGallery';
import { Search, Upload, Info } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mb-6 shadow-lg">
              <span className="text-3xl">🐱</span>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6">
            Selamat Datang di MeowID
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Aplikasi pintar untuk mengidentifikasi ras kucing domestik Anda dengan teknologi AI terdepan. 
            Unggah foto dan dapatkan informasi lengkap tentang ras kucing kesayangan Anda!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              <Upload className="mr-2 h-5 w-5" />
              Mulai Identifikasi
            </button>
            <button className="inline-flex items-center px-8 py-4 border-2 border-purple-300 text-purple-700 rounded-full font-semibold hover:bg-purple-50 transition-all duration-200">
              <Search className="mr-2 h-5 w-5" />
              Jelajahi Ras Kucing
            </button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Upload className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Upload Mudah</h3>
              <p className="text-gray-600 text-sm">Unggah foto kucing Anda dengan mudah dan cepat</p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Search className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">AI Akurat</h3>
              <p className="text-gray-600 text-sm">Teknologi AI canggih untuk identifikasi yang presisi</p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Info className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Informasi Lengkap</h3>
              <p className="text-gray-600 text-sm">Dapatkan detail karakteristik dan info perawatan</p>
            </div>
          </div>
        </div>
      </section>

      {/* Upload Section */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <UploadArea />
      </section>

      {/* Breed Gallery */}
      <BreedGallery />

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mr-2">
              <span className="text-white font-bold text-sm">🐱</span>
            </div>
            <span className="text-xl font-bold">MeowID</span>
          </div>
          <p className="text-gray-400 mb-4">
            Aplikasi identifikasi ras kucing terpercaya dengan teknologi AI
          </p>
          <p className="text-gray-500 text-sm">
            © 2024 MeowID. Semua hak dilindungi.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
