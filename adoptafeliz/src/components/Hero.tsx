import React from 'react';
import { Heart, PawPrint, ShoppingBag, ArrowRight, ShieldCheck, CheckCircle2, Sparkles } from 'lucide-react';
import { DatabaseStatus } from '../types';

interface HeroProps {
  onGoToAdopt: () => void;
  onGoToStore: () => void;
  onOpenPublish: () => void;
  dbStatus: DatabaseStatus | null;
}

export const Hero: React.FC<HeroProps> = ({
  onGoToAdopt,
  onGoToStore,
  onOpenPublish,
  dbStatus
}) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-emerald-900/10 via-slate-50 to-slate-50 pt-8 pb-16">
      
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-indigo-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Banner Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100/80 text-emerald-800 border border-emerald-200 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Plataforma Oficial de Adopción y Rescate</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1] font-display">
              Conectando hogares con{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
                corazones peludos
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Facilitamos adopciones responsables, apoyamos a rescatistas independientes y garantizamos que cada mascota encuentre una familia que la proteja y la ame para siempre.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={onGoToAdopt}
                className="flex items-center gap-2.5 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-2xl shadow-lg shadow-emerald-600/30 hover:shadow-xl transition-all cursor-pointer group"
              >
                <Heart className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
                <span>Quiero Adoptar</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenPublish}
                className="flex items-center gap-2.5 px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 font-bold text-sm rounded-2xl shadow-sm hover:shadow transition-all cursor-pointer"
              >
                <PawPrint className="w-4 h-4 text-emerald-600" />
                <span>Soy Rescatista</span>
              </button>

              <button
                onClick={onGoToStore}
                className="flex items-center gap-2.5 px-5 py-3.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 font-bold text-sm rounded-2xl transition-all cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Tienda Solidaria</span>
              </button>
            </div>

            {/* Trust Highlights */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-slate-500 font-medium">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Protocolo de vacunación completo</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Seguimiento y asesoría post-adopción</span>
              </div>
            </div>
          </div>

          {/* Right Image Composition */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white aspect-[4/3] group">
                <img
                  src="/images/carrusel1.jpg"
                  alt="Mascotas felices en adopción"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/Gato_perro.jpg';
                  }}
                />
                
                {/* Overlay Card */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-white/60 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src="/images/Perfilmax.jpg"
                      alt="Canelo"
                      className="w-12 h-12 rounded-xl object-cover"
                    />
                    <div>
                      <p className="font-bold text-slate-900 text-xs sm:text-sm">Canelo • Cachorro</p>
                      <p className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        Esperando un hogar en Chimalhuacán
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={onGoToAdopt}
                    className="px-3 py-1.5 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition-colors cursor-pointer"
                  >
                    Ver
                  </button>
                </div>
              </div>

              {/* Decorative side badge */}
              <div className="hidden sm:block absolute -top-5 -right-5 bg-white rounded-2xl p-3 shadow-xl border border-slate-100 text-center animate-bounce duration-1000">
                <Heart className="w-6 h-6 text-rose-500 fill-current mx-auto" />
                <span className="text-[10px] font-bold text-slate-700 block mt-1">+1,200 Vidas Cambiadas</span>
              </div>
            </div>
          </div>

        </div>

        {/* Live Database Statistics Bar */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/90">
          <div className="text-center p-3">
            <span className="block text-3xl sm:text-4xl font-black text-emerald-600 font-display">1,247+</span>
            <span className="text-xs sm:text-sm text-slate-600 font-semibold mt-1 block">Adopciones Exitosas</span>
          </div>

          <div className="text-center p-3 border-l border-slate-100">
            <span className="block text-3xl sm:text-4xl font-black text-indigo-600 font-display">
              {dbStatus?.stats.usuarios ? `${dbStatus.stats.usuarios} Cuentas` : '10 Cuentas'}
            </span>
            <span className="text-xs sm:text-sm text-slate-600 font-semibold mt-1 block">En Base de Datos</span>
          </div>

          <div className="text-center p-3 border-l border-slate-100">
            <span className="block text-3xl sm:text-4xl font-black text-teal-600 font-display">
              {dbStatus?.stats.mascotas || 8}
            </span>
            <span className="text-xs sm:text-sm text-slate-600 font-semibold mt-1 block">Mascotas Disponibles</span>
          </div>

          <div className="text-center p-3 border-l border-slate-100">
            <span className="block text-3xl sm:text-4xl font-black text-amber-500 font-display">
              ${(dbStatus?.stats.totalRecaudado || 640.78).toFixed(2)}
            </span>
            <span className="text-xs sm:text-sm text-slate-600 font-semibold mt-1 block">Recaudado para Refugios</span>
          </div>
        </div>

      </div>
    </div>
  );
};
