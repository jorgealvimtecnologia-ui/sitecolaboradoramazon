import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Edit3, Download, Upload, RotateCcw, Check, Sparkles, BarChart2, TrendingUp, MousePointer, Clock, ExternalLink } from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { extractAsinFromUrl, formatCurrency } from '../utils/affiliateHelper';

export default function AdminProductModal({
  products,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onResetToDefault,
  onImportProducts,
  onClose
}) {
  const [activeTab, setActiveTab] = useState('add'); // 'add', 'manage', 'analytics', 'backup'
  const [editingId, setEditingId] = useState(null);

  // Analytics state from Laravel
  const [analytics, setAnalytics] = useState(null);
  const [loadingAnalytics, setLoadingAnalytics] = useState(false);

  useEffect(() => {
    if (activeTab === 'analytics') {
      setLoadingAnalytics(true);
      fetch('/api/stats')
        .then(res => res.json())
        .then(data => {
          if (data.status === 'success') {
            setAnalytics(data.analytics);
          }
        })
        .catch(() => {})
        .finally(() => setLoadingAnalytics(false));
    }
  }, [activeTab]);

  // Form State
  const initialForm = {
    title: '',
    category: 'eletronicos',
    asin: '',
    amazonUrl: '',
    price: '',
    originalPrice: '',
    discountPercentage: '',
    rating: 4.8,
    reviewsCount: 1250,
    isPrime: true,
    isBestSeller: false,
    isChoice: false,
    isLightningDeal: false,
    imageUrl: '',
    featuresText: '',
    description: ''
  };

  const [formData, setFormData] = useState(initialForm);
  const [successMsg, setSuccessMsg] = useState('');

  // Handle URL change to auto-extract ASIN
  const handleUrlChange = (e) => {
    const url = e.target.value;
    const extracted = extractAsinFromUrl(url);
    setFormData((prev) => ({
      ...prev,
      amazonUrl: url,
      asin: extracted || prev.asin
    }));
  };

  // Handle price changes to calculate discount
  const handlePriceChange = (priceVal, origPriceVal) => {
    const p = parseFloat(priceVal) || 0;
    const orig = parseFloat(origPriceVal) || 0;
    let disc = '';
    if (orig > p && orig > 0) {
      disc = Math.round(((orig - p) / orig) * 100);
    }
    setFormData((prev) => ({
      ...prev,
      price: priceVal,
      originalPrice: origPriceVal,
      discountPercentage: disc
    }));
  };

  const handleEditClick = (p) => {
    setEditingId(p.id);
    setFormData({
      title: p.title,
      category: p.category,
      asin: p.asin || '',
      amazonUrl: p.amazonUrl || '',
      price: p.price.toString(),
      originalPrice: p.originalPrice ? p.originalPrice.toString() : '',
      discountPercentage: p.discountPercentage ? p.discountPercentage.toString() : '',
      rating: p.rating || 4.8,
      reviewsCount: p.reviewsCount || 1000,
      isPrime: !!p.isPrime,
      isBestSeller: !!p.isBestSeller,
      isChoice: !!p.isChoice,
      isLightningDeal: !!p.isLightningDeal,
      imageUrl: p.imageUrl || '',
      featuresText: p.features ? p.features.join('\n') : '',
      description: p.description || ''
    });
    setActiveTab('add');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const priceNum = parseFloat(formData.price);
    if (!priceNum || isNaN(priceNum)) {
      alert('Por favor, informe um preço válido.');
      return;
    }

    const productPayload = {
      id: editingId || `prod-${Date.now()}`,
      title: formData.title.trim(),
      category: formData.category,
      asin: formData.asin.trim().toUpperCase(),
      amazonUrl: formData.amazonUrl.trim() || (formData.asin ? `https://www.amazon.com.br/dp/${formData.asin.trim().toUpperCase()}` : ''),
      price: priceNum,
      originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : null,
      discountPercentage: formData.discountPercentage ? parseInt(formData.discountPercentage) : null,
      rating: parseFloat(formData.rating) || 4.8,
      reviewsCount: parseInt(formData.reviewsCount) || 1000,
      isPrime: formData.isPrime,
      isBestSeller: formData.isBestSeller,
      isChoice: formData.isChoice,
      isLightningDeal: formData.isLightningDeal,
      imageUrl: formData.imageUrl.trim() || 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=400&q=80',
      features: formData.featuresText.trim() ? formData.featuresText.split('\n').filter(Boolean) : [],
      description: formData.description.trim()
    };

    if (editingId) {
      onUpdateProduct(productPayload);
      setSuccessMsg('Produto atualizado com sucesso no banco de dados!');
    } else {
      onAddProduct(productPayload);
      setSuccessMsg('Produto salvo com sucesso no banco de dados!');
    }

    setFormData(initialForm);
    setEditingId(null);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleExportJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(products, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `catalogo-amazon-laravel-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportJson = (e) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target.result);
          if (Array.isArray(parsed)) {
            onImportProducts(parsed);
            setSuccessMsg(`Importados ${parsed.length} produtos com sucesso!`);
            setTimeout(() => setSuccessMsg(''), 3000);
          } else {
            alert('Formato inválido: O arquivo JSON deve conter uma lista de produtos.');
          }
        } catch (err) {
          alert('Erro ao ler arquivo JSON: ' + err.message);
        }
      };
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-xl max-w-4xl w-full shadow-2xl border border-gray-200 relative flex flex-col max-h-[92vh] overflow-hidden">
        
        {/* Header */}
        <div className="p-4 bg-[#131921] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#febd69]" />
            <h3 className="font-bold text-sm sm:text-base">Painel de Gerenciamento da Vitrine (Laravel Backend)</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1 rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-gray-200 bg-gray-50 px-4 pt-2 gap-2 text-xs font-bold overflow-x-auto whitespace-nowrap">
          <button
            onClick={() => {
              setActiveTab('add');
              if (!editingId) setFormData(initialForm);
            }}
            className={`py-2 px-4 rounded-t-lg transition-colors border-t border-x ${
              activeTab === 'add'
                ? 'bg-white text-[#e47911] border-gray-200 -mb-px'
                : 'text-gray-600 hover:text-gray-900 border-transparent'
            }`}
          >
            {editingId ? 'Editar Produto' : '+ Adicionar Novo Produto'}
          </button>
          
          <button
            onClick={() => setActiveTab('manage')}
            className={`py-2 px-4 rounded-t-lg transition-colors border-t border-x ${
              activeTab === 'manage'
                ? 'bg-white text-[#e47911] border-gray-200 -mb-px'
                : 'text-gray-600 hover:text-gray-900 border-transparent'
            }`}
          >
            Catálogo ({products.length} itens)
          </button>

          {/* Analytics Tab */}
          <button
            onClick={() => setActiveTab('analytics')}
            className={`py-2 px-4 rounded-t-lg transition-colors border-t border-x flex items-center gap-1.5 ${
              activeTab === 'analytics'
                ? 'bg-white text-[#007185] border-gray-200 -mb-px'
                : 'text-gray-600 hover:text-gray-900 border-transparent'
            }`}
          >
            <BarChart2 className="w-3.5 h-3.5 text-[#007185]" />
            <span>Métricas & Cliques</span>
          </button>

          <button
            onClick={() => setActiveTab('backup')}
            className={`py-2 px-4 rounded-t-lg transition-colors border-t border-x ${
              activeTab === 'backup'
                ? 'bg-white text-[#e47911] border-gray-200 -mb-px'
                : 'text-gray-600 hover:text-gray-900 border-transparent'
            }`}
          >
            Backup & Exportação
          </button>
        </div>

        {/* Success Alert */}
        {successMsg && (
          <div className="bg-green-50 border-b border-green-200 text-green-800 px-4 py-2 text-xs font-semibold flex items-center gap-2">
            <Check className="w-4 h-4 text-green-600" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Modal Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          
          {/* TAB 1: ADD / EDIT PRODUCT */}
          {activeTab === 'add' && (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Title */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Título do Produto na Amazon *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="ex: Echo Pop Smart Speaker compacto com Alexa"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full text-xs p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f90] focus:outline-none text-gray-900"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Categoria / Departamento *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full text-xs p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f90] focus:outline-none text-gray-900 cursor-pointer"
                  >
                    {CATEGORIES.filter(c => c.id !== 'all').map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                {/* Amazon Link / ASIN */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Link da Amazon ou Código ASIN
                  </label>
                  <input
                    type="text"
                    placeholder="Cole a URL do produto ou ASIN (ex: B09B8V1LZ3)"
                    value={formData.amazonUrl || formData.asin}
                    onChange={handleUrlChange}
                    className="w-full text-xs p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f90] focus:outline-none text-gray-900 font-mono"
                  />
                  {formData.asin && (
                    <span className="text-[10px] text-green-700 font-bold block mt-0.5">
                      ASIN detectado: {formData.asin}
                    </span>
                  )}
                </div>

                {/* Current Price */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Preço Atual (R$) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="ex: 249.00"
                    value={formData.price}
                    onChange={(e) => handlePriceChange(e.target.value, formData.originalPrice)}
                    className="w-full text-xs p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f90] focus:outline-none text-gray-900 font-bold"
                  />
                </div>

                {/* Original Strikethrough Price */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Preço Original / "De:" (R$)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="ex: 349.00 (Opcional)"
                    value={formData.originalPrice}
                    onChange={(e) => handlePriceChange(formData.price, e.target.value)}
                    className="w-full text-xs p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f90] focus:outline-none text-gray-900"
                  />
                  {formData.discountPercentage > 0 && (
                    <span className="text-[10px] text-[#cc0c39] font-bold block mt-0.5">
                      Desconto calculado: {formData.discountPercentage}% OFF
                    </span>
                  )}
                </div>

                {/* Image URL */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    URL da Imagem do Produto *
                  </label>
                  <input
                    type="url"
                    placeholder="https://m.media-amazon.com/images/I/..."
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    className="w-full text-xs p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f90] focus:outline-none text-gray-900"
                  />
                </div>

                {/* Rating & Reviews */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Avaliação (0 a 5.0)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="5"
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                    className="w-full text-xs p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f90] focus:outline-none text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Número de Avaliações
                  </label>
                  <input
                    type="number"
                    value={formData.reviewsCount}
                    onChange={(e) => setFormData({ ...formData, reviewsCount: e.target.value })}
                    className="w-full text-xs p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f90] focus:outline-none text-gray-900"
                  />
                </div>

                {/* Badges Checkboxes */}
                <div className="sm:col-span-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <span className="block text-xs font-bold text-gray-700 uppercase mb-2">
                    Selos e Destaques Amazon
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-semibold">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.isPrime}
                        onChange={(e) => setFormData({ ...formData, isPrime: e.target.checked })}
                        className="rounded text-[#00a8e1] focus:ring-[#00a8e1]"
                      />
                      <span>Frete Prime</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.isBestSeller}
                        onChange={(e) => setFormData({ ...formData, isBestSeller: e.target.checked })}
                        className="rounded text-[#e67a00] focus:ring-[#e67a00]"
                      />
                      <span>Mais Vendido</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.isChoice}
                        onChange={(e) => setFormData({ ...formData, isChoice: e.target.checked })}
                        className="rounded text-[#232f3e] focus:ring-[#232f3e]"
                      />
                      <span>Amazon's Choice</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.isLightningDeal}
                        onChange={(e) => setFormData({ ...formData, isLightningDeal: e.target.checked })}
                        className="rounded text-[#cc0c39] focus:ring-[#cc0c39]"
                      />
                      <span>Oferta Relâmpago</span>
                    </label>
                  </div>
                </div>

                {/* Features (Bullets) */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Destaques ("Sobre este item" - 1 por linha)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Compatível com Alexa e comandos de voz&#10;Bateria de longa duração&#10;Garantia de 1 ano Amazon"
                    value={formData.featuresText}
                    onChange={(e) => setFormData({ ...formData, featuresText: e.target.value })}
                    className="w-full text-xs p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f90] focus:outline-none text-gray-900"
                  />
                </div>

              </div>

              {/* Form Buttons */}
              <div className="pt-3 border-t border-gray-200 flex items-center justify-end gap-2">
                {editingId && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingId(null);
                      setFormData(initialForm);
                    }}
                    className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-lg"
                  >
                    Cancelar Edição
                  </button>
                )}

                <button
                  type="submit"
                  className="amazon-btn-primary px-6 py-2.5 rounded-lg text-xs font-bold text-gray-900 shadow"
                >
                  {editingId ? 'Salvar Alterações no Banco' : 'Salvar no Banco de Dados'}
                </button>
              </div>

            </form>
          )}

          {/* TAB 2: MANAGE PRODUCTS LIST */}
          {activeTab === 'manage' && (
            <div className="space-y-3">
              <div className="text-xs text-gray-500 mb-2">
                Total de produtos cadastrados no banco de dados: <strong>{products.length}</strong>
              </div>

              <div className="space-y-2 max-h-[500px] overflow-y-auto">
                {products.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <img
                        src={p.imageUrl}
                        alt={p.title}
                        className="w-12 h-12 object-contain bg-white p-1 rounded border border-gray-200 shrink-0"
                      />
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-gray-900 truncate">
                          {p.title}
                        </h4>
                        <div className="flex items-center gap-2 text-[11px] text-gray-600 mt-0.5">
                          <span className="font-bold text-gray-900">R$ {formatCurrency(p.price)}</span>
                          {p.discountPercentage && (
                            <span className="text-[#cc0c39] font-bold">(-{p.discountPercentage}%)</span>
                          )}
                          <span>• {p.category}</span>
                          {p.isPrime && <span className="text-[#00a8e1] font-bold">Prime</span>}
                          {p.clicksCount > 0 && (
                            <span className="text-blue-700 font-semibold">• {p.clicksCount} cliques</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => handleEditClick(p)}
                        className="p-1.5 bg-white hover:bg-gray-200 rounded border border-gray-300 text-gray-700 text-xs transition-colors"
                        title="Editar"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => {
                          if (confirm(`Deseja realmente remover o produto "${p.title}" do banco de dados?`)) {
                            onDeleteProduct(p.id);
                          }
                        }}
                        className="p-1.5 bg-white hover:bg-red-50 rounded border border-red-200 text-red-600 text-xs transition-colors"
                        title="Remover"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: LARAVEL ANALYTICS & CLICK STATS */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              {loadingAnalytics ? (
                <div className="py-12 text-center text-xs text-gray-500">
                  Carregando métricas do banco de dados Laravel...
                </div>
              ) : (
                <>
                  {/* Summary Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 p-4 rounded-xl border border-blue-200">
                      <div className="flex items-center justify-between text-blue-800 mb-1">
                        <span className="text-xs font-bold uppercase tracking-wider">Total de Cliques</span>
                        <MousePointer className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="text-2xl font-black text-blue-950">
                        {analytics?.total_clicks || 0}
                      </div>
                      <p className="text-[11px] text-blue-700 mt-1">Cliques redirecionados para a Amazon</p>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-green-100/50 p-4 rounded-xl border border-green-200">
                      <div className="flex items-center justify-between text-green-800 mb-1">
                        <span className="text-xs font-bold uppercase tracking-wider">Cliques Hoje</span>
                        <TrendingUp className="w-4 h-4 text-green-600" />
                      </div>
                      <div className="text-2xl font-black text-green-950">
                        {analytics?.today_clicks || 0}
                      </div>
                      <p className="text-[11px] text-green-700 mt-1">Interações nas últimas 24 horas</p>
                    </div>

                    <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 p-4 rounded-xl border border-amber-200">
                      <div className="flex items-center justify-between text-amber-800 mb-1">
                        <span className="text-xs font-bold uppercase tracking-wider">Taxa de Conversão</span>
                        <Sparkles className="w-4 h-4 text-amber-600" />
                      </div>
                      <div className="text-2xl font-black text-amber-950">
                        {products.length > 0 ? `${Math.round(((analytics?.total_clicks || 0) / products.length) * 10)}%` : '0%'}
                      </div>
                      <p className="text-[11px] text-amber-700 mt-1">Engajamento médio por produto</p>
                    </div>

                  </div>

                  {/* Top Clicked Products */}
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <h4 className="text-xs font-bold uppercase text-gray-800 tracking-wider mb-3 flex items-center gap-1.5">
                      <TrendingUp className="w-4 h-4 text-[#e47911]" />
                      <span>Produtos Mais Clicados pelos Visitantes</span>
                    </h4>

                    {analytics?.top_products && analytics.top_products.length > 0 ? (
                      <div className="space-y-2">
                        {analytics.top_products.map((p, idx) => (
                          <div key={p.id} className="flex items-center justify-between bg-white p-2.5 rounded-lg border border-gray-200 text-xs">
                            <div className="flex items-center gap-2.5 min-w-0">
                              <span className="w-5 h-5 rounded-full bg-gray-100 font-bold text-gray-700 flex items-center justify-center shrink-0">
                                {idx + 1}
                              </span>
                              <img src={p.image_url} alt="" className="w-8 h-8 object-contain shrink-0" />
                              <span className="font-semibold text-gray-900 truncate max-w-xs">{p.title}</span>
                            </div>
                            <span className="font-bold text-[#e47911] shrink-0 bg-orange-50 px-2 py-0.5 rounded border border-orange-200">
                              {p.clicks_count} cliques
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-6 text-xs text-gray-500">
                        Nenhum clique registrado ainda. Os cliques nos botões "Ver na Amazon" aparecerão aqui em tempo real!
                      </div>
                    )}
                  </div>

                  {/* Recent Activity */}
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <h4 className="text-xs font-bold uppercase text-gray-800 tracking-wider mb-3 flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-gray-600" />
                      <span>Histórico Recente de Cliques de Afiliados</span>
                    </h4>

                    {analytics?.recent_clicks && analytics.recent_clicks.length > 0 ? (
                      <div className="space-y-1.5">
                        {analytics.recent_clicks.map((c) => (
                          <div key={c.id} className="flex items-center justify-between bg-white p-2 rounded border border-gray-200 text-[11px]">
                            <div className="truncate text-gray-800 max-w-sm">
                              <strong>{c.product_title}</strong> {c.product_asin && <span className="text-gray-400">({c.product_asin})</span>}
                            </div>
                            <div className="flex items-center gap-2 text-gray-500 shrink-0 font-mono">
                              <span className="text-[#007185] font-semibold">{c.affiliate_tag}</span>
                              <span>{new Date(c.created_at).toLocaleTimeString('pt-BR')}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-4 text-xs text-gray-500">
                        Ainda não há registros recentes de cliques.
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          )}

          {/* TAB 4: BACKUP / IMPORT / EXPORT */}
          {activeTab === 'backup' && (
            <div className="space-y-6">
              
              {/* Export */}
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-gray-900">Exportar Catálogo em JSON</h4>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Faça o download de todos os {products.length} produtos do seu banco de dados Laravel para manter um backup seguro.
                  </p>
                </div>
                <button
                  onClick={handleExportJson}
                  className="amazon-btn-primary px-4 py-2 rounded-lg text-xs font-bold text-gray-900 flex items-center gap-1.5 shrink-0"
                >
                  <Download className="w-4 h-4" />
                  <span>Baixar Arquivo JSON</span>
                </button>
              </div>

              {/* Import */}
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-gray-900">Importar Catálogo JSON</h4>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Carregue uma lista de produtos salva anteriormente para restaurar sua loja.
                  </p>
                </div>
                <label className="bg-white hover:bg-gray-100 border border-gray-300 text-gray-800 px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 shrink-0 cursor-pointer transition-colors shadow-sm">
                  <Upload className="w-4 h-4 text-gray-600" />
                  <span>Selecionar Arquivo JSON</span>
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImportJson}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Reset to Demo Products */}
              <div className="bg-red-50 p-4 rounded-lg border border-red-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-red-900">Restaurar Catálogo Padrão Inicial</h4>
                  <p className="text-xs text-red-700 mt-0.5">
                    Recarrega os mais de 12 produtos originais de alta conversão da Amazon Brasil no banco de dados.
                  </p>
                </div>
                <button
                  onClick={() => {
                    if (confirm('Tem certeza? Isso restaurará o catálogo inicial com produtos padrão da Amazon.')) {
                      onResetToDefault();
                      setSuccessMsg('Catálogo restaurado para o padrão original!');
                      setTimeout(() => setSuccessMsg(''), 3000);
                    }
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 shrink-0 transition-colors shadow-sm"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Restaurar Produtos</span>
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
