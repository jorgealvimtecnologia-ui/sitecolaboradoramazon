import React, { useState } from 'react';
import { BadgeCheck, Share2, Heart, ExternalLink, Sparkles, Check, Flame, Star, Zap } from 'lucide-react';

export default function InfluencerHero({
  totalProducts,
  onFilterLightningDeals,
  onFilterBestSellers,
  activeTab,
  setActiveTab
}) {
  const [copied, setCopied] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  const handleShareStore = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="bg-white border-b border-amazon-border shadow-sm mb-6">
      {/* Cover Image Banner */}
      <div className="relative h-36 sm:h-52 w-full bg-gradient-to-r from-[#131921] via-[#232f3e] to-[#0f1111] overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#febd69_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        {/* Amazon Influencer Storefront Badge on Banner */}
        <div className="absolute top-3 right-3 sm:top-4 sm:right-6 bg-black/50 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full border border-white/20 flex items-center gap-1.5">
          <BadgeCheck className="w-4 h-4 text-[#febd69]" />
          <span className="font-semibold tracking-wide">Amazon Creator & Influencer</span>
        </div>

        {/* Ambient Glow */}
        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-[#febd69]/10 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      {/* Profile & Info Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 -mt-12 sm:-mt-16 pb-4 border-b border-gray-100">
          
          {/* Avatar and Bio */}
          <div className="flex items-end gap-4">
            <div className="relative">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-white bg-[#febd69] shadow-md flex items-center justify-center text-3xl font-black text-[#131921] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
                  alt="Avatar da Vitrine"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-1 right-1 bg-[#00a8e1] text-white p-1 rounded-full border-2 border-white shadow-sm" title="Criador Verificado Amazon">
                <BadgeCheck className="w-4 h-4" />
              </div>
            </div>

            <div className="mb-1">
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
                  Achadinhos & Recomendações
                </h1>
                <span className="bg-[#232f3e] text-[#febd69] text-[10px] font-bold px-2 py-0.5 rounded tracking-wide uppercase hidden sm:inline-block">
                  Oficial
                </span>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 font-medium mt-0.5">
                @vitrine.achadinhos • <strong>{totalProducts}</strong> produtos selecionados e testados
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-start sm:justify-end">
            <button
              onClick={() => setIsFollowing(!isFollowing)}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all ${
                isFollowing
                  ? 'bg-gray-100 text-gray-800 border border-gray-300'
                  : 'amazon-btn-primary text-gray-900'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${isFollowing ? 'fill-red-500 text-red-500' : ''}`} />
              <span>{isFollowing ? 'Seguindo Vitrine' : 'Seguir Vitrine'}</span>
            </button>

            <button
              onClick={handleShareStore}
              className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold border border-gray-300 transition-colors"
              title="Compartilhar Link da Vitrine"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-green-600" />
                  <span className="text-green-700 font-bold">Copiado!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-gray-600" />
                  <span>Compartilhar</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Storefront Navigation Tabs (Amazon Style) */}
        <div className="flex items-center gap-1 sm:gap-2 pt-2 overflow-x-auto whitespace-nowrap scrollbar-none">
          <button
            onClick={() => setActiveTab('all')}
            className={`py-2.5 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'all'
                ? 'border-[#e47911] text-[#e47911]'
                : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Todos os Produtos ({totalProducts})
          </button>

          <button
            onClick={() => setActiveTab('idea-lists')}
            className={`py-2.5 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'idea-lists'
                ? 'border-[#e47911] text-[#e47911]'
                : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
            }`}
          >
            <Star className="w-3.5 h-3.5" />
            Listas de Ideias Curadas
          </button>

          <button
            onClick={() => {
              setActiveTab('deals');
              onFilterLightningDeals();
            }}
            className={`py-2.5 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'deals'
                ? 'border-[#cc0c39] text-[#cc0c39]'
                : 'border-transparent text-[#cc0c39] hover:bg-red-50'
            }`}
          >
            <Flame className="w-3.5 h-3.5 fill-[#cc0c39]" />
            Ofertas Relâmpago
          </button>

          <button
            onClick={() => {
              setActiveTab('bestsellers');
              onFilterBestSellers();
            }}
            className={`py-2.5 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'bestsellers'
                ? 'border-[#e47911] text-[#e47911]'
                : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            Mais Vendidos nº 1
          </button>
        </div>
      </div>
    </div>
  );
}
