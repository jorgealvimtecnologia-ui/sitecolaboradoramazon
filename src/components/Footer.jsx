import React from 'react';
import { ShieldCheck, Truck, RefreshCw, Lock, Sparkles, Heart, Tag, SlidersHorizontal } from 'lucide-react';
import { CATEGORIES } from '../data/categories';

export default function Footer({ onOpenTagSettings, onOpenAdmin, setSelectedCategory }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-16 text-white text-xs">
      
      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className="w-full bg-[#37475a] hover:bg-[#485769] py-3 text-center text-xs font-semibold text-white transition-colors block"
      >
        Voltar ao início
      </button>

      {/* Main Footer Links (#232f3e) */}
      <div className="bg-[#232f3e] py-10 px-4 sm:px-6 lg:px-8 border-b border-[#3a4553]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          
          {/* Col 1: Store Info */}
          <div>
            <div className="flex items-center gap-1.5 mb-3">
              <span className="text-xl font-black tracking-tight text-white">
                amazon<span className="text-[#febd69]">.</span>
              </span>
              <span className="text-[10px] bg-[#131921] text-[#febd69] px-1.5 py-0.5 rounded font-bold uppercase">
                Storefront
              </span>
            </div>
            <p className="text-gray-300 leading-relaxed text-[11px] mb-3">
              Curadoria de produtos selecionados, achadinhos de tecnologia, casa inteligente e as melhores ofertas do dia com entrega rápida e segura da Amazon.
            </p>
            <div className="flex items-center gap-2 text-gray-300 text-[11px]">
              <Lock className="w-3.5 h-3.5 text-green-400" />
              <span>Transações 100% processadas na Amazon.com.br</span>
            </div>
          </div>

          {/* Col 2: Categories */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">
              Departamentos
            </h4>
            <ul className="space-y-1.5 text-gray-300 text-[11px]">
              {CATEGORIES.slice(1, 7).map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      scrollToTop();
                    }}
                    className="hover:text-[#febd69] hover:underline transition-colors text-left"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Prime Benefits */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">
              Vantagens Amazon Prime
            </h4>
            <ul className="space-y-2 text-gray-300 text-[11px]">
              <li className="flex items-center gap-2">
                <Truck className="w-3.5 h-3.5 text-[#00a8e1]" />
                <span>Frete GRÁTIS sem valor mínimo</span>
              </li>
              <li className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#febd69]" />
                <span>Ofertas exclusivas com antecedência</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-green-400" />
                <span>Garantia de A a Z da Amazon</span>
              </li>
              <li className="flex items-center gap-2">
                <RefreshCw className="w-3.5 h-3.5 text-gray-300" />
                <span>Devolução simples em até 30 dias</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Tools & Settings */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">
              Painel do Criador
            </h4>
            <div className="space-y-2">
              <button
                onClick={onOpenTagSettings}
                className="w-full bg-[#131921] hover:bg-[#1a232f] border border-[#3b495c] text-white p-2.5 rounded text-left text-xs font-semibold flex items-center justify-between transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Tag className="w-3.5 h-3.5 text-[#febd69]" />
                  <span>Configurar Minha Tag</span>
                </div>
                <span className="text-[10px] text-[#febd69]">Editar</span>
              </button>

              <button
                onClick={onOpenAdmin}
                className="w-full bg-[#131921] hover:bg-[#1a232f] border border-[#3b495c] text-white p-2.5 rounded text-left text-xs font-semibold flex items-center justify-between transition-colors"
              >
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-[#f08804]" />
                  <span>Gerenciar Produtos</span>
                </div>
                <span className="text-[10px] text-[#f08804]">Admin</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Official Amazon Associates Compliance Disclaimer (#131921) */}
      <div className="bg-[#131921] py-8 px-4 sm:px-6 lg:px-8 text-center text-gray-400 text-[11px] leading-relaxed">
        <div className="max-w-4xl mx-auto space-y-3">
          
          <div className="bg-[#232f3e]/60 p-3.5 rounded-lg border border-[#37475a] text-gray-300 text-left">
            <strong className="text-white block mb-1">
              Divulgação de Conformidade do Programa de Associados da Amazon:
            </strong>
            <p className="text-[10.5px] leading-normal text-gray-300">
              Como participante do <strong>Programa de Associados da Amazon</strong>, somos remunerados por compras qualificadas elegíveis realizadas através dos links indicados nesta página.
              Os preços, descontos e disponibilidades dos produtos são válidos no momento da postagem e podem sofrer alterações pela Amazon sem aviso prévio. Todas as compras são finalizadas com total segurança diretamente no site ou aplicativo oficial da Amazon.com.br.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-gray-400 pt-2 text-[11px]">
            <span>Condições de Uso</span>
            <span>•</span>
            <span>Notificação de Privacidade</span>
            <span>•</span>
            <span>Políticas de Cookies</span>
            <span>•</span>
            <span>Amazon Associates Guidelines</span>
          </div>

          <p className="text-[10px] text-gray-500 pt-1">
            © {new Date().getFullYear()} Amazon Affiliate Storefront. Todos os direitos reservados. Amazon, Echo, Alexa, Kindle, Fire TV e todos os logotipos relacionados são marcas comerciais da Amazon.com, Inc. ou de suas afiliadas.
          </p>

        </div>
      </div>

    </footer>
  );
}
