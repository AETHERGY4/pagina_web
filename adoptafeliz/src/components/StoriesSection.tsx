import React, { useState } from 'react';
import { HISTORIAS_EXITO, HistoriaExito } from '../data/mockData';
import { Heart, Quote, Sparkles, Send } from 'lucide-react';

interface StoriesSectionProps {
  onToast: (type: 'success' | 'error' | 'info', message: string, title?: string) => void;
}

export const StoriesSection: React.FC<StoriesSectionProps> = ({ onToast }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [newStory, setNewStory] = useState({
    nombreMascota: '',
    nombreAdoptante: '',
    tiempo: 'Adoptado hace 1 mes',
    historia: '',
    cita: ''
  });

  const handleSubmitStory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStory.nombreMascota || !newStory.historia) {
      onToast('error', 'Por favor llena los campos requeridos.');
      return;
    }
    setModalOpen(false);
    onToast('success', '¡Gracias por compartir tu testimonio! Ha sido enviado para ser publicado en la comunidad.', 'Historia Recibida');
    setNewStory({ nombreMascota: '', nombreAdoptante: '', tiempo: 'Adoptado hace 1 mes', historia: '', cita: '' });
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div>
          <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-100 text-rose-800">
            Finales Felices
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-3 font-display">
            Historias que Transforman Vidas
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-1 max-w-xl">
            Cada mascota rescatada tiene un pasado que superar y un futuro brillante por escribir junto a su nueva familia.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          <span>Compartir mi Historia de Adopción</span>
        </button>
      </div>

      {/* Stories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {HISTORIAS_EXITO.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="relative h-56 overflow-hidden bg-slate-100">
                <img
                  src={item.foto}
                  alt={item.mascota}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/mascotas_adopcion_1.jpg';
                  }}
                />
                <div className="absolute top-3 right-3 px-3 py-1 bg-white/95 backdrop-blur-md rounded-full text-xs font-bold text-emerald-800 shadow-sm">
                  {item.tiempo}
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-2xl font-black text-slate-900 font-display">
                    {item.mascota}
                  </h3>
                  <span className="text-xs font-semibold text-slate-500">
                    Familia: {item.adoptante}
                  </span>
                </div>

                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                  {item.historia}
                </p>

                <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-100 relative">
                  <Quote className="w-4 h-4 text-emerald-600 mb-1 opacity-70" />
                  <p className="text-xs font-medium italic text-emerald-900 leading-relaxed">
                    "{item.cita}"
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 pt-0 flex items-center justify-between text-xs text-slate-400 border-t border-slate-100 mt-2">
              <span className="flex items-center gap-1 text-rose-500 font-semibold">
                <Heart className="w-3.5 h-3.5 fill-current" /> Adopción Verificada
              </span>
              <span>Chimalhuacán / CDMX</span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for sharing story */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 text-xs sm:text-sm border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              Comparte tu Historia de Adopción
            </h3>
            <p className="text-slate-500 text-xs mb-4">
              Inspira a otras familias a darle una oportunidad a un animal rescatado.
            </p>

            <form onSubmit={handleSubmitStory} className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Nombre de la Mascota *</label>
                  <input
                    type="text"
                    required
                    value={newStory.nombreMascota}
                    onChange={(e) => setNewStory({ ...newStory, nombreMascota: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-slate-900 bg-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Tu Nombre o Familia</label>
                  <input
                    type="text"
                    value={newStory.nombreAdoptante}
                    onChange={(e) => setNewStory({ ...newStory, nombreAdoptante: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-slate-900 bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Relato de la Adopción *</label>
                <textarea
                  rows={3}
                  required
                  value={newStory.historia}
                  onChange={(e) => setNewStory({ ...newStory, historia: e.target.value })}
                  placeholder="¿Cómo llegó a sus vidas? ¿Cómo fue su proceso de adaptación?..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-slate-900 bg-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Una Frase o Mensaje para la Comunidad</label>
                <input
                  type="text"
                  value={newStory.cita}
                  onChange={(e) => setNewStory({ ...newStory, cita: e.target.value })}
                  placeholder="Ej. Adoptar es cambiar dos vidas a la vez..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-slate-900 bg-white"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md cursor-pointer flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  Enviar Testimonio
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
