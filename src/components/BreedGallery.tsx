
import React from 'react';
import BreedCard from './BreedCard';

const BreedGallery = () => {
  const catBreeds = [
    {
      id: 'persian',
      name: 'Persian',
      origin: 'Iran',
      image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=300&fit=crop',
      description: 'Kucing berbulu panjang dengan wajah datar yang khas dan mata besar yang ekspresif.'
    },
    {
      id: 'siamese',
      name: 'Siamese',
      origin: 'Thailand',
      image: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=400&h=300&fit=crop',
      description: 'Kucing elegan dengan tubuh ramping, mata biru yang menawan, dan pola warna yang unik.'
    },
    {
      id: 'maine-coon',
      name: 'Maine Coon',
      origin: 'Amerika',
      image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=300&fit=crop',
      description: 'Kucing berukuran besar dengan bulu tebal dan ekor yang lebat, dikenal sangat ramah.'
    },
    {
      id: 'british-shorthair',
      name: 'British Shorthair',
      origin: 'Inggris',
      image: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=400&h=300&fit=crop',
      description: 'Kucing dengan tubuh bulat dan bulu pendek yang tebal, memiliki kepribadian yang tenang.'
    },
    {
      id: 'scottish-fold',
      name: 'Scottish Fold',
      origin: 'Skotlandia',
      image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=300&fit=crop',
      description: 'Kucing dengan telinga yang terlipat ke bawah memberikan ekspresi yang menggemaskan.'
    },
    {
      id: 'anggora',
      name: 'Anggora',
      origin: 'Turki',
      image: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=400&h=300&fit=crop',
      description: 'Kucing berbulu panjang dan halus dengan mata yang sering berwarna-warni yang berbeda.'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Ras Kucing Populer
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Jelajahi berbagai ras kucing domestik yang populer dan pelajari karakteristik unik masing-masing
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {catBreeds.map((breed) => (
            <BreedCard
              key={breed.id}
              id={breed.id}
              name={breed.name}
              image={breed.image}
              origin={breed.origin}
              description={breed.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BreedGallery;
