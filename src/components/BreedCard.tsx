
import React from 'react';
import { Link } from 'react-router-dom';

interface BreedCardProps {
  id: string;
  name: string;
  image: string;
  origin: string;
  description: string;
}

const BreedCard: React.FC<BreedCardProps> = ({ id, name, image, origin, description }) => {
  return (
    <Link to={`/breed/${id}`}>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
        <div className="relative overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        
        <div className="p-6">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-gray-800 group-hover:text-purple-600 transition-colors duration-200">
              {name}
            </h3>
            <span className="text-sm text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
              {origin}
            </span>
          </div>
          
          <p className="text-gray-600 text-sm leading-relaxed">
            {description}
          </p>
          
          <div className="mt-4 flex items-center text-purple-600 font-medium text-sm">
            Pelajari lebih lanjut
            <svg className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BreedCard;
