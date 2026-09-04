# 🛒 Amazon Affiliate Storefront (Vitrine Oficial de Afiliado Amazon)

Um site completo, ultra-rápido e responsivo de **Loja de Afiliados e Vitrine de Influenciador da Amazon**, desenvolvido com base nos modelos oficiais do **Amazon Influencer Program**, **Amazon SiteStripe** e **Amazon Deals & Best Sellers**.

![Amazon Affiliate Store](https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1200&q=80)

---

## ✨ Principais Funcionalidades

### 1. 🎯 Modelos Oficiais da Amazon Replicados
- **Amazon Influencer Storefront**: Perfil verificado com capa, avatar, biografia, contagem de achadinhos e botão de seguir vitrine.
- **Listas de Ideias da Amazon (Idea Lists)**: Coleções temáticas curadas (*Setup de Produtividade*, *Casa Inteligente & Alexa*, *Achadinhos até R$ 99*, *Livros & Kindle*).
- **Ofertas Relâmpago (Lightning Deals)**: Cronômetro regressivo em tempo real, barra de progresso de resgate e selos chamativos de desconto.
- **Cards de Produtos Fidedignos à Amazon**: Selo Prime, Mais Vendido, Escolha da Amazon, estrelas de avaliação, contagem de reviews, tipografia oficial de preços e botão de compra em gradiente amarelo/laranja oficial.

### 2. ⚡ Gerenciador Global de Tag de Afiliado
- Permite configurar o seu **ID de Rastreamento (Tracking ID)** da Amazon (ex: `suatag-20`).
- Atualiza instantaneamente todos os links de produtos, botões de compra e anúncios da loja para comissionar a sua conta da Amazon.

### 3. 💬 Gerador de Promoções para WhatsApp e Telegram
- Botão de 1 clique em qualquer produto para gerar mensagens promocionais prontas e formatadas com emojis, preços "De: Por:", selo Prime e link de afiliado.
- Botão de envio direto para o WhatsApp.

### 4. 🛠️ Painel Administrativo Embutido (Admin Local)
- **Adicionar Novo Produto**: Cole a URL ou ASIN da Amazon para cadastro automático com cálculo de porcentagem de desconto.
- **Gerenciador de Catálogo**: Edição e exclusão de produtos em tempo real com persistência no navegador (`localStorage`).
- **Backup & Restauração**: Exporte todo o catálogo em `.json` ou importe backups a qualquer momento.
- **Restauração Rápida**: Botão para restaurar os mais de 12 produtos originais de alta conversão.

### 5. 📜 Conformidade com os Termos da Amazon (Compliance)
- Rodapé com o aviso legal obrigatório do Programa de Associados da Amazon (*Amazon Operating Agreement*).

---

## 🚀 Como Executar Localmente

```bash
# 1. Instalar as dependências (caso não tenha instalado)
npm install

# 2. Iniciar o servidor de desenvolvimento local
npm run dev

# 3. Gerar a versão de produção otimizada
npm run build

# 4. Pré-visualizar a versão de produção
npm run preview
```

O site estará acessível em `http://localhost:3000`.

---

## 🌐 Como Publicar / Hospedar Gratuitamente

Você pode hospedar este site em menos de 2 minutos em plataformas como **Vercel**, **Netlify** ou **GitHub Pages**:

### Deploy na Vercel:
1. Suba o repositório no seu GitHub.
2. Acesse [vercel.com](https://vercel.com) e importe o repositório.
3. O framework será detectado automaticamente como **Vite**.
4. Clique em **Deploy**!

### Deploy na Netlify:
1. Arraste a pasta `dist` gerada por `npm run build` para o [Netlify Drop](https://app.netlify.com/drop).

---

## 📁 Estrutura do Projeto

```
sitecolaboradoramazon/
├── package.json
├── vite.config.js
├── tailwind.config.js
├── index.html
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css
│   ├── data/
│   │   ├── categories.js           # Departamentos e Listas de Ideias
│   │   └── initialProducts.js      # Catálogo de produtos populares no Brasil
│   ├── components/
│   │   ├── Header.jsx              # Cabeçalho com barra de busca e departamentos
│   │   ├── InfluencerHero.jsx      # Perfil de Influencer / Vitrine
│   │   ├── IdeaListsSection.jsx    # Coleções e Listas de Ideias
│   │   ├── LightningDealsBar.jsx   # Ofertas relâmpago com cronômetro
│   │   ├── ProductCard.jsx         # Card oficial de produto Amazon
│   │   ├── ProductGrid.jsx         # Grade responsiva com filtros e ordenação
│   │   ├── ProductQuickModal.jsx   # Visualização rápida de detalhes
│   │   ├── WhatsAppModal.jsx       # Gerador de cópia para WhatsApp/Telegram
│   │   ├── AffiliateTagSettings.jsx# Modal de configuração da Tag de Afiliado
│   │   ├── AdminProductModal.jsx   # Painel de cadastro/edição de produtos
│   │   └── Footer.jsx              # Rodapé com disclaimer oficial da Amazon
│   └── utils/
│       └── affiliateHelper.js      # Utilitários de link de afiliado, moedas e ASIN
```
