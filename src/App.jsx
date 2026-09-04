import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import InfluencerHero from './components/InfluencerHero';
import IdeaListsSection from './components/IdeaListsSection';
import LightningDealsBar from './components/LightningDealsBar';
import ProductGrid from './components/ProductGrid';
import ProductQuickModal from './components/ProductQuickModal';
import WhatsAppModal from './components/WhatsAppModal';
import AffiliateTagSettings from './components/AffiliateTagSettings';
import AdminProductModal from './components/AdminProductModal';
import Footer from './components/Footer';

import { INITIAL_PRODUCTS } from './data/initialProducts';
import { getAffiliateTag } from './utils/affiliateHelper';

export default function App() {
  // Load products from localStorage or default
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('amazon_products_catalog');
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch (e) {
      return INITIAL_PRODUCTS;
    }
  });

  // Save products to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('amazon_products_catalog', JSON.stringify(products));
    } catch (e) {
      console.error('Erro ao salvar produtos no localStorage:', e);
    }
  }, [products]);

  // Affiliate Tag State
  const [affiliateTag, setAffiliateTagState] = useState(() => getAffiliateTag());

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'idea-lists', 'deals', 'bestsellers'

  // Modals
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [whatsAppProduct, setWhatsAppProduct] = useState(null);
  const [isTagSettingsOpen, setIsTagSettingsOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Tab Filtering Handlers
  const handleFilterLightningDeals = () => {
    setSelectedCategory('all');
    setSearchQuery('');
  };

  const handleFilterBestSellers = () => {
    setSelectedCategory('all');
    setSearchQuery('');
  };

  const handleSelectIdeaList = (category) => {
    setSelectedCategory(category);
    setActiveTab('all');
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  // Admin Actions
  const handleAddProduct = (newProduct) => {
    setProducts([newProduct, ...products]);
  };

  const handleUpdateProduct = (updatedProduct) => {
    setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  const handleDeleteProduct = (productId) => {
    setProducts(products.filter(p => p.id !== productId));
  };

  const handleResetToDefault = () => {
    setProducts(INITIAL_PRODUCTS);
    localStorage.removeItem('amazon_products_catalog');
  };

  const handleImportProducts = (importedList) => {
    setProducts(importedList);
  };

  return (
    <div className="min-h-screen flex flex-col bg-amazon-bg_gray">
      
      {/* 1. Amazon Main Header */}
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        onOpenTagSettings={() => setIsTagSettingsOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        affiliateTag={affiliateTag}
        totalProducts={products.length}
      />

      {/* 2. Influencer Storefront Hero Profile */}
      <InfluencerHero
        totalProducts={products.length}
        onFilterLightningDeals={handleFilterLightningDeals}
        onFilterBestSellers={handleFilterBestSellers}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Store Content Area */}
      <main className="max-w-7xl mx-auto px-3 sm:px-6 w-full flex-1">
        
        {/* Lightning Deals Banner */}
        <LightningDealsBar
          onFilterDeals={() => {
            setActiveTab('deals');
            handleFilterLightningDeals();
          }}
          isDealsActive={activeTab === 'deals'}
        />

        {/* Amazon Curated Idea Lists (Visible when tab is 'idea-lists' or 'all') */}
        {(activeTab === 'all' || activeTab === 'idea-lists') && (
          <IdeaListsSection
            onSelectIdeaList={handleSelectIdeaList}
            selectedCategory={selectedCategory}
          />
        )}

        {/* Product Grid with Filters & Sort */}
        <ProductGrid
          products={
            activeTab === 'deals'
              ? products.filter(p => p.isLightningDeal || (p.discountPercentage && p.discountPercentage >= 20))
              : activeTab === 'bestsellers'
              ? products.filter(p => p.isBestSeller)
              : products
          }
          affiliateTag={affiliateTag}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onOpenQuickView={(prod) => setQuickViewProduct(prod)}
          onOpenWhatsApp={(prod) => setWhatsAppProduct(prod)}
        />

      </main>

      {/* Footer with Amazon Disclaimer & Links */}
      <Footer
        onOpenTagSettings={() => setIsTagSettingsOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        setSelectedCategory={setSelectedCategory}
      />

      {/* Quick View Product Modal */}
      {quickViewProduct && (
        <ProductQuickModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          affiliateTag={affiliateTag}
          onOpenWhatsApp={(prod) => {
            setQuickViewProduct(null);
            setWhatsAppProduct(prod);
          }}
        />
      )}

      {/* WhatsApp / Telegram Promo Message Modal */}
      {whatsAppProduct && (
        <WhatsAppModal
          product={whatsAppProduct}
          onClose={() => setWhatsAppProduct(null)}
          affiliateTag={affiliateTag}
        />
      )}

      {/* Global Affiliate Tag Settings Modal */}
      {isTagSettingsOpen && (
        <AffiliateTagSettings
          currentTag={affiliateTag}
          onClose={() => setIsTagSettingsOpen(false)}
          onSave={(newTag) => setAffiliateTagState(newTag)}
        />
      )}

      {/* Admin Panel Modal */}
      {isAdminOpen && (
        <AdminProductModal
          products={products}
          onAddProduct={handleAddProduct}
          onUpdateProduct={handleUpdateProduct}
          onDeleteProduct={handleDeleteProduct}
          onResetToDefault={handleResetToDefault}
          onImportProducts={handleImportProducts}
          onClose={() => setIsAdminOpen(false)}
        />
      )}

    </div>
  );
}
