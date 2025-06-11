
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { ArrowLeft } from 'lucide-react';

const BreedDetail = () => {
  const { id } = useParams();

  const breedData: { [key: string]: any } = {
    'persian': {
      name: 'Persian',
      origin: 'Iran',
      image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=800&h=600&fit=crop',
      description: 'Kucing Persian adalah salah satu ras kucing tertua dan paling populer di dunia.',
    },
    'siamese': {
      name: 'Siamese',
      origin: 'Thailand',
      image: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=800&h=600&fit=crop',
      description: 'Kucing Siamese dikenal dengan mata biru yang menawan dan pola warna yang unik.',
    },
    'maine-coon': {
      name: 'Maine Coon',
      origin: 'Amerika',
      image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=800&h=600&fit=crop',
      description: 'Maine Coon adalah salah satu ras kucing terbesar dengan kepribadian yang ramah.',
    },
    'british-shorthair': {
      name: 'British Shorthair',
      origin: 'Inggris',
      image: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=800&h=600&fit=crop',
      description: 'British Shorthair memiliki tubuh yang bulat dan bulu yang tebal.',
    },
    'scottish-fold': {
      name: 'Scottish Fold',
      origin: 'Skotlandia',
      image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=800&h=600&fit=crop',
      description: 'Scottish Fold terkenal dengan telinga yang terlipat dan ekspresi yang menggemaskan.',
    },
    'anggora': {
      name: 'Anggora',
      origin: 'Turki',
      image: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=800&h=600&fit=crop',
      description: 'Anggora memiliki bulu yang panjang dan halus dengan mata yang sering berwarna berbeda.',
    }
  };

  const breed = breedData[id || ''];

  if (!breed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
        <Navbar />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Ras tidak ditemukan</h1>
            <Link to="/breeds" className="text-purple-600 hover:text-purple-700">
              Kembali ke galeri ras
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <Navbar />
      
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link 
            to="/breeds" 
            className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-8 transition-colors duration-200"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Kembali ke Galeri Ras
          </Link>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img
                  src={breed.image}
                  alt={breed.name}
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
              
              <div className="md:w-1/2 p-8">
                <div className="flex items-center mb-4">
                  <h1 className="text-3xl font-bold text-gray-800 mr-4">{breed.name}</h1>
                  <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                    {breed.origin}
                  </span>
                </div>
                
                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                  {breed.description}
                </p>

                <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Informasi Lengkap
                  </h3>
                  <p className="text-gray-600">
                    Konten detail tentang ras {breed.name} akan ditambahkan di sini. 
                    Silakan isi dengan informasi lengkap tentang karakteristik, 
                    perawatan, dan hal-hal menarik lainnya tentang ras ini.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreedDetail;
