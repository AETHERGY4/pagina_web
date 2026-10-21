import React, { useState, useEffect } from 'react';
import { X, User, Phone, MapPin, Mail, LogOut, PackageCheck, Heart, Save, CreditCard } from 'lucide-react';
import { Usuario, Pago, SolicitudAdopcion } from '../types';
import { api } from '../services/api';

interface UserProfileModalProps {
  user: Usuario | null;
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
  onUpdateUser: (updated: Usuario) => void;
  onToast: (type: 'success' | 'error' | 'info', message: string, title?: string) => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  user,
  isOpen,
  onClose,
  onLogout,
  onUpdateUser,
  onToast
}) => {
  if (!isOpen || !user) return null;

  const [activeTab, setActiveTab] = useState<'perfil' | 'pedidos' | 'adopciones'>('perfil');
  const [loading, setLoading] = useState(false);
  const [pedidos, setPedidos] = useState<Pago[]>([]);
  const [solicitudes, setSolicitudes] = useState<SolicitudAdopcion[]>([]);

  const [profileData, setProfileData] = useState({
    nombre: user.nombre || '',
    telefono: user.telefono || '',
    ubicacion: user.ubicacion || '',
    bio: user.bio || '',
    nuevaContrasena: ''
  });

  useEffect(() => {
    if (user) {
      setProfileData({
        nombre: user.nombre || '',
        telefono: user.telefono || '',
        ubicacion: user.ubicacion || '',
        bio: user.bio || '',
        nuevaContrasena: ''
      });

      // Load user purchases & requests
      api.getPagos(user.correo).then(setPedidos).catch(() => {});
      api.getSolicitudes(user.correo).then(setSolicitudes).catch(() => {});
    }
  }, [user]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const updates: any = {
        nombre: profileData.nombre,
        telefono: profileData.telefono,
        ubicacion: profileData.ubicacion,
        bio: profileData.bio
      };
      if (profileData.nuevaContrasena) {
        updates.contrasena = profileData.nuevaContrasena;
      }

      const updated = await api.updateUsuario(user.id, updates);
      onUpdateUser(updated);
      onToast('success', 'Tus datos fueron actualizados en la base de datos.', 'Perfil Guardado');
    } catch (err: any) {
      onToast('error', err.message || 'Error al actualizar perfil');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/70 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-700 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-xl font-bold">
              {user.nombre ? user.nombre[0].toUpperCase() : user.correo[0].toUpperCase()}
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{user.nombre || 'Mi Perfil'}</h2>
              <p className="text-xs text-emerald-100 font-mono">{user.correo}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onLogout();
                onClose();
              }}
              title="Cerrar sesión"
              className="px-3 py-1.5 bg-white/10 hover:bg-rose-500/80 text-white text-xs font-semibold rounded-xl border border-white/20 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Salir</span>
            </button>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white p-2 rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="grid grid-cols-3 border-b border-slate-200 bg-slate-50 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('perfil')}
            className={`py-3 text-center border-b-2 transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'perfil'
                ? 'border-emerald-600 text-emerald-800 bg-white font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            Mis Datos
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('pedidos')}
            className={`py-3 text-center border-b-2 transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'pedidos'
                ? 'border-emerald-600 text-emerald-800 bg-white font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5" />
            Mis Compras ({pedidos.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('adopciones')}
            className={`py-3 text-center border-b-2 transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'adopciones'
                ? 'border-emerald-600 text-emerald-800 bg-white font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Heart className="w-3.5 h-3.5" />
            Mis Solicitudes ({solicitudes.length})
          </button>
        </div>

        {/* Tab 1: Mis Datos */}
        {activeTab === 'perfil' && (
          <form onSubmit={handleSaveProfile} className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Nombre Completo</label>
                <input
                  type="text"
                  value={profileData.nombre}
                  onChange={(e) => setProfileData({ ...profileData, nombre: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 bg-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Correo (No modificable)</label>
                <input
                  type="text"
                  disabled
                  value={user.correo}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-100 text-slate-500 font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Teléfono</label>
                <input
                  type="tel"
                  value={profileData.telefono}
                  onChange={(e) => setProfileData({ ...profileData, telefono: e.target.value })}
                  placeholder="Número de contacto"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 bg-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Ubicación / Ciudad</label>
                <input
                  type="text"
                  value={profileData.ubicacion}
                  onChange={(e) => setProfileData({ ...profileData, ubicacion: e.target.value })}
                  placeholder="Ciudad o municipio"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Biografía o Nota de Rescatista / Adoptante</label>
              <textarea
                rows={2}
                value={profileData.bio}
                onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                placeholder="Cuéntanos un poco sobre ti..."
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 bg-white"
              />
            </div>

            <div className="pt-2 border-t border-slate-100">
              <label className="block font-semibold text-slate-700 mb-1">Cambiar Contraseña (Opcional)</label>
              <input
                type="password"
                value={profileData.nuevaContrasena}
                onChange={(e) => setProfileData({ ...profileData, nuevaContrasena: e.target.value })}
                placeholder="Dejar en blanco para mantener la actual"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 bg-white font-mono"
              />
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                {loading ? 'Guardando...' : 'Actualizar Datos en BD'}
              </button>
            </div>
          </form>
        )}

        {/* Tab 2: Mis Compras (pagos) */}
        {activeTab === 'pedidos' && (
          <div className="p-6 overflow-y-auto space-y-3">
            {pedidos.length === 0 ? (
              <div className="py-12 text-center text-slate-400">
                <PackageCheck className="w-12 h-12 mx-auto mb-2 text-slate-300" />
                <p className="font-semibold text-slate-600">Aún no registras compras asociadas a este correo.</p>
                <p className="text-xs text-slate-400 mt-1">Explora la Tienda Solidaria para apoyar a los refugios.</p>
              </div>
            ) : (
              pedidos.map((p) => {
                let items: any[] = [];
                try {
                  items = JSON.parse(p.productos);
                } catch {}
                return (
                  <div key={p.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs space-y-2">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                      <div>
                        <span className="font-bold text-slate-900 text-sm">Orden #{p.id}</span>
                        <span className="text-slate-400 ml-2 font-mono">{p.fecha}</span>
                      </div>
                      <span className="text-emerald-700 font-bold text-sm">${Number(p.total).toFixed(2)} USD</span>
                    </div>

                    <div className="space-y-1">
                      {items.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-slate-600">
                          <span>{item.quantity}x {item.name}</span>
                          <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between pt-1 text-[11px] text-slate-400">
                      <span>Destino: {p.direccion}</span>
                      <span className="capitalize">Método: {p.metodo_pago}</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* Tab 3: Mis Solicitudes de Adopcion */}
        {activeTab === 'adopciones' && (
          <div className="p-6 overflow-y-auto space-y-3">
            {solicitudes.length === 0 ? (
              <div className="py-12 text-center text-slate-400">
                <Heart className="w-12 h-12 mx-auto mb-2 text-slate-300" />
                <p className="font-semibold text-slate-600">No tienes solicitudes de adopción registradas.</p>
                <p className="text-xs text-slate-400 mt-1">Encuentra a tu compañero en la sección Adoptar.</p>
              </div>
            ) : (
              solicitudes.map((s) => (
                <div key={s.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-900 text-sm">Solicitud para {s.mascota_nombre}</h4>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 capitalize">
                      {s.estado}
                    </span>
                  </div>
                  <p className="text-slate-600 text-xs">Vivienda: {s.tipo_vivienda}</p>
                  {s.motivo_adopcion && (
                    <p className="text-slate-500 italic text-[11px]">"{s.motivo_adopcion}"</p>
                  )}
                  <p className="text-[10px] text-slate-400 font-mono pt-1">Registrado el {s.fecha}</p>
                </div>
              ))
            )}
          </div>
        )}

      </div>
    </div>
  );
};
