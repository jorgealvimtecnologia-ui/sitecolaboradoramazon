import React, { useState } from 'react';
import { X, Tag, Check, Info, ExternalLink, Save } from 'lucide-react';
import { setAffiliateTag } from '../utils/affiliateHelper';

export default function AffiliateTagSettings({
  currentTag,
  onClose,
  onSave
}) {
  const [tagInput, setTagInput] = useState(currentTag);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    const clean = tagInput.trim();
    if (!clean) return;
    
    setAffiliateTag(clean);
    onSave(clean);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-xl max-w-md w-full shadow-2xl border border-gray-200 relative overflow-hidden">
        
        {/* Header */}
        <div className="p-4 bg-[#131921] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Tag className="w-5 h-5 text-[#febd69]" />
            <h3 className="font-bold text-sm sm:text-base">Configurar Tag de Associado Amazon</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1 rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="p-4 sm:p-6 space-y-4">
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs text-blue-900 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              Digite seu <strong>ID de Rastreamento (Tracking ID)</strong> do Programa de Associados da Amazon (ex: <code className="bg-blue-100 px-1 py-0.5 rounded font-mono font-bold">meunome-20</code>).
              Todos os links de compra e anúncios da loja serão vinculados à sua comissão!
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Sua Tag de Afiliado (ID de Associado)
            </label>
            <div className="relative">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="ex: suatag-20"
                required
                className="w-full px-3 py-2.5 text-sm font-mono font-bold bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f90] text-gray-900"
              />
            </div>
            <p className="text-[11px] text-gray-500 mt-1">
              Geralmente termina em <span className="font-mono font-semibold">-20</span> no Brasil.
            </p>
          </div>

          {/* Real-time preview */}
          <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 text-xs">
            <span className="font-semibold text-gray-600 block mb-1">Exemplo de Link Gerado:</span>
            <div className="font-mono text-[11px] text-[#007185] break-all bg-white p-2 rounded border border-gray-200">
              https://www.amazon.com.br/dp/B09B8V1LZ3?tag=<strong>{tagInput || 'suatag-20'}</strong>&linkCode=ll1
            </div>
          </div>

          {/* Actions */}
          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className={`px-5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shadow ${
                savedSuccess
                  ? 'bg-green-600 text-white'
                  : 'amazon-btn-primary text-gray-900'
              }`}
            >
              {savedSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Salvo com Sucesso!</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Salvar Tag de Afiliado</span>
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
