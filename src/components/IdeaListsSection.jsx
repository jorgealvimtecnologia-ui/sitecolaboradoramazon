import React from 'react';
import { IDEA_LISTS } from '../data/categories';
import { Layers, ArrowRight, Sparkles } from 'lucide-react';

export default function IdeaListsSection({ onSelectIdeaList, selectedCategory }) {
  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#e47911]" />
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">
              Listas de Ideias da Amazon
            </h2>
            <span className="bg-[#febd69]/30 text-[#131921] text-xs font-bold px-2 py-0.5 rounded">
              Curadoria Oficial
            </span>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
            Coleções temáticas selecionadas a dedo para facilitar sua escolha
          </p>
        </div>
      </div>

      {/* Grid of Idea Lists */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {IDEA_LISTS.map((list) => {
          const isSelected = selectedCategory === list.filterCategory;
          return (
            <div
              key={list.id}
              onClick={() => onSelectIdeaList(list.filterCategory)}
              className={`group relative bg-white rounded-lg border overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-amazon-hover ${
                isSelected ? 'ring-2 ring-[#e47911] border-transparent shadow-md' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {/* Cover Image */}
              <div className="relative h-32 w-full overflow-hidden bg-gray-100">
                <img
                  src={list.coverImage}
                  alt={list.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                {/* Badge */}
                <span className="absolute top-2 left-2 bg-[#232f3e] text-[#febd69] text-[10px] font-bold px-2 py-0.5 rounded shadow">
                  {list.badge}
                </span>

                <span className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm text-white text-[11px] font-medium px-2 py-0.5 rounded">
                  {list.itemCount} itens
                </span>
              </div>

              {/* Content */}
              <div className="p-3">
                <h3 className="text-sm font-bold text-gray-900 group-hover:text-[#007185] line-clamp-1">
                  {list.title}
                </h3>
                <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                  {list.description}
                </p>

                <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-[#007185] group-hover:text-[#c45500]">
                  <span>Explorar Lista</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
