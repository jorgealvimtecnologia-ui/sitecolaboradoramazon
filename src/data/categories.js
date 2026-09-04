export const CATEGORIES = [
  { id: 'all', name: 'Todos os Departamentos', icon: 'Grid' },
  { id: 'alexa-echo', name: 'Dispositivos Amazon & Alexa', icon: 'Bot' },
  { id: 'eletronicos', name: 'Eletrônicos & Áudio', icon: 'Headphones' },
  { id: 'informatica', name: 'Informática & Setup', icon: 'Laptop' },
  { id: 'casa-cozinha', name: 'Casa & Cozinha', icon: 'Coffee' },
  { id: 'smart-home', name: 'Casa Inteligente', icon: 'Cpu' },
  { id: 'livros', name: 'Livros & Kindle', icon: 'BookOpen' },
  { id: 'games', name: 'Games & Consoles', icon: 'Gamepad2' },
  { id: 'beleza', name: 'Beleza & Cuidados', icon: 'Sparkles' },
  { id: 'achadinhos-99', name: 'Achadinhos até R$ 99', icon: 'Tag' },
];

export const IDEA_LISTS = [
  {
    id: 'setup-produtivo',
    title: 'Meu Setup de Produtividade & Home Office',
    description: 'Itens essenciais para trabalhar com ergonomia, foco e alto desempenho.',
    badge: 'Mais Popular',
    itemCount: 6,
    filterCategory: 'informatica',
    coverImage: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=600&q=80',
    accentColor: 'from-blue-600 to-indigo-800'
  },
  {
    id: 'casa-inteligente-alexa',
    title: 'Casa Inteligente com Alexa & Automação',
    description: 'Transforme sua casa em um ambiente conectado, prático e moderno.',
    badge: 'Recomendação Top',
    itemCount: 5,
    filterCategory: 'alexa-echo',
    coverImage: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=600&q=80',
    accentColor: 'from-cyan-600 to-blue-700'
  },
  {
    id: 'achadinhos-uteis-baratos',
    title: 'Achadinhos Incríveis até R$ 99',
    description: 'Produtos de altíssima utilidade que cabem no bolso e valem cada centavo.',
    badge: 'Custo-Benefício',
    itemCount: 6,
    filterCategory: 'achadinhos-99',
    coverImage: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=600&q=80',
    accentColor: 'from-amber-500 to-orange-600'
  },
  {
    id: 'leitura-kindle',
    title: 'Livros Essenciais & Leitores Kindle',
    description: 'Best-sellers indispensáveis sobre desenvolvimento, hábitos e finanças.',
    badge: 'Best Sellers',
    itemCount: 4,
    filterCategory: 'livros',
    coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
    accentColor: 'from-emerald-600 to-teal-800'
  }
];
