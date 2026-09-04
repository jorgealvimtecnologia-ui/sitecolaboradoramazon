import React from 'react';
import { X, Star, Check, ExternalLink, ShieldCheck, Truck, RefreshCw, Share2, Flame } from 'lucide-react';
import { buildAffiliateUrl, getPriceParts, formatCurrency } from '../utils/affiliateHelper';

export default function ProductQuickModal({
  product,
  onClose,
  affiliateTag,
  onOpenWhatsApp
}) {
  if (!product) return null;

  const affiliateUrl = product.trackedUrl || buildAffiliateUrl(product, affiliateTag);
  const { whole, cents } = getPriceParts(product.price);
  const savings = product.originalPrice && product.originalPrice > product.price 
    ? product.originalPrice - product.price 
    : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      {/* Modal Card */}
      <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200 relative flex flex-col">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 bg-gray-100 hover:bg-gray-200 p-2 rounded-full text-gray-600 transition-colors"
          title="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          
          {/* Left Column: Product Image & Badges */}
          <div className="flex flex-col items-center justify-center bg-gray-50 rounded-lg p-4 relative border border-gray-100">
            {product.isBestSeller && (
              <span className="absolute top-3 left-3 amazon-badge-bestseller text-[10px] px-2 py-0.5 rounded shadow">
                Mais Vendido
              </span>
            )}
            {product.isLightningDeal && (
              <span className="absolute top-3 right-3 bg-[#cc0c39] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow flex items-center gap-1">
                <Flame className="w-3 h-3" />
                Oferta Relâmpago
              </span>
            )}

            <img
              src={product.imageUrl}
              alt={product.title}
              className="max-h-72 w-auto object-contain my-4"
            />

            <div className="w-full text-center text-xs text-gray-500 mt-2">
              Clique em "Ver na Amazon" para conferir mais fotos e variações de cores.
            </div>
          </div>

          {/* Right Column: Details & CTA */}
          <div className="flex flex-col justify-between">
            
            <div>
              {/* ASIN / Code */}
              {product.asin && (
                <span className="text-[11px] font-mono text-gray-400 mb-1 block">
                  ASIN: {product.asin}
                </span>
              )}

              {/* Title */}
              <h2 className="text-base sm:text-lg font-bold text-gray-900 leading-snug mb-2">
                {product.title}
              </h2>

              {/* Ratings */}
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center text-[#ffa41c]">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? 'fill-[#ffa41c] text-[#ffa41c]'
                          : i < product.rating
                          ? 'fill-[#ffa41c]/50 text-[#ffa41c]'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-bold text-gray-700">{product.rating} de 5</span>
                <span className="text-xs text-[#007185] hover:underline cursor-pointer">
                  ({product.reviewsCount?.toLocaleString('pt-BR')} avaliações de clientes)
                </span>
              </div>

              {/* Pricing Box */}
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 mb-4">
                <div className="flex items-baseline gap-2">
                  {product.discountPercentage && (
                    <span className="text-sm font-bold text-[#cc0c39] bg-red-100 px-2 py-0.5 rounded">
                      -{product.discountPercentage}%
                    </span>
                  )}
                  <div className="flex items-start text-gray-900 font-extrabold">
                    <span className="text-sm pt-0.5 font-bold mr-0.5">R$</span>
                    <span className="text-3xl leading-none font-bold">{whole}</span>
                    <span className="text-sm pt-0.5 font-bold">{cents}</span>
                  </div>
                </div>

                {product.originalPrice && (
                  <div className="text-xs text-gray-500 mt-1">
                    De: <span className="line-through">R$ {formatCurrency(product.originalPrice)}</span>
                    {savings > 0 && (
                      <span className="ml-2 text-green-700 font-bold">
                        Você economiza: R$ {formatCurrency(savings)} ({product.discountPercentage}%)
                      </span>
                    )}
                  </div>
                )}

                {product.isPrime && (
                  <div className="flex items-center gap-1.5 text-xs text-gray-700 font-medium mt-2 pt-2 border-t border-gray-200">
                    <span className="bg-[#00a8e1] text-white text-[10px] font-black italic px-1 rounded">
                      prime
                    </span>
                    <span>Frete <strong>GRÁTIS</strong> e entrega rápida para membros Prime</span>
                  </div>
                )}
              </div>

              {/* Features / Sobre o item */}
              {product.features && product.features.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                    Sobre este item:
                  </h4>
                  <ul className="space-y-1.5 text-xs text-gray-600">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-green-600 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Description */}
              {product.description && (
                <p className="text-xs text-gray-500 leading-relaxed mb-4">
                  {product.description}
                </p>
              )}
            </div>

            {/* CTAs */}
            <div className="space-y-2 pt-2 border-t border-gray-200">
              <a
                href={affiliateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full amazon-btn-primary py-3 px-4 rounded-full text-sm font-extrabold text-gray-900 flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
              >
                <span>Comprar na Amazon com Segurança</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                onClick={() => onOpenWhatsApp(product)}
                className="w-full py-2 px-3 rounded-full border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <Share2 className="w-3.5 h-3.5 text-green-600" />
                <span>Gerar Anúncio para Grupos de WhatsApp / Telegram</span>
              </button>

              <div className="flex items-center justify-center gap-4 text-[11px] text-gray-400 pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
                  Compra 100% Segura
                </span>
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-[#007185]" />
                  Garantia Amazon
                </span>
                <span className="flex items-center gap-1">
                  <RefreshCw className="w-3.5 h-3.5 text-gray-500" />
                  Devolução Fácil
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
