import React, { useState } from 'react';
import { Search, ShoppingBag, Tag, SlidersHorizontal, ShieldCheck, Sparkles, PlusCircle } from 'lucide-react';
import { CATEGORIES } from '../data/categories';

export default function Header({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  onOpenTagSettings,
  onOpenAdmin,
  affiliateTag,
  totalProducts
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 shadow-md">
      {/* Top Banner Ribbon */}
      <div className="bg-[#febd69] text-[#131921] text-xs font-semibold py-1.5 px-4 text-center flex items-center justify-center gap-2 border-b border-[#e3a857]">
        <Sparkles className="w-3.5 h-3.5 text-[#131921] animate-pulse" />
        <span>Vitrine de Ofertas & Achadinhos Amazon com <strong>Frete Grátis Prime</strong> em milhares de produtos!</span>
      </div>

      {/* Main Amazon Header Bar */}
      <div className="bg-[#131921] text-white px-3 sm:px-6 py-2.5 flex items-center justify-between gap-3 md:gap-6">
        
        {/* Amazon Logo & Store Title */}
        <div className="flex items-center gap-2 sm:gap-3 cursor-pointer select-none" onClick={() => setSelectedCategory('all')}>
          <div className="flex items-center">
            <span className="text-2xl font-black tracking-tight text-white flex items-center">
              amazon<span className="text-[#febd69] text-3xl leading-none">.</span>
            </span>
            <span className="ml-1.5 text-xs bg-[#232f3e] text-[#febd69] px-2 py-0.5 rounded font-bold uppercase tracking-wider border border-[#3b495c] hidden sm:inline-block">
              Storefront
            </span>
          </div>
        </div>

        {/* Amazon Search Bar */}
        <div className="flex-1 max-w-3xl flex items-stretch">
          {/* Category Dropdown (Amazon Style) */}
          <div className="relative hidden md:block">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="h-full bg-[#f3f3f3] text-[#0f1111] text-xs px-3 font-medium rounded-l-md border-r border-[#cdcdcd] focus:outline-none focus:ring-2 focus:ring-[#f90] cursor-pointer hover:bg-[#dadada]"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Search Input */}
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Buscar achadinhos, marcas, eletrônicos, livros e ofertas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 px-3 md:px-4 text-sm text-[#0f1111] bg-white rounded-l-md md:rounded-l-none focus:outline-none focus:ring-2 focus:ring-[#f90]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs font-bold"
              >
                ✕
              </button>
            )}
          </div>

          {/* Search Button (Amazon Orange) */}
          <button className="h-10 px-4 sm:px-5 bg-[#febd69] hover:bg-[#f3a847] text-[#131921] rounded-r-md flex items-center justify-center transition-colors">
            <Search className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Affiliate Tag Button */}
          <button
            onClick={onOpenTagSettings}
            title="Configurar sua Tag de Afiliado Amazon"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded border border-transparent hover:border-white text-xs font-semibold text-white transition-all bg-[#232f3e]/60"
          >
            <Tag className="w-3.5 h-3.5 text-[#febd69]" />
            <span className="hidden lg:inline">Tag:</span>
            <span className="text-[#febd69] font-mono font-bold max-w-[90px] truncate">{affiliateTag}</span>
          </button>

          {/* Admin / Add Product Button */}
          <button
            onClick={onOpenAdmin}
            title="Painel de Produtos & Adicionar Novo Item"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-[#f08804] hover:bg-[#e47911] text-[#131921] text-xs font-bold transition-all shadow-sm"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Gerenciar Vitrine</span>
          </button>
        </div>
      </div>

      {/* Sub Navigation Bar (#232f3e) */}
      <div className="bg-[#232f3e] text-white px-3 sm:px-6 py-1.5 text-xs flex items-center justify-between overflow-x-auto whitespace-nowrap scrollbar-none border-t border-[#37475a]">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`flex items-center gap-1.5 py-1 px-2 rounded border transition-colors ${
              selectedCategory === 'all'
                ? 'border-white font-bold text-[#febd69]'
                : 'border-transparent hover:border-white text-gray-200'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            Todos os Departamentos
          </button>

          {CATEGORIES.filter((c) => c.id !== 'all').map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`py-1 px-2 rounded border transition-colors ${
                selectedCategory === cat.id
                  ? 'border-white font-bold text-[#febd69]'
                  : 'border-transparent hover:border-white text-gray-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-2 text-xs text-gray-300">
          <ShieldCheck className="w-4 h-4 text-[#00a8e1]" />
          <span>Compre direto no app oficial da Amazon com garantia</span>
        </div>
      </div>
    </header>
  );
}
