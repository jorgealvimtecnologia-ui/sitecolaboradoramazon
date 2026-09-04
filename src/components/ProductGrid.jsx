import React, { useState, useMemo } from 'react';
import ProductCard from './ProductCard';
import { CATEGORIES } from '../data/categories';
import { Filter, ArrowUpDown, Check, Sparkles, X, Sliders } from 'lucide-react';

export default function ProductGrid({
  products,
  affiliateTag,
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
  onOpenQuickView,
  onOpenWhatsApp
}) {
  const [sortBy, setSortBy] = useState('featured'); // 'featured', 'price-asc', 'price-desc', 'discount', 'rating'
  const [onlyPrime, setOnlyPrime] = useState(false);
  const [onlyDeals, setOnlyDeals] = useState(false);
  const [priceMax, setPriceMax] = useState(1000);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category filter
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'achadinhos-99') {
          if (p.price > 99) return false;
        } else if (p.category !== selectedCategory) {
          return false;
        }
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = p.title.toLowerCase().includes(q);
        const matchesDesc = p.description ? p.description.toLowerCase().includes(q) : false;
        const matchesAsin = p.asin ? p.asin.toLowerCase().includes(q) : false;
        if (!matchesTitle && !matchesDesc && !matchesAsin) return false;
      }

      // Prime only filter
      if (onlyPrime && !p.isPrime) return false;

      // Deals only filter
      if (onlyDeals && !p.isLightningDeal && (!p.discountPercentage || p.discountPercentage < 15)) {
        return false;
      }

      // Price filter
      if (priceMax < 1000 && p.price > priceMax) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'discount') return (b.discountPercentage || 0) - (a.discountPercentage || 0);
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      return 0; // 'featured' keeps original order
    });
  }, [products, selectedCategory, searchQuery, onlyPrime, onlyDeals, priceMax, sortBy]);

  const activeCategoryName = CATEGORIES.find((c) => c.id === selectedCategory)?.name || 'Todos os Produtos';

  return (
    <div>
      {/* Controls & Filter Header */}
      <div className="bg-white rounded-lg border border-amazon-border p-3 sm:p-4 mb-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-gray-100">
          
          {/* Section Title & Results Count */}
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-gray-900">
                {activeCategoryName}
              </h2>
              <span className="text-xs bg-gray-100 text-gray-600 font-semibold px-2 py-0.5 rounded-full">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'resultado' : 'resultados'}
              </span>
            </div>
            {searchQuery && (
              <p className="text-xs text-gray-500 mt-0.5">
                Buscando por: <strong className="text-gray-800">"{searchQuery}"</strong>
                <button
                  onClick={() => setSearchQuery('')}
                  className="ml-2 text-xs text-[#007185] hover:underline"
                >
                  Limpar busca
                </button>
              </p>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 font-medium whitespace-nowrap">Ordenar por:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-gray-50 text-xs font-semibold text-gray-800 border border-gray-300 rounded-md py-1.5 px-3 focus:outline-none focus:ring-1 focus:ring-[#f90] cursor-pointer"
            >
              <option value="featured">Destaques da Vitrine</option>
              <option value="discount">Maior Desconto (%)</option>
              <option value="price-asc">Menor Preço</option>
              <option value="price-desc">Maior Preço</option>
              <option value="rating">Melhor Avaliados</option>
            </select>
          </div>
        </div>

        {/* Quick Filter Toggles */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-3">
          
          <div className="flex flex-wrap items-center gap-2">
            {/* Prime Filter Toggle */}
            <button
              onClick={() => setOnlyPrime(!onlyPrime)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
                onlyPrime
                  ? 'bg-[#00a8e1] text-white border-[#00a8e1]'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              <span className="italic font-black text-[10px]">prime</span>
              <span>Apenas Prime</span>
              {onlyPrime && <Check className="w-3 h-3" />}
            </button>

            {/* Deals Only Toggle */}
            <button
              onClick={() => setOnlyDeals(!onlyDeals)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
                onlyDeals
                  ? 'bg-[#cc0c39] text-white border-[#cc0c39]'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              <span>Apenas Ofertas</span>
              {onlyDeals && <Check className="w-3 h-3" />}
            </button>

            {/* Under R$ 99 Filter */}
            <button
              onClick={() => setSelectedCategory(selectedCategory === 'achadinhos-99' ? 'all' : 'achadinhos-99')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
                selectedCategory === 'achadinhos-99'
                  ? 'bg-[#e47911] text-white border-[#e47911]'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              <span>Até R$ 99</span>
            </button>
          </div>

          {/* Reset Filters if any active */}
          {(onlyPrime || onlyDeals || selectedCategory !== 'all' || searchQuery) && (
            <button
              onClick={() => {
                setOnlyPrime(false);
                setOnlyDeals(false);
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="text-xs text-[#007185] hover:underline font-semibold flex items-center gap-1"
            >
              <X className="w-3 h-3" />
              <span>Limpar todos os filtros</span>
            </button>
          )}

        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              affiliateTag={affiliateTag}
              onOpenQuickView={onOpenQuickView}
              onOpenWhatsApp={onOpenWhatsApp}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-lg border border-gray-200 p-8 sm:p-12 text-center my-6">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
            <Sparkles className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-gray-900 mb-1">
            Nenhum produto encontrado com os filtros atuais
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto mb-4">
            Tente buscar com outros termos ou remova os filtros de Prime/Ofertas para ver todo o catálogo.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setOnlyPrime(false);
              setOnlyDeals(false);
            }}
            className="amazon-btn-primary px-4 py-2 rounded-full text-xs font-bold text-gray-900 shadow-sm"
          >
            Ver Todos os Produtos
          </button>
        </div>
      )}
    </div>
  );
}
