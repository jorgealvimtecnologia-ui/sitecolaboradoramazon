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
import { getAffiliateTag, setAffiliateTag } from './utils/affiliateHelper';

export default function App() {
  // Load products: start with initial, then sync with Laravel API
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [isLoading, setIsLoading] = useState(true);
  const [isBackendConnected, setIsBackendConnected] = useState(false);

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

  // Fetch products and settings from Laravel API
  const fetchProductsFromApi = async () => {
    try {
      const response = await fetch('/api/products');
      if (response.ok) {
        const data = await response.json();
        if (data.status === 'success' && data.products && data.products.length > 0) {
          // Normalize API fields to camelCase if needed
          const normalized = data.products.map(p => ({
            id: p.id,
            asin: p.asin,
            title: p.title,
            category: p.category,
            price: Number(p.price),
            originalPrice: p.original_price ? Number(p.original_price) : null,
            discountPercentage: p.discount_percentage,
            rating: Number(p.rating),
            reviewsCount: p.reviews_count,
            isPrime: Boolean(p.is_prime),
            isBestSeller: Boolean(p.is_best_seller),
            isChoice: Boolean(p.is_choice),
            isLightningDeal: Boolean(p.is_lightning_deal),
            dealClaimedPercentage: p.deal_claimed_percentage,
            imageUrl: p.image_url,
            amazonUrl: p.amazon_url,
            trackedUrl: p.tracked_url,
            features: Array.isArray(p.features) ? p.features : [],
            description: p.description,
            clicksCount: p.clicks_count || 0
          }));
          setProducts(normalized);
          setIsBackendConnected(true);
        }
      }
    } catch (e) {
      console.log('Operando com catálogo local em cache');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSettingsFromApi = async () => {
    try {
      const response = await fetch('/api/settings');
      if (response.ok) {
        const data = await response.json();
        if (data.settings?.affiliate_tag) {
          setAffiliateTagState(data.settings.affiliate_tag);
          setAffiliateTag(data.settings.affiliate_tag);
        }
      }
    } catch (e) {
      // Ignore fallback
    }
  };

  useEffect(() => {
    fetchProductsFromApi();
    fetchSettingsFromApi();
  }, []);

  // Handlers for tabs
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

  // Admin Actions (with Laravel API persistence)
  const handleAddProduct = async (newProduct) => {
    setProducts([newProduct, ...products]);

    // Send to Laravel API
    try {
      await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          title: newProduct.title,
          category: newProduct.category,
          price: newProduct.price,
          original_price: newProduct.originalPrice,
          image_url: newProduct.imageUrl,
          amazon_url: newProduct.amazonUrl,
          asin: newProduct.asin,
          rating: newProduct.rating,
          reviews_count: newProduct.reviewsCount,
          is_prime: newProduct.isPrime,
          is_best_seller: newProduct.isBestSeller,
          is_choice: newProduct.isChoice,
          is_lightning_deal: newProduct.isLightningDeal,
          features: newProduct.features,
          description: newProduct.description
        })
      });
      fetchProductsFromApi();
    } catch (e) {
      console.error('Erro ao salvar no Laravel:', e);
    }
  };

  const handleUpdateProduct = async (updatedProduct) => {
    setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));

    try {
      await fetch(`/api/products/${updatedProduct.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          title: updatedProduct.title,
          category: updatedProduct.category,
          price: updatedProduct.price,
          original_price: updatedProduct.originalPrice,
          image_url: updatedProduct.imageUrl,
          amazon_url: updatedProduct.amazonUrl,
          asin: updatedProduct.asin,
          rating: updatedProduct.rating,
          reviews_count: updatedProduct.reviewsCount,
          is_prime: updatedProduct.isPrime,
          is_best_seller: updatedProduct.isBestSeller,
          is_choice: updatedProduct.isChoice,
          is_lightning_deal: updatedProduct.isLightningDeal,
          features: updatedProduct.features,
          description: updatedProduct.description
        })
      });
      fetchProductsFromApi();
    } catch (e) {
      console.error('Erro ao atualizar no Laravel:', e);
    }
  };

  const handleDeleteProduct = async (productId) => {
    setProducts(products.filter(p => p.id !== productId));

    try {
      await fetch(`/api/products/${productId}`, {
        method: 'DELETE',
        headers: { 'Accept': 'application/json' }
      });
    } catch (e) {
      console.error('Erro ao deletar no Laravel:', e);
    }
  };

  const handleResetToDefault = () => {
    setProducts(INITIAL_PRODUCTS);
    fetchProductsFromApi();
  };

  const handleImportProducts = (importedList) => {
    setProducts(importedList);
  };

  const handleSaveAffiliateTag = async (newTag) => {
    setAffiliateTagState(newTag);
    setAffiliateTag(newTag);

    try {
      await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ affiliate_tag: newTag })
      });
    } catch (e) {
      // Ignorar fallback
    }
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
          onSave={handleSaveAffiliateTag}
        />
      )}

      {/* Admin Panel Modal (with Laravel Analytics) */}
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
