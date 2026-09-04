<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use App\Models\Setting;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Seed Settings
        Setting::set('affiliate_tag', 'vitrineamz-20', 'Tag principal do Programa de Associados Amazon');
        Setting::set('store_name', 'Achadinhos & Recomendações', 'Nome público da vitrine');
        Setting::set('store_handle', '@vitrine.achadinhos', 'Identificador público da vitrine');

        // 2. Seed Categories
        $categories = [
            ['id' => 'alexa-echo', 'name' => 'Dispositivos Amazon & Alexa', 'icon' => 'Bot', 'display_order' => 1],
            ['id' => 'eletronicos', 'name' => 'Eletrônicos & Áudio', 'icon' => 'Headphones', 'display_order' => 2],
            ['id' => 'informatica', 'name' => 'Informática & Setup', 'icon' => 'Laptop', 'display_order' => 3],
            ['id' => 'casa-cozinha', 'name' => 'Casa & Cozinha', 'icon' => 'Coffee', 'display_order' => 4],
            ['id' => 'smart-home', 'name' => 'Casa Inteligente', 'icon' => 'Cpu', 'display_order' => 5],
            ['id' => 'livros', 'name' => 'Livros & Kindle', 'icon' => 'BookOpen', 'display_order' => 6],
            ['id' => 'games', 'name' => 'Games & Consoles', 'icon' => 'Gamepad2', 'display_order' => 7],
            ['id' => 'beleza', 'name' => 'Beleza & Cuidados', 'icon' => 'Sparkles', 'display_order' => 8],
            ['id' => 'achadinhos-99', 'name' => 'Achadinhos até R$ 99', 'icon' => 'Tag', 'display_order' => 9],
        ];

        foreach ($categories as $cat) {
            Category::updateOrCreate(['id' => $cat['id']], $cat);
        }

        // 3. Seed Products
        $products = [
            [
                'id' => 'prod-1',
                'asin' => 'B09B8V1LZ3',
                'title' => 'Echo Pop | Smart speaker compacto com som envolvente e Alexa | Cor Preta',
                'category' => 'alexa-echo',
                'price' => 249.00,
                'original_price' => 349.00,
                'discount_percentage' => 29,
                'rating' => 4.8,
                'reviews_count' => 38920,
                'is_prime' => true,
                'is_best_seller' => true,
                'is_choice' => false,
                'is_lightning_deal' => true,
                'deal_claimed_percentage' => 84,
                'image_url' => 'https://m.media-amazon.com/images/I/71C8z+8q9aL._AC_SL1500_.jpg',
                'amazon_url' => 'https://www.amazon.com.br/dp/B09B8V1LZ3',
                'features' => [
                    'Som compacto e potente com graves nítidos para quartos e espaços pequenos',
                    'Controle músicas por voz pelo Amazon Music, Spotify, Apple Music e Deezer',
                    'Controle dispositivos de casa inteligente compatíveis (lâmpadas, plugues e mais)',
                    'Feito com 99% de tecido reciclado pós-consumo'
                ],
                'badge_text' => 'Mais Vendido em Echo & Alexa',
                'description' => 'O Echo Pop é o novo smart speaker compacto com Alexa da Amazon. Perfeito para quartos, escritórios e pequenos ambientes, entrega som potente com a inteligência que você já conhece.'
            ],
            [
                'id' => 'prod-2',
                'asin' => 'B08N3TCP2F',
                'title' => 'Kindle Paperwhite 16 GB: tela de 6,8”, temperatura de luz ajustável e bateria que dura semanas',
                'category' => 'livros',
                'price' => 719.10,
                'original_price' => 799.00,
                'discount_percentage' => 10,
                'rating' => 4.9,
                'reviews_count' => 29450,
                'is_prime' => true,
                'is_best_seller' => true,
                'is_choice' => true,
                'is_lightning_deal' => false,
                'deal_claimed_percentage' => null,
                'image_url' => 'https://m.media-amazon.com/images/I/61X0PP7UleL._AC_SL1000_.jpg',
                'amazon_url' => 'https://www.amazon.com.br/dp/B08N3TCP2F',
                'features' => [
                    'Tela Paperwhite de 6,8” com bordas mais finas e iluminação 10% mais brilhante',
                    'Temperatura de luz ajustável do branco ao âmbar para conforto visual',
                    'À prova d\'água (IPX8) para você ler na praia, na piscina ou na banheira',
                    'Uma única recarga via USB-C dura até 10 semanas'
                ],
                'badge_text' => 'Escolha da Amazon',
                'description' => 'O Kindle Paperwhite é leve, fino e viaja facilmente. Com tela antirreflexo de 300 ppi, você lê como se fosse em papel impresso mesmo sob luz solar intensa.'
            ],
            [
                'id' => 'prod-3',
                'asin' => 'B0B8S9L9Z8',
                'title' => 'Echo Dot 5ª Geração com Relógio | O Echo Dot com o melhor som já lançado | Cor Branca',
                'category' => 'alexa-echo',
                'price' => 399.00,
                'original_price' => 529.00,
                'discount_percentage' => 25,
                'rating' => 4.8,
                'reviews_count' => 45210,
                'is_prime' => true,
                'is_best_seller' => false,
                'is_choice' => true,
                'is_lightning_deal' => true,
                'deal_claimed_percentage' => 72,
                'image_url' => 'https://m.media-amazon.com/images/I/61+dYyGSm3L._AC_SL1000_.jpg',
                'amazon_url' => 'https://www.amazon.com.br/dp/B0B8S9L9Z8',
                'features' => [
                    'Display de LED aprimorado para ver as horas, previsão do tempo e títulos de músicas',
                    'Graves até 2x mais potentes e vocais muito mais nítidos',
                    'Sensor de temperatura integrado para rotinas automáticas de ar-condicionado',
                    'Toque no topo para pausar música ou adiar o despertador'
                ],
                'badge_text' => 'Oferta Relâmpago',
                'description' => 'O Echo Dot 5ª geração com relógio conta com display LED moderno e qualidade sonora surpreendente com graves profundos.'
            ],
            [
                'id' => 'prod-4',
                'asin' => 'B08F6TL6P4',
                'title' => 'Fire TV Stick Lite | Streaming em Full HD com Controle Remoto por Voz com Alexa',
                'category' => 'alexa-echo',
                'price' => 269.00,
                'original_price' => 299.00,
                'discount_percentage' => 10,
                'rating' => 4.8,
                'reviews_count' => 92300,
                'is_prime' => true,
                'is_best_seller' => true,
                'is_choice' => true,
                'is_lightning_deal' => false,
                'deal_claimed_percentage' => null,
                'image_url' => 'https://m.media-amazon.com/images/I/51Da25+4PmL._AC_SL1000_.jpg',
                'amazon_url' => 'https://www.amazon.com.br/dp/B08F6TL6P4',
                'features' => [
                    'Streaming rápido e em Full HD para transformar qualquer TV em Smart',
                    'Controle Remoto Lite por Voz com Alexa: aperte e peça para buscar filmes e séries',
                    'Acesso a Prime Video, Netflix, YouTube, Disney+, Max, Globoplay e mais',
                    'Instalação fácil: basta plugar atrás da TV e conectar ao Wi-Fi'
                ],
                'badge_text' => 'Mais Vendido em Dispositivos de TV',
                'description' => 'Transforme sua TV em um centro de entretenimento com acesso aos principais serviços de streaming e comandos rápidos por voz com Alexa.'
            ],
            [
                'id' => 'prod-5',
                'asin' => 'B07V2B6W35',
                'title' => 'Fritadeira Sem Óleo Air Fryer Mondial 4L Family Inox AFN-40-BI 1500W',
                'category' => 'casa-cozinha',
                'price' => 299.90,
                'original_price' => 429.90,
                'discount_percentage' => 30,
                'rating' => 4.7,
                'reviews_count' => 18450,
                'is_prime' => true,
                'is_best_seller' => true,
                'is_choice' => false,
                'is_lightning_deal' => true,
                'deal_claimed_percentage' => 91,
                'image_url' => 'https://m.media-amazon.com/images/I/61NqVn5ZhhL._AC_SL1000_.jpg',
                'amazon_url' => 'https://www.amazon.com.br/dp/B07V2B6W35',
                'features' => [
                    'Capacidade de 4 Litros: cesto quadrado espaçoso para a família toda',
                    'Controle de temperatura até 200°C e timer sonoro de 60 minutos com desligamento automático',
                    'Revestimento antiaderente Duraflon que não gruda e facilita a limpeza',
                    'Prepara alimentos crocantes e sequinhos sem necessidade de óleo'
                ],
                'badge_text' => 'Oferta em Cozinha',
                'description' => 'A Air Fryer Mondial Family 4 Litros prepara suas receitas favoritas com praticidade, rapidez e muito mais saúde.'
            ],
            [
                'id' => 'prod-6',
                'asin' => 'B09J1RBY6G',
                'title' => 'Suporte Articulado de Mesa a Gás com Pistão para Monitores de 17 a 35" - North Bayou F80',
                'category' => 'informatica',
                'price' => 189.90,
                'original_price' => 289.00,
                'discount_percentage' => 34,
                'rating' => 4.9,
                'reviews_count' => 31200,
                'is_prime' => true,
                'is_best_seller' => true,
                'is_choice' => true,
                'is_lightning_deal' => false,
                'deal_claimed_percentage' => null,
                'image_url' => 'https://m.media-amazon.com/images/I/61n9r8K8aML._AC_SL1500_.jpg',
                'amazon_url' => 'https://www.amazon.com.br/dp/B09J1RBY6G',
                'features' => [
                    'Sistema de amortecimento com pistão a gás para regulagem fluida de altura e inclinação',
                    'Suporta monitores de 17" até 35" pesando de 2kg até 9kg',
                    'Compatível com padrão VESA 75x75 e 100x100mm',
                    'Organizador integrado de cabos para um setup limpo e ergonômico'
                ],
                'badge_text' => 'Mais Vendido em Suportes',
                'description' => 'O suporte articulado F80 da North Bayou libera espaço na mesa e proporciona a ergonomia perfeita para horas de trabalho ou jogos.'
            ],
            [
                'id' => 'prod-7',
                'asin' => 'B07ZPKBL9V',
                'title' => 'Mouse Sem Fio Logitech MX Master 3S / G305 LIGHTSPEED 12.000 DPI Sensor HERO',
                'category' => 'informatica',
                'price' => 199.90,
                'original_price' => 279.90,
                'discount_percentage' => 29,
                'rating' => 4.8,
                'reviews_count' => 22100,
                'is_prime' => true,
                'is_best_seller' => true,
                'is_choice' => true,
                'is_lightning_deal' => true,
                'deal_claimed_percentage' => 65,
                'image_url' => 'https://m.media-amazon.com/images/I/51C+3d+T9vL._AC_SL1000_.jpg',
                'amazon_url' => 'https://www.amazon.com.br/dp/B07ZPKBL9V',
                'features' => [
                    'Sensor óptico HERO com precisão de até 12.000 DPI',
                    'Tecnologia sem fio LIGHTSPEED com resposta ultrarrápida de 1ms',
                    'Autonomia incrível: até 250 horas contínuas de uso com 1 pilha AA',
                    'Design ultra-leve de 99 gramas com compartimento para receptor nano'
                ],
                'badge_text' => 'Melhor Custo-Benefício Sem Fio',
                'description' => 'Desempenho profissional para jogos e produtividade extrema sem atrasos ou cabos embaraçados.'
            ],
            [
                'id' => 'prod-8',
                'asin' => 'B08F7V95QZ',
                'title' => 'Fone de Ouvido Bluetooth QCY T13 TWS com 4 Microfones ENC e Cancelamento de Ruído',
                'category' => 'eletronicos',
                'price' => 129.90,
                'original_price' => 199.00,
                'discount_percentage' => 35,
                'rating' => 4.6,
                'reviews_count' => 41800,
                'is_prime' => true,
                'is_best_seller' => true,
                'is_choice' => false,
                'is_lightning_deal' => true,
                'deal_claimed_percentage' => 88,
                'image_url' => 'https://m.media-amazon.com/images/I/51UjNn+hMhL._AC_SL1000_.jpg',
                'amazon_url' => 'https://www.amazon.com.br/dp/B08F7V95QZ',
                'features' => [
                    'Até 40 horas de reprodução total com o estojo de carregamento',
                    'Carregamento rápido: 10 minutos na tomada garantem 1 hora de som',
                    '4 microfones com redução de ruído ambiente ENC para chamadas cristalinas',
                    'Drivers de 7.2mm com graves dinâmicos e conexão Bluetooth 5.1 estável'
                ],
                'badge_text' => 'Campeão de Vendas',
                'description' => 'O fone Bluetooth com a melhor relação custo-benefício do mercado, com autonomia gigante e excelente clareza em chamadas.'
            ],
            [
                'id' => 'prod-9',
                'asin' => 'B084G356SZ',
                'title' => 'Lâmpada Inteligente Smart LED Wi-Fi 10W RGB Positivo Casa Inteligente Compatível com Alexa',
                'category' => 'smart-home',
                'price' => 39.90,
                'original_price' => 69.90,
                'discount_percentage' => 43,
                'rating' => 4.6,
                'reviews_count' => 34100,
                'is_prime' => true,
                'is_best_seller' => true,
                'is_choice' => true,
                'is_lightning_deal' => false,
                'deal_claimed_percentage' => null,
                'image_url' => 'https://m.media-amazon.com/images/I/51lJd1dI-lL._AC_SL1000_.jpg',
                'amazon_url' => 'https://www.amazon.com.br/dp/B084G356SZ',
                'features' => [
                    '16 milhões de cores RGB e ajuste de intensidade de luz branca quente e fria',
                    'Controle por voz direto pela Alexa ou Google Assistente',
                    'Não precisa de hub: conecta diretamente ao Wi-Fi da sua casa',
                    'Programe horários e crie rotinas personalizadas pelo smartphone'
                ],
                'badge_text' => 'Achadinho até R$ 99',
                'description' => 'Personalize a iluminação de qualquer cômodo da sua casa com facilidade e comandos de voz rápidos.'
            ],
            [
                'id' => 'prod-10',
                'asin' => 'B07N4W8M4B',
                'title' => 'Livro: Hábitos Atômicos por James Clear | Um método fácil e comprovado de criar bons hábitos',
                'category' => 'livros',
                'price' => 49.90,
                'original_price' => 69.90,
                'discount_percentage' => 29,
                'rating' => 4.9,
                'reviews_count' => 56700,
                'is_prime' => true,
                'is_best_seller' => true,
                'is_choice' => true,
                'is_lightning_deal' => false,
                'deal_claimed_percentage' => null,
                'image_url' => 'https://m.media-amazon.com/images/I/817+1Tq7XBL._AC_SL1500_.jpg',
                'amazon_url' => 'https://www.amazon.com.br/dp/B07N4W8M4B',
                'features' => [
                    'Mais de 15 milhões de exemplares vendidos no mundo inteiro',
                    'Guia prático e baseado em neurociência para transformar sua rotina',
                    'Aprenda como pequenas mudanças diárias de 1% geram resultados exponenciais',
                    'Capa comum de alta qualidade com acabamento premium'
                ],
                'badge_text' => 'Mais Vendido Geral em Livros',
                'description' => 'O livro definitivo sobre produtividade e mudança de comportamento que revolucionou a vida de milhões de leitores.'
            ],
            [
                'id' => 'prod-11',
                'asin' => 'B0BGH56R4W',
                'title' => 'Plugue Inteligente Smart Wi-Fi 16A Tomada Inteligente com Monitor de Energia e Alexa',
                'category' => 'smart-home',
                'price' => 54.90,
                'original_price' => 89.90,
                'discount_percentage' => 39,
                'rating' => 4.7,
                'reviews_count' => 15400,
                'is_prime' => true,
                'is_best_seller' => false,
                'is_choice' => true,
                'is_lightning_deal' => true,
                'deal_claimed_percentage' => 62,
                'image_url' => 'https://m.media-amazon.com/images/I/51wXQoZ1Q8L._AC_SL1000_.jpg',
                'amazon_url' => 'https://www.amazon.com.br/dp/B0BGH56R4W',
                'features' => [
                    'Capacidade de 16A (suporta cafeteiras, ar condicionado e eletrodomésticos)',
                    'Medição de consumo elétrico em tempo real pelo app',
                    'Ligue ou desligue aparelhos à distância mesmo longe de casa',
                    'Compatível com comandos de voz Alexa e Google Home'
                ],
                'badge_text' => 'Achadinho até R$ 99',
                'description' => 'Transforme qualquer tomada comum em inteligente e monitore os gastos de energia dos seus aparelhos.'
            ],
            [
                'id' => 'prod-12',
                'asin' => 'B08C1W5N87',
                'title' => 'Teclado Mecânico Gamer Redragon Kumara Switch Outemu Red RGB Layout ABNT2',
                'category' => 'games',
                'price' => 219.00,
                'original_price' => 289.90,
                'discount_percentage' => 24,
                'rating' => 4.8,
                'reviews_count' => 19800,
                'is_prime' => true,
                'is_best_seller' => true,
                'is_choice' => false,
                'is_lightning_deal' => false,
                'deal_claimed_percentage' => null,
                'image_url' => 'https://m.media-amazon.com/images/I/61NfT2o1kLL._AC_SL1000_.jpg',
                'amazon_url' => 'https://www.amazon.com.br/dp/B08C1W5N87',
                'features' => [
                    'Layout ABNT2 nacional com tecla Ç física',
                    'Switches mecânicos Outemu Red lineares e silenciosos com sistema Hot-Swap',
                    'Iluminação RGB Chroma com múltiplos modos de animação',
                    'Construção robusta em metal e plástico ABS de nível industrial'
                ],
                'badge_text' => 'Favorito dos Gamers',
                'description' => 'O teclado mecânico mais vendido do Brasil, com digitação suave e resposta rápida para jogos competitivos e digitação.'
            ]
        ];

        foreach ($products as $prod) {
            Product::updateOrCreate(['id' => $prod['id']], $prod);
        }
    }
}
