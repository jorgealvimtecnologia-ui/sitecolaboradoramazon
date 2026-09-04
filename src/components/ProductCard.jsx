import React from 'react';
import { Star, Check, ExternalLink, Share2, Eye, ShieldCheck, Flame } from 'lucide-react';
import { buildAffiliateUrl, getPriceParts, formatCurrency } from '../utils/affiliateHelper';

export default function ProductCard({
  product,
  affiliateTag,
  onOpenQuickView,
  onOpenWhatsApp
}) {
  const affiliateUrl = buildAffiliateUrl(product, affiliateTag);
  const { whole, cents } = getPriceParts(product.price);
  const originalPriceFormatted = product.originalPrice ? formatCurrency(product.originalPrice) : null;
  const savingsAmount = product.originalPrice && product.originalPrice > product.price 
    ? product.originalPrice - product.price 
    : 0;

  return (
    <div className="group bg-white rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-amazon-hover transition-all duration-200 flex flex-col justify-between overflow-hidden relative">
      
      {/* Top Badges */}
      <div className="absolute top-2 left-2 z-10 flex flex-col gap-1 items-start max-w-[85%]">
        {product.isBestSeller && (
          <div className="amazon-badge-bestseller text-[10px] sm:text-[11px] px-2 py-0.5 rounded-l shadow-sm flex items-center">
            <span>Mais Vendido</span>
          </div>
        )}
        
        {product.isChoice && !product.isBestSeller && (
          <div className="amazon-badge-choice text-[10px] sm:text-[11px] px-2 py-0.5 rounded shadow-sm flex items-center gap-1">
            <span className="text-[#f90]">Amazon's</span>
            <span>Choice</span>
          </div>
        )}

        {product.isLightningDeal && (
          <div className="bg-[#cc0c39] text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm flex items-center gap-0.5">
            <Flame className="w-3 h-3" />
            <span>Oferta Relâmpago</span>
          </div>
        )}
      </div>

      {/* Image Container with Zoom and Action Overlays */}
      <div className="relative pt-6 pb-2 px-4 flex items-center justify-center bg-white min-h-[220px]">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="max-h-48 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />

        {/* Quick View Button on Image Hover */}
        <button
          onClick={() => onOpenQuickView(product)}
          className="absolute bottom-2 bg-white/90 hover:bg-white text-gray-800 text-xs font-semibold px-3 py-1.5 rounded-full shadow border border-gray-200 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5"
          title="Ver detalhes rápidos"
        >
          <Eye className="w-3.5 h-3.5 text-gray-600" />
          <span>Visualização Rápida</span>
        </button>
      </div>

      {/* Product Information Body */}
      <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between border-t border-gray-100 bg-white">
        
        <div>
          {/* Title */}
          <h3
            onClick={() => onOpenQuickView(product)}
            className="text-xs sm:text-sm font-medium text-gray-900 line-clamp-2 hover:text-[#007185] cursor-pointer leading-snug mb-1.5"
            title={product.title}
          >
            {product.title}
          </h3>

          {/* Amazon Star Rating */}
          <div className="flex items-center gap-1.5 mb-2">
            <div className="flex items-center text-[#ffa41c]">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.floor(product.rating)
                      ? 'fill-[#ffa41c] text-[#ffa41c]'
                      : i < product.rating
                      ? 'fill-[#ffa41c]/50 text-[#ffa41c]'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-[#007185] font-semibold hover:underline cursor-pointer">
              {product.reviewsCount ? product.reviewsCount.toLocaleString('pt-BR') : '1.240'}
            </span>
          </div>

          {/* Price & Savings */}
          <div className="mb-2">
            <div className="flex items-baseline gap-1.5">
              {product.discountPercentage && (
                <span className="text-xs font-bold text-[#cc0c39] bg-red-50 px-1 py-0.5 rounded">
                  -{product.discountPercentage}%
                </span>
              )}

              {/* Exact Amazon Price Layout */}
              <div className="flex items-start text-gray-900 font-extrabold tracking-tight">
                <span className="text-xs pt-0.5 font-bold mr-0.5">R$</span>
                <span className="text-xl sm:text-2xl leading-none font-bold">{whole}</span>
                <span className="text-xs pt-0.5 font-bold">{cents}</span>
              </div>
            </div>

            {/* Original Strikethrough Price */}
            {originalPriceFormatted && (
              <div className="text-[11px] text-gray-500 mt-0.5">
                De: <span className="line-through">R$ {originalPriceFormatted}</span>
                {savingsAmount > 0 && (
                  <span className="ml-1 text-green-700 font-semibold">
                    (Poupa R$ {formatCurrency(savingsAmount)})
                  </span>
                )}
              </div>
            )}

            {/* Lightning Deal Progress Bar if Applicable */}
            {product.isLightningDeal && product.dealClaimedPercentage && (
              <div className="mt-2">
                <div className="flex items-center justify-between text-[10px] text-gray-500 font-medium mb-0.5">
                  <span>{product.dealClaimedPercentage}% resgatado</span>
                  <span className="text-[#cc0c39] font-bold">Oferta Ativa</span>
                </div>
                <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#cc0c39] h-full rounded-full"
                    style={{ width: `${product.dealClaimedPercentage}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>

          {/* Prime Delivery Badge */}
          {product.isPrime && (
            <div className="flex items-center gap-1 text-[11px] text-gray-700 font-medium mb-3">
              <span className="bg-[#00a8e1] text-white text-[9px] font-black italic px-1 rounded">
                prime
              </span>
              <span>Entrega <strong>GRÁTIS</strong></span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-1.5 pt-2">
          {/* Primary Amazon Buy Button */}
          <a
            href={affiliateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full amazon-btn-primary py-2 px-3 rounded-full text-xs font-bold text-gray-900 flex items-center justify-center gap-1.5 shadow-sm hover:shadow transition-all group/btn"
          >
            <span>Ver na Amazon</span>
            <ExternalLink className="w-3.5 h-3.5 text-gray-800 transition-transform group-hover/btn:translate-x-0.5" />
          </a>

          {/* WhatsApp / Telegram Promo Creator Button */}
          <button
            onClick={() => onOpenWhatsApp(product)}
            className="w-full py-1.5 px-3 rounded-full border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            title="Gerar texto de oferta para WhatsApp e Telegram"
          >
            <Share2 className="w-3 h-3 text-green-600" />
            <span>Gerar Promoção WhatsApp</span>
          </button>
        </div>

      </div>

    </div>
  );
}
