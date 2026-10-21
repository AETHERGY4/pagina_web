import React, { useState } from 'react';
import { SERVICIOS, Servicio } from '../data/mockData';
import { Stethoscope, Truck, Scissors, HeartPulse, Check, Phone, Calendar, ArrowRight } from 'lucide-react';

interface ServicesSectionProps {
  onToast: (type: 'success' | 'error' | 'info', message: string, title?: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onToast }) => {
  const [selectedService, setSelectedService] = useState<Servicio | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [bookingData, setBookingData] = useState({
    nombre: '',
    telefono: '',
    fecha: '',
    mascotaTipo: 'Perro',
    motivo: ''
  });

  const getIcon = (name: string) => {
    switch (name) {
      case 'Stethoscope': return Stethoscope;
      case 'Truck': return Truck;
      case 'Scissors': return Scissors;
      default: return HeartPulse;
    }
  };

  const handleBook = (srv: Servicio) => {
    setSelectedService(srv);
    setModalOpen(true);
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingData.nombre || !bookingData.telefono) {
      onToast('error', 'Por favor ingresa tu nombre y teléfono para agendar.');
      return;
    }
    setModalOpen(false);
    onToast('success', `Cita para ${selectedService?.titulo} agendada. Nuestro equipo veterinario te contactará por WhatsApp al ${bookingData.telefono}.`, 'Cita Agendada');
    setBookingData({ nombre: '', telefono: '', fecha: '', mascotaTipo: 'Perro', motivo: '' });
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800">
          Atención Integral y Preventiva
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-3 font-display">
          Servicios Veterinarios Solidarios
        </h2>
        <p className="text-slate-600 text-sm sm:text-base mt-2">
          Brindamos servicios médicos de la más alta calidad con tarifas accesibles, esterilizaciones a bajo costo y atención a domicilio.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {SERVICIOS.map((srv) => {
          const Icon = getIcon(srv.icono);
          return (
            <div
              key={srv.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Photo Header */}
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <img
                    src={srv.imagen}
                    alt={srv.titulo}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/servicios_mascotas.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-emerald-600 rounded-xl">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-200">
                        {srv.categoria}
                      </span>
                    </div>
                    <span className="text-xs font-bold bg-white/20 backdrop-blur-md px-3 py-1 rounded-full">
                      Desde {srv.precioDesde}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors mb-2">
                    {srv.titulo}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                    {srv.descripcion}
                  </p>

                  <div className="space-y-2 border-t border-slate-100 pt-4">
                    <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">Incluye:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                      {srv.incluye.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom CTA */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => handleBook(srv)}
                  className="w-full py-3 bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white font-bold text-xs rounded-xl border border-emerald-200 hover:border-transparent transition-all flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Agendar Cita o Consulta</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Booking Modal */}
      {modalOpen && selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 text-xs sm:text-sm border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              Agendar: {selectedService.titulo}
            </h3>
            <p className="text-slate-500 text-xs mb-4">
              Ingresa tus datos para coordinar horario con la clínica veterinaria.
            </p>

            <form onSubmit={handleConfirmBooking} className="space-y-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Tu Nombre Completo *</label>
                <input
                  type="text"
                  required
                  value={bookingData.nombre}
                  onChange={(e) => setBookingData({ ...bookingData, nombre: e.target.value })}
                  placeholder="Ej. Jorge Adán"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-slate-900 bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Teléfono / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    value={bookingData.telefono}
                    onChange={(e) => setBookingData({ ...bookingData, telefono: e.target.value })}
                    placeholder="55..."
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-slate-900 bg-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Tipo de Mascota</label>
                  <select
                    value={bookingData.mascotaTipo}
                    onChange={(e) => setBookingData({ ...bookingData, mascotaTipo: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-slate-900 bg-white"
                  >
                    <option value="Perro">Perro</option>
                    <option value="Gato">Gato</option>
                    <option value="Ave">Ave</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Fecha preferida</label>
                <input
                  type="date"
                  value={bookingData.fecha}
                  onChange={(e) => setBookingData({ ...bookingData, fecha: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-slate-900 bg-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Motivo o Síntomas</label>
                <textarea
                  rows={2}
                  value={bookingData.motivo}
                  onChange={(e) => setBookingData({ ...bookingData, motivo: e.target.value })}
                  placeholder="Vacunación, esterilización, chequeo general..."
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
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md cursor-pointer"
                >
                  Confirmar Cita
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
