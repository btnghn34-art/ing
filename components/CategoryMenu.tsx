import React from 'react';
import { CATEGORIES } from '../constants';
import { Category } from '../types';

interface CategoryMenuProps {
  onSelectCategory: (category: Category) => void;
}

export const CategoryMenu: React.FC<CategoryMenuProps> = ({ onSelectCategory }) => {
  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-black text-white drop-shadow-md tracking-wider mb-2">
          WORD HUNTER
        </h1>
        <p className="text-white/90 text-lg">Choose your mission!</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat)}
            className={`
              group relative overflow-hidden p-6 rounded-3xl text-left transition-all duration-300
              hover:shadow-2xl hover:-translate-y-1 bg-white
            `}
          >
            <div className={`absolute inset-0 opacity-10 bg-${cat.color}-500 group-hover:opacity-20 transition-opacity`} />
            <div className="flex items-center justify-between relative z-10">
              <div>
                <span className="text-3xl block mb-2 filter drop-shadow-sm group-hover:scale-110 transition-transform duration-300 origin-left">
                  {cat.icon}
                </span>
                <h3 className={`text-xl font-black text-gray-800 group-hover:text-${cat.color}-600`}>
                  {cat.title}
                </h3>
                <p className="text-gray-400 text-sm font-semibold mt-1">
                  {cat.items.length} Words
                </p>
              </div>
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center 
                bg-${cat.color}-100 text-${cat.color}-500 group-hover:bg-${cat.color}-500 group-hover:text-white transition-colors
              `}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};