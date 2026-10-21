import React, { useState } from 'react';
import { X, PawPrint, Upload, Sparkles, Check } from 'lucide-react';
import { Mascota, Usuario } from '../types';
import { api } from '../services/api';

interface PublishPetModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: Usuario | null;
  onSuccess: (mascota: Mascota) => void;
  onToast: (type: 'success' | 'error' | 'info', message: string, title?: string) => void;
}

export const PublishPetModal: React.FC<PublishPetModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onSuccess,
  onToast
}) => {
  if (!isOpen) return null;

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    especie: 'perro',
    edad: '1 año',
    edad_tipo: 'joven',
    genero: 'Macho',
    tamano: 'Mediano',
    descripcion: '',
    foto: '/images/mascotas_adopcion_4.jpg',
    ubicacion: currentUser?.ubicacion || 'Chimalhuacán, Estado de México',
    rescatista_nombre: currentUser?.nombre || 'Rescatista Independiente',
    personalidadTags: 'Cariñoso, Sociable, Enérgico'
  });

  const samplePhotos = [
    { label: 'Perrito 1', url: '/images/mascotas_adopcion_1.jpg' },
    { label: 'Gatito 1', url: '/images/gatito1.jpg' },
    { label: 'Perrito 2', url: '/images/mascotas_adopcion_3.jpg' },
    { label: 'Gato Negro', url: '/images/Gato_NegroPerfil.jpg' },
    { label: 'Perrito Canelo', url: '/images/Perfilmax.jpg' },
    { label: 'Ave', url: '/images/AvePerfil.jpg' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nombre.trim() || !formData.descripcion.trim()) {
      onToast('error', 'El nombre y la descripción de la mascota son obligatorios.');
      return;
    }

    try {
      setLoading(true);
      const tags = formData.personalidadTags
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);

      const nuevaMascota = await api.createMascota({
        nombre: formData.nombre.trim(),
        especie: formData.especie as any,
        edad: formData.edad,
        edad_tipo: formData.edad_tipo as any,
        genero: formData.genero as any,
        tamano: formData.tamano as any,
        descripcion: formData.descripcion.trim(),
        foto: formData.foto,
        ubicacion: formData.ubicacion,
        rescatista_nombre: formData.rescatista_nombre,
        personalidad: tags.length > 0 ? tags : ['Cariñoso', 'Tranquilo']
      });

      onSuccess(nuevaMascota);
      onToast('success', `¡${nuevaMascota.nombre} ha sido publicado y guardado en la base de datos!`, 'Mascota Publicada');
      onClose();
    } catch (err: any) {
      onToast('error', err.message || 'Error al publicar mascota.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/70 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[92vh] flex flex-col overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <PawPrint className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Publicar Mascota para Adopción</h2>
              <p className="text-xs text-emerald-100">Espacio para rescatistas independientes y albergues</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-2 rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 text-xs sm:text-sm">
          
          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-1.5">
              1. Datos Básicos del Animal
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Nombre de la Mascota *</label>
                <input
                  type="text"
                  required
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  placeholder="Ej. Rocky, Manchitas, Misi..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 bg-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Especie *</label>
                <select
                  value={formData.especie}
                  onChange={(e) => setFormData({ ...formData, especie: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 bg-white"
                >
                  <option value="perro">Perro</option>
                  <option value="gato">Gato</option>
                  <option value="ave">Ave</option>
                  <option value="otro">Otro animal de compañía</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Edad estimada</label>
                <input
                  type="text"
                  value={formData.edad}
                  onChange={(e) => setFormData({ ...formData, edad: e.target.value })}
                  placeholder="Ej. 6 meses, 2 años"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 bg-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Sexo</label>
                <select
                  value={formData.genero}
                  onChange={(e) => setFormData({ ...formData, genero: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 bg-white"
                >
                  <option value="Macho">Macho</option>
                  <option value="Hembra">Hembra</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Tamaño</label>
                <select
                  value={formData.tamano}
                  onChange={(e) => setFormData({ ...formData, tamano: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 bg-white"
                >
                  <option value="Pequeño">Pequeño</option>
                  <option value="Mediano">Mediano</option>
                  <option value="Grande">Grande</option>
                </select>
              </div>
            </div>
          </div>

          {/* Photo selection */}
          <div className="space-y-2 pt-1">
            <label className="block font-semibold text-slate-700">Foto Principal</label>
            <div className="grid grid-cols-6 gap-2">
              {samplePhotos.map((photo, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setFormData({ ...formData, foto: photo.url })}
                  className={`aspect-square rounded-xl overflow-hidden border-2 transition-all relative cursor-pointer ${
                    formData.foto === photo.url ? 'border-emerald-600 ring-2 ring-emerald-500/30' : 'border-slate-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={photo.url} alt={photo.label} className="w-full h-full object-cover" />
                  {formData.foto === photo.url && (
                    <div className="absolute inset-0 bg-emerald-600/30 flex items-center justify-center">
                      <Check className="w-4 h-4 text-white font-bold" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Description & Personality */}
          <div className="space-y-3 pt-1">
            <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-1.5">
              2. Historia y Personalidad
            </h3>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Descripción y motivos del rescate *</label>
              <textarea
                rows={3}
                required
                value={formData.descripcion}
                onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                placeholder="Describe su personalidad, qué le gusta, convivencia con niños u otros animales, y su historia de rescate..."
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 bg-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Etiquetas de Personalidad</label>
                <input
                  type="text"
                  value={formData.personalidadTags}
                  onChange={(e) => setFormData({ ...formData, personalidadTags: e.target.value })}
                  placeholder="Separados por comas: Juguetón, Tranquilo..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 bg-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Ubicación / Ciudad</label>
                <input
                  type="text"
                  value={formData.ubicacion}
                  onChange={(e) => setFormData({ ...formData, ubicacion: e.target.value })}
                  placeholder="Ej. Chimalhuacán, CDMX, Puebla..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Nombre del Rescatista o Refugio</label>
              <input
                type="text"
                value={formData.rescatista_nombre}
                onChange={(e) => setFormData({ ...formData, rescatista_nombre: e.target.value })}
                placeholder="Tu nombre o el de tu organización"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 bg-white"
              />
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/30 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? 'Guardando...' : 'Publicar Mascota'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
