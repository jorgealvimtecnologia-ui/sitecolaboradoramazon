# 🛒 Amazon Affiliate Storefront (Laravel + React Full Stack)

Um site completo, ultra-rápido e profissional de **Loja de Afiliados e Vitrine de Influenciador da Amazon**, agora potencializado com **Laravel 11/13 + SQLite** no backend e **React 18 + Tailwind CSS** no frontend.

![Amazon Affiliate Store](https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1200&q=80)

---

## ✨ Principais Funcionalidades com Laravel

### 1. 🗄️ Banco de Dados Real e Centralizado (SQLite)
- Todos os produtos, categorias, configurações e métricas ficam salvos no banco de dados do servidor (`database/database.sqlite`).
- Qualquer alteração feita pelo painel fica disponível imediatamente para todos os visitantes.

### 2. 📊 Rastreador Inteligente de Cliques & Conversões (Click Analytics)
- Redirecionamento automático através da rota `/go/{id}`:
  - Registra o clique, data/hora, IP e produto no banco de dados.
  - Redireciona o visitante em milissegundos para a página da Amazon com a sua tag de afiliado ativa.
- **Aba de Métricas no Painel**:
  - Total de cliques gerados.
  - Cliques de hoje.
  - Top 5 produtos mais clicados pelos seus clientes.
  - Histórico detalhado de cliques recentes.

### 3. 🎯 Modelos Oficiais da Amazon Replicados
- **Amazon Influencer Storefront**: Perfil oficial de criador com selo verificado, capa e avatar.
- **Listas de Ideias da Amazon (Idea Lists)**: Coleções temáticas curadas (*Setup de Produtividade*, *Casa Inteligente & Alexa*, *Achadinhos até R$ 99*, *Livros & Kindle*).
- **Ofertas Relâmpago (Lightning Deals)**: Cronômetro regressivo em tempo real e barra de progresso.
- **Cards de Produtos Oficiais**: Selo Prime, Mais Vendido, Escolha da Amazon, estrelas de avaliação e botão com gradiente oficial da Amazon.

### 4. ⚡ Gerenciador Global de Tag de Afiliado
- Altere sua Tag de Associado (ex: `seunome-20`) pelo painel. O Laravel atualiza todos os links do sistema instantaneamente.

### 5. 💬 Gerador de Promoções para WhatsApp e Telegram
- Gera mensagens de divulgação prontas para grupos de promoções com 1 clique.

---

## 🚀 Como Executar Localmente

### Opção 1: Iniciar o Servidor Full Stack com Laravel (Recomendado)

```bash
# 1. Iniciar o servidor web do Laravel
php artisan serve
```

Acesse o site completo em: **`http://localhost:8000`**

### Opção 2: Modo de Desenvolvimento com Hot-Reload (React + Laravel)

Em dois terminais separados:

```bash
# Terminal 1: Iniciar o backend Laravel
php artisan serve

# Terminal 2: Iniciar o frontend Vite com hot-reload
npm run dev
```

O Vite (porta 3000) possui proxy automático que envia as requisições `/api` e `/go` diretamente para o Laravel (porta 8000).

---

## 📁 Estrutura de Arquivos

```
sitecolaboradoramazon/
├── app/
│   ├── Http/Controllers/
│   │   ├── ProductController.php      # API de listagem, busca e CRUD de produtos
│   │   ├── ClickController.php        # Redirecionamento /go/{id} e Analytics de cliques
│   │   └── SettingController.php      # Configurações de Tag e loja
│   └── Models/
│       ├── Product.php                # Modelo de Produto da Amazon
│       ├── Category.php               # Departamentos e Listas de Ideias
│       ├── AffiliateClick.php         # Registro de cliques de afiliados
│       └── Setting.php                # Configurações dinâmicas
├── database/
│   ├── database.sqlite                # Banco de dados SQLite portátil
│   ├── migrations/                    # Tabelas do banco
│   └── seeders/DatabaseSeeder.php     # Produtos iniciais da Amazon pré-carregados
├── routes/
│   ├── api.php                        # Endpoints da API REST
│   └── web.php                        # Rota de redirecionamento /go/{id} e SPA
├── resources/views/app.blade.php      # Layout Blade com integração Vite
└── src/                               # Componentes React oficiais da Amazon
```
