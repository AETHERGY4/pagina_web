import React, { useState } from 'react';
import { X, Heart, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';
import { Mascota, Usuario } from '../types';
import { api } from '../services/api';

interface AdoptionFormModalProps {
  mascota: Mascota | null;
  currentUser: Usuario | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (mascotaNombre: string) => void;
  onToast: (type: 'success' | 'error' | 'info', message: string, title?: string) => void;
}

export const AdoptionFormModal: React.FC<AdoptionFormModalProps> = ({
  mascota,
  currentUser,
  isOpen,
  onClose,
  onSuccess,
  onToast
}) => {
  if (!isOpen || !mascota) return null;

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombre: currentUser?.nombre || '',
    email: currentUser?.correo || '',
    telefono: currentUser?.telefono || '',
    direccion: currentUser?.ubicacion || '',
    tipo_vivienda: 'Casa propia con patio cercado',
    tiene_mascotas: false,
    descripcion_hogar: '',
    motivo_adopcion: '',
    acepta_terminos: true
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nombre || !formData.email || !formData.telefono) {
      onToast('error', 'Por favor completa tus datos de contacto básicos.');
      return;
    }

    if (!formData.acepta_terminos) {
      onToast('error', 'Debes aceptar el compromiso de tenencia responsable.');
      return;
    }

    try {
      setLoading(true);
      await api.createSolicitud({
        mascota_id: mascota.id,
        mascota_nombre: mascota.nombre,
        solicitante_nombre: formData.nombre,
        solicitante_email: formData.email,
        telefono: formData.telefono,
        direccion: formData.direccion,
        tipo_vivienda: formData.tipo_vivienda,
        tiene_mascotas: formData.tiene_mascotas,
        descripcion_hogar: formData.descripcion_hogar,
        motivo_adopcion: formData.motivo_adopcion
      });

      onSuccess(mascota.nombre);
      onClose();
    } catch (err: any) {
      onToast('error', err.message || 'Error al enviar solicitud');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/70 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[92vh] flex flex-col overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-emerald-600 to-teal-700 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Heart className="w-5 h-5 text-white fill-current" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Solicitud de Adopción Responsable</h2>
              <p className="text-xs text-emerald-100">Estás solicitando adoptar a <span className="font-bold underline">{mascota.nombre}</span></p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-2 rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Selected Pet Banner */}
        <div className="bg-emerald-50/70 px-6 py-3 border-b border-emerald-100 flex items-center gap-3">
          <img src={mascota.foto} alt={mascota.nombre} className="w-12 h-12 rounded-xl object-cover shrink-0" />
          <div className="flex-1 text-xs">
            <p className="font-bold text-slate-900 text-sm">{mascota.nombre} • <span className="text-emerald-700 font-semibold capitalize">{mascota.especie}</span></p>
            <p className="text-slate-500">{mascota.edad} • {mascota.tamano} • {mascota.ubicacion}</p>
          </div>
          <span className="text-[11px] font-bold px-2.5 py-1 bg-white text-emerald-700 rounded-lg border border-emerald-200">
            Rescatista: {mascota.rescatista_nombre.split(' ')[0]}
          </span>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 text-xs sm:text-sm">
          
          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2">
              1. Datos del Solicitante
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Nombre Completo *</label>
                <input
                  type="text"
                  required
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  placeholder="Ej. Jorge Adán Vázquez"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 bg-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Correo Electrónico *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="correo@ejemplo.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Teléfono / WhatsApp *</label>
                <input
                  type="tel"
                  required
                  value={formData.telefono}
                  onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                  placeholder="Ej. 5551234567"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 bg-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Dirección y Ciudad *</label>
                <input
                  type="text"
                  required
                  value={formData.direccion}
                  onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
                  placeholder="Calle, colonia y municipio"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 bg-white"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-2">
            <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2">
              2. Entorno y Hogar
            </h3>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Tipo de Vivienda</label>
              <select
                value={formData.tipo_vivienda}
                onChange={(e) => setFormData({ ...formData, tipo_vivienda: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 bg-white"
              >
                <option value="Casa propia con patio cercado">Casa propia con patio cercado</option>
                <option value="Casa con jardín abierto">Casa con jardín abierto</option>
                <option value="Departamento (Permite mascotas)">Departamento (Permite mascotas)</option>
                <option value="Casa rentada con autorización">Casa rentada con autorización del propietario</option>
                <option value="Finca o terreno amplio">Finca o terreno amplio</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="tiene_mascotas"
                checked={formData.tiene_mascotas}
                onChange={(e) => setFormData({ ...formData, tiene_mascotas: e.target.checked })}
                className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500 border-slate-300"
              />
              <label htmlFor="tiene_mascotas" className="text-slate-700 font-medium">
                ¿Tienes otras mascotas actualmente en casa?
              </label>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                ¿Quiénes viven en casa y cómo es la dinámica familiar?
              </label>
              <textarea
                rows={2}
                value={formData.descripcion_hogar}
                onChange={(e) => setFormData({ ...formData, descripcion_hogar: e.target.value })}
                placeholder="Ej. Vivimos 3 adultos y un niño de 8 años. Todos estamos de acuerdo con la adopción..."
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 bg-white"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                ¿Por qué te gustaría adoptar a {mascota.nombre}?
              </label>
              <textarea
                rows={2}
                value={formData.motivo_adopcion}
                onChange={(e) => setFormData({ ...formData, motivo_adopcion: e.target.value })}
                placeholder="Cuéntanos qué te cautivó de su perfil..."
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 bg-white"
              />
            </div>
          </div>

          {/* Compromiso */}
          <div className="bg-amber-50/80 p-4 rounded-2xl border border-amber-200/80 space-y-2">
            <div className="flex items-start gap-2.5">
              <input
                type="checkbox"
                id="acepta_terminos"
                required
                checked={formData.acepta_terminos}
                onChange={(e) => setFormData({ ...formData, acepta_terminos: e.target.checked })}
                className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500 border-amber-300 mt-0.5"
              />
              <label htmlFor="acepta_terminos" className="text-amber-900 text-xs leading-relaxed font-medium">
                Me comprometo a brindar alimentación de calidad, atención veterinaria, esterilización (si aplica), paseos y amor incondicional a {mascota.nombre} durante toda su vida.
              </label>
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
              {loading ? 'Guardando en BD...' : 'Enviar Solicitud de Adopción'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
