import React from 'react';
import { Heart, MapPin, Sparkles, ShieldCheck } from 'lucide-react';
import { Mascota } from '../types';

interface PetCardProps {
  mascota: Mascota;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
  onOpenDetails: (mascota: Mascota) => void;
  onStartAdoption: (mascota: Mascota) => void;
}

export const PetCard: React.FC<PetCardProps> = ({
  mascota,
  isFavorite,
  onToggleFavorite,
  onOpenDetails,
  onStartAdoption
}) => {
  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col hover:-translate-y-1">
      {/* Photo Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 cursor-pointer" onClick={() => onOpenDetails(mascota)}>
        <img
          src={mascota.foto}
          alt={mascota.nombre}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/images/mascotas_adopcion_1.jpg';
          }}
        />

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 pointer-events-none">
          <span className="px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/95 text-slate-800 shadow-sm backdrop-blur-sm">
            {mascota.especie}
          </span>
          {mascota.urgente && (
            <span className="px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-500 text-white shadow-sm flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Urgente
            </span>
          )}
        </div>

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(mascota.id);
          }}
          className={`absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-md cursor-pointer ${
            isFavorite
              ? 'bg-rose-500 text-white scale-110'
              : 'bg-white/90 text-slate-500 hover:text-rose-500 hover:bg-white'
          }`}
          aria-label={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        >
          <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
        </button>

        {/* Status Badge */}
        <div className="absolute bottom-3 left-3">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${
              mascota.estado === 'disponible'
                ? 'bg-emerald-500 text-white'
                : mascota.estado === 'en_proceso'
                ? 'bg-amber-500 text-white'
                : 'bg-slate-700 text-white'
            }`}
          >
            {mascota.estado === 'disponible' ? 'En Adopción' : mascota.estado === 'en_proceso' ? 'En Trámite' : 'Adoptado'}
          </span>
        </div>
      </div>

      {/* Info Section */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3
              onClick={() => onOpenDetails(mascota)}
              className="text-xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors cursor-pointer"
            >
              {mascota.nombre}
            </h3>
            <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg">
              {mascota.genero}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-3">
            <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span className="truncate">{mascota.ubicacion}</span>
          </div>

          {/* Quick tags */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            <span className="text-[11px] font-medium bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md border border-emerald-100">
              {mascota.edad}
            </span>
            <span className="text-[11px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">
              {mascota.tamano}
            </span>
            {mascota.vacunado && (
              <span className="text-[11px] font-medium bg-cyan-50 text-cyan-700 px-2 py-0.5 rounded-md border border-cyan-100 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Vacunado
              </span>
            )}
          </div>

          <p className="text-slate-600 text-xs line-clamp-2 leading-relaxed mb-4">
            {mascota.descripcion}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-100">
          <button
            onClick={() => onOpenDetails(mascota)}
            className="w-full py-2.5 px-3 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50 hover:border-slate-300 transition-all cursor-pointer"
          >
            Ver Ficha
          </button>
          <button
            onClick={() => onStartAdoption(mascota)}
            disabled={mascota.estado === 'adoptado'}
            className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-md shadow-emerald-600/20 hover:shadow-lg transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {mascota.estado === 'adoptado' ? 'Adoptado' : 'Adoptar'}
          </button>
        </div>
      </div>
    </div>
  );
};
