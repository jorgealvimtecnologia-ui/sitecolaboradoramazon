import React, { useState, useEffect } from 'react';
import { Flame, Clock, Zap, ArrowRight } from 'lucide-react';

export default function LightningDealsBar({ onFilterDeals, isDealsActive }) {
  // Real-time countdown timer simulation (e.g. 4 hours, 32 mins, 15 secs)
  const [timeLeft, setTimeLeft] = useState({
    hours: 3,
    minutes: 47,
    seconds: 18
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 5, minutes: 59, seconds: 59 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDigits = (num) => String(num).padStart(2, '0');

  return (
    <div className="bg-gradient-to-r from-[#cc0c39] to-[#990024] text-white rounded-lg p-3 sm:p-4 mb-6 shadow-md">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        
        {/* Left: Deals Info */}
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
            <Flame className="w-6 h-6 text-[#febd69] animate-bounce" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-extrabold text-base sm:text-lg tracking-tight flex items-center gap-1.5">
                Ofertas Relâmpago do Dia
              </h2>
              <span className="bg-[#febd69] text-[#131921] text-[10px] font-black uppercase px-2 py-0.5 rounded">
                Até 43% OFF
              </span>
            </div>
            <p className="text-xs text-red-100 mt-0.5">
              Descontos por tempo limitado com estoque reduzido e Frete Grátis Prime
            </p>
          </div>
        </div>

        {/* Right: Countdown Timer & Action */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <div className="flex items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-md border border-white/15 text-xs font-mono">
            <Clock className="w-3.5 h-3.5 text-[#febd69]" />
            <span className="text-gray-300 font-sans font-medium text-[11px] mr-1">Termina em:</span>
            <span className="font-bold text-white bg-white/20 px-1.5 py-0.5 rounded">
              {formatDigits(timeLeft.hours)}h
            </span>
            <span className="text-[#febd69] font-bold">:</span>
            <span className="font-bold text-white bg-white/20 px-1.5 py-0.5 rounded">
              {formatDigits(timeLeft.minutes)}m
            </span>
            <span className="text-[#febd69] font-bold">:</span>
            <span className="font-bold text-white bg-white/20 px-1.5 py-0.5 rounded">
              {formatDigits(timeLeft.seconds)}s
            </span>
          </div>

          <button
            onClick={onFilterDeals}
            className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all flex items-center gap-1 shadow ${
              isDealsActive
                ? 'bg-white text-[#cc0c39]'
                : 'bg-[#febd69] hover:bg-[#f3a847] text-[#131921]'
            }`}
          >
            <span>{isDealsActive ? 'Ver Todos' : 'Ver Ofertas'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
}
