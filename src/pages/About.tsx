
import React from 'react';
import Navbar from '../components/Navbar';
import { Search, Upload, Info, Heart } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <Navbar />
      
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mb-6 shadow-lg">
              <span className="text-3xl">🐱</span>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
              Tentang MeowID
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Aplikasi pintar untuk mengidentifikasi ras kucing domestik dengan teknologi AI terdepan
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Misi Kami</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                MeowID hadir untuk membantu para pecinta kucing dalam mengidentifikasi 
                ras kucing mereka dengan mudah dan akurat. Kami percaya bahwa setiap 
                kucing memiliki keunikan tersendiri, dan dengan memahami rasnya, 
                pemilik dapat memberikan perawatan yang lebih optimal.
              </p>
              <div className="flex items-center text-purple-600">
                <Heart className="mr-2 h-5 w-5" />
                <span className="font-medium">Dibuat dengan cinta untuk kucing</span>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Teknologi AI</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Menggunakan teknologi machine learning dan computer vision terdepan, 
                MeowID dapat menganalisis foto kucing dan memberikan prediksi ras 
                dengan tingkat akurasi yang tinggi. Sistem kami terus belajar dan 
                berkembang untuk memberikan hasil yang semakin baik.
              </p>
              <div className="flex items-center text-blue-600">
                <Search className="mr-2 h-5 w-5" />
                <span className="font-medium">Powered by Advanced AI</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Cara Kerja MeowID
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Upload className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">1. Upload Foto</h3>
                <p className="text-gray-600 text-sm">
                  Unggah foto kucing Anda dengan kualitas yang jelas
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">2. Analisis AI</h3>
                <p className="text-gray-600 text-sm">
                  AI kami menganalisis fitur-fitur kucing secara detail
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Info className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">3. Hasil Detail</h3>
                <p className="text-gray-600 text-sm">
                  Dapatkan informasi lengkap tentang ras dan karakteristiknya
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl shadow-lg text-white p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Mulai Identifikasi Sekarang!</h2>
            <p className="text-purple-100 mb-6">
              Siap untuk mengetahui ras kucing kesayangan Anda? Coba MeowID sekarang!
            </p>
            <button className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200">
              Coba Sekarang
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
