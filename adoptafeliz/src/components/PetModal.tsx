import React, { useState } from 'react';
import { X, Heart, MapPin, ShieldCheck, Check, Calendar, User, Sparkles } from 'lucide-react';
import { Mascota } from '../types';

interface PetModalProps {
  mascota: Mascota | null;
  isOpen: boolean;
  onClose: () => void;
  onStartAdoption: (mascota: Mascota) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
}

export const PetModal: React.FC<PetModalProps> = ({
  mascota,
  isOpen,
  onClose,
  onStartAdoption,
  isFavorite,
  onToggleFavorite
}) => {
  if (!isOpen || !mascota) return null;

  const [activePhoto, setActivePhoto] = useState<string>(mascota.foto);
  const gallery = mascota.galeria && mascota.galeria.length > 0 ? mascota.galeria : [mascota.foto];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/70 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[92vh] flex flex-col overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Top Bar */}
        <div className="relative">
          {/* Main Photo */}
          <div className="h-72 sm:h-96 w-full bg-slate-100 overflow-hidden relative">
            <img
              src={activePhoto}
              alt={mascota.nombre}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/images/mascotas_adopcion_1.jpg';
              }}
            />

            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white flex items-center justify-center backdrop-blur-md transition-colors cursor-pointer"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Favorite Button */}
            <button
              onClick={() => onToggleFavorite(mascota.id)}
              className={`absolute top-4 left-4 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all cursor-pointer ${
                isFavorite ? 'bg-rose-500 text-white' : 'bg-white/90 text-slate-700 hover:text-rose-500'
              }`}
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
            </button>

            {/* Badges in Image */}
            <div className="absolute bottom-4 left-4 flex gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/95 text-slate-800 shadow-sm backdrop-blur-md uppercase tracking-wider">
                {mascota.especie}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-600 text-white shadow-sm">
                {mascota.estado === 'disponible' ? 'Listo para adopción' : 'En trámite de adopción'}
              </span>
            </div>
          </div>

          {/* Photo Thumbnails */}
          {gallery.length > 1 && (
            <div className="flex gap-2 p-3 bg-slate-50 border-b border-slate-200 overflow-x-auto">
              {gallery.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setActivePhoto(imgUrl)}
                  className={`w-14 h-14 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                    activePhoto === imgUrl ? 'border-emerald-600 ring-2 ring-emerald-500/30' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={imgUrl} alt={`Foto ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Content Details */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-3xl font-extrabold text-slate-900">{mascota.nombre}</h2>
                <span className="px-3 py-1 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-lg border border-emerald-200">
                  {mascota.genero}
                </span>
              </div>
              <div className="flex items-center gap-2 text-slate-500 text-sm mt-1.5">
                <MapPin className="w-4 h-4 text-emerald-600" />
                <span>{mascota.ubicacion}</span>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onStartAdoption(mascota);
              }}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-2xl shadow-lg shadow-emerald-600/30 hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Heart className="w-4 h-4 fill-current" />
              Solicitar Adopción
            </button>
          </div>

          {/* Caracteristicas clave */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200/80 text-center">
            <div>
              <p className="text-xs text-slate-400 font-medium">Edad</p>
              <p className="text-sm font-bold text-slate-800 mt-0.5">{mascota.edad}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Tamaño</p>
              <p className="text-sm font-bold text-slate-800 mt-0.5">{mascota.tamano}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Etapa</p>
              <p className="text-sm font-bold text-slate-800 mt-0.5 capitalize">{mascota.edad_tipo}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Sexo</p>
              <p className="text-sm font-bold text-slate-800 mt-0.5">{mascota.genero}</p>
            </div>
          </div>

          {/* Salud y Cuidados */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Estado de Salud y Protocolo Médico
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 bg-white">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center ${mascota.vacunado ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-400'}`}>
                  <Check className="w-3 h-3" />
                </div>
                <span className="text-xs font-semibold text-slate-700">Vacunado</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 bg-white">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center ${mascota.desparasitado ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-400'}`}>
                  <Check className="w-3 h-3" />
                </div>
                <span className="text-xs font-semibold text-slate-700">Desparasitado</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 bg-white">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center ${mascota.esterilizado ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-400'}`}>
                  <Check className="w-3 h-3" />
                </div>
                <span className="text-xs font-semibold text-slate-700">Esterilizado</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 bg-white">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center ${mascota.chip ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-400'}`}>
                  <Check className="w-3 h-3" />
                </div>
                <span className="text-xs font-semibold text-slate-700">Microchip ID</span>
              </div>
            </div>
          </div>

          {/* Personalidad */}
          {mascota.personalidad && mascota.personalidad.length > 0 && (
            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-2.5 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                Temperamento y Personalidad
              </h4>
              <div className="flex flex-wrap gap-2">
                {mascota.personalidad.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded-full border border-slate-200"
                  >
                    🐾 {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Historia / Descripción */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-2">Su Historia</h4>
            <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line bg-slate-50 p-4 rounded-2xl border border-slate-200/60">
              {mascota.descripcion}
            </p>
          </div>

          {/* Rescatista info */}
          <div className="flex items-center justify-between p-4 bg-emerald-50/60 rounded-2xl border border-emerald-100 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold">
                <User className="w-4 h-4" />
              </div>
              <div>
                <p className="font-semibold text-slate-900">Rescatista a cargo</p>
                <p className="text-slate-600">{mascota.rescatista_nombre}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-slate-500">
              <Calendar className="w-3.5 h-3.5" />
              <span>Publicado: {mascota.fecha_publicacion}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
