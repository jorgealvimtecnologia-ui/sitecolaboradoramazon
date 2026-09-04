export const DEFAULT_AFFILIATE_TAG = 'vitrineamz-20';

export const getAffiliateTag = () => {
  try {
    const saved = localStorage.getItem('amazon_affiliate_tag');
    return saved ? saved.trim() : DEFAULT_AFFILIATE_TAG;
  } catch (e) {
    return DEFAULT_AFFILIATE_TAG;
  }
};

export const setAffiliateTag = (tag) => {
  try {
    const cleanTag = tag ? tag.trim() : DEFAULT_AFFILIATE_TAG;
    localStorage.setItem('amazon_affiliate_tag', cleanTag);
    window.dispatchEvent(new Event('affiliate_tag_updated'));
    return cleanTag;
  } catch (e) {
    return DEFAULT_AFFILIATE_TAG;
  }
};

/**
 * Generates an Amazon affiliate link with the specified or active tag
 */
export const buildAffiliateUrl = (product, customTag = null) => {
  const tag = customTag || getAffiliateTag();
  
  // If product has an ASIN, build official canonical URL
  if (product.asin) {
    return `https://www.amazon.com.br/dp/${product.asin}?tag=${tag}&linkCode=ll1`;
  }
  
  if (product.amazonUrl) {
    try {
      const url = new URL(product.amazonUrl);
      url.searchParams.set('tag', tag);
      url.searchParams.set('linkCode', 'll1');
      return url.toString();
    } catch (e) {
      return `${product.amazonUrl}${product.amazonUrl.includes('?') ? '&' : '?'}tag=${tag}&linkCode=ll1`;
    }
  }
  
  return `https://www.amazon.com.br/?tag=${tag}`;
};

/**
 * Formats standard BRL price
 */
export const formatCurrency = (value) => {
  if (typeof value !== 'number') return '0,00';
  return value.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};

/**
 * Splits price into integer and decimal cents for exact Amazon typography
 */
export const getPriceParts = (value) => {
  if (typeof value !== 'number') return { whole: '0', cents: '00' };
  const formatted = formatCurrency(value);
  const [whole, cents] = formatted.split(',');
  return { whole, cents: cents || '00' };
};

/**
 * Extracts ASIN (10 alphanumeric chars) from Amazon URL
 */
export const extractAsinFromUrl = (url) => {
  if (!url) return '';
  const match = url.match(/(?:dp|gp\/product|exec\/obidos\/ASIN|product)\/([A-Z0-9]{10})/i) ||
                url.match(/\/([A-Z0-9]{10})(?:[/?]|$)/i);
  return match ? match[1].toUpperCase() : '';
};

/**
 * Formats a high-converting WhatsApp / Telegram promotion broadcast text
 */
export const generatePromoCopy = (product, affiliateUrl) => {
  const savings = product.originalPrice && product.originalPrice > product.price 
    ? (product.originalPrice - product.price) 
    : 0;
  
  const discountText = product.discountPercentage 
    ? ` 🔥 *${product.discountPercentage}% DE DESCONTO*` 
    : '';

  return `🚨 *OFERTA AMAZON IMPERDÍVEL!*${discountText}

📦 *${product.title}*

${product.originalPrice ? `❌ De: ~R$ ${formatCurrency(product.originalPrice)}~\n` : ''}✅ *Por apenas: R$ ${formatCurrency(product.price)}*
${savings > 0 ? `💰 *Economize: R$ ${formatCurrency(savings)}*\n` : ''}${product.isPrime ? '🚀 *Frete GRÁTIS com Amazon Prime*\n' : ''}⭐ *Avaliação:* ${product.rating} / 5.0 (${product.reviewsCount?.toLocaleString('pt-BR')} avaliações)

🛒 *COMPRE COM SEGURANÇA NA AMAZON:*
👇👇👇
${affiliateUrl}

⚠️ _Preço e estoque sujeitos a alteração a qualquer momento!_`;
};
