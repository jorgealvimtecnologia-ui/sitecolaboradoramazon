import React, { useState } from 'react';
import { X, Copy, Check, MessageSquare, ExternalLink, Send } from 'lucide-react';
import { buildAffiliateUrl, generatePromoCopy } from '../utils/affiliateHelper';

export default function WhatsAppModal({ product, onClose, affiliateTag }) {
  if (!product) return null;

  const affiliateUrl = buildAffiliateUrl(product, affiliateTag);
  const promoText = generatePromoCopy(product, affiliateUrl);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(promoText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(promoText)}`;
  const telegramShareUrl = `https://t.me/share/url?url=${encodeURIComponent(affiliateUrl)}&text=${encodeURIComponent(promoText)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-xl max-w-lg w-full shadow-2xl border border-gray-200 relative flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-[#131921] text-white rounded-t-xl">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-[#25D366]" />
            <h3 className="font-bold text-sm sm:text-base">Gerador de Promoções (WhatsApp / Telegram)</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1 rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
          <p className="text-xs text-gray-600">
            Copie o texto promocional abaixo com o seu <strong>link de afiliado já incluso</strong> e envie diretamente em grupos de ofertas, canais do Telegram ou redes sociais:
          </p>

          {/* Text Area Preview */}
          <div className="relative">
            <textarea
              readOnly
              value={promoText}
              rows={10}
              className="w-full text-xs font-mono bg-gray-50 text-gray-800 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#f90] leading-relaxed resize-none selection:bg-[#febd69]/40"
            />
          </div>

          {/* Tag Info */}
          <div className="bg-amber-50 border border-amber-200 rounded-md p-2.5 text-[11px] text-amber-900 flex items-center justify-between">
            <span>Tag de afiliado ativa no link: <strong>{affiliateTag}</strong></span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 rounded-b-xl flex flex-col sm:flex-row items-center gap-2">
          
          <button
            onClick={handleCopy}
            className={`w-full sm:flex-1 py-2.5 px-4 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm ${
              copied
                ? 'bg-green-600 text-white'
                : 'amazon-btn-primary text-gray-900'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                <span>Mensagem Copiada com Sucesso!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copiar Mensagem Formatada</span>
              </>
            )}
          </button>

          <a
            href={whatsappShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-[#25D366] hover:bg-[#20ba59] text-white py-2.5 px-4 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
          >
            <Send className="w-4 h-4" />
            <span>Abrir WhatsApp</span>
          </a>

        </div>

      </div>
    </div>
  );
}
