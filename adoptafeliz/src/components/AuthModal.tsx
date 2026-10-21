import React, { useState } from 'react';
import { X, Lock, Mail, User, Phone, MapPin, Sparkles, CheckCircle2 } from 'lucide-react';
import { Usuario } from '../types';
import { api } from '../services/api';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: Usuario) => void;
  onToast: (type: 'success' | 'error' | 'info', message: string, title?: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  onToast
}) => {
  if (!isOpen) return null;

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [loading, setLoading] = useState(false);

  // Form states
  const [loginEmail, setLoginEmail] = useState('jv325867@gmail.com');
  const [loginPassword, setLoginPassword] = useState('12345');

  const [registerData, setRegisterData] = useState({
    nombre: '',
    correo: '',
    contrasena: '',
    telefono: '',
    ubicacion: 'Ciudad de México',
    bio: 'Adoptante responsable'
  });

  const demoAccounts = [
    { email: 'jv325867@gmail.com', pass: '12345', label: 'Jorge Adán', role: 'Adoptante' },
    { email: 'yoel@gmail.com', pass: '12345', label: 'Yoel', role: 'Adoptante' },
    { email: '2022452121@teschi.edu.mx', pass: '654321', label: 'agripino jose', role: 'Rescatista' }
  ];

  const handleDemoSelect = (email: string, pass: string) => {
    setLoginEmail(email);
    setLoginPassword(pass);
    setMode('login');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const user = await api.login(loginEmail, loginPassword);
      onSuccess(user);
      onToast('success', `¡Bienvenido de nuevo, ${user.nombre || user.correo}!`, 'Sesión Iniciada');
      onClose();
    } catch (err: any) {
      onToast('error', err.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!registerData.correo || !registerData.contrasena) {
      onToast('error', 'Correo y contraseña requeridos');
      return;
    }
    try {
      setLoading(true);
      const user = await api.register(registerData);
      onSuccess(user);
      onToast('success', '¡Cuenta creada y registrada en la base de datos!', 'Registro Exitoso');
      onClose();
    } catch (err: any) {
      onToast('error', err.message || 'Error al registrar cuenta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/70 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-emerald-600 to-indigo-700 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">
                {mode === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}
              </h2>
              <p className="text-xs text-emerald-100">Acceso a AdoptaFeliz con base de datos activa</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-2 rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="grid grid-cols-2 border-b border-slate-200 bg-slate-50 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setMode('login')}
            className={`py-3 text-center border-b-2 transition-all cursor-pointer ${
              mode === 'login'
                ? 'border-emerald-600 text-emerald-800 bg-white font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Ingresar
          </button>
          <button
            type="button"
            onClick={() => setMode('register')}
            className={`py-3 text-center border-b-2 transition-all cursor-pointer ${
              mode === 'register'
                ? 'border-emerald-600 text-emerald-800 bg-white font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Registrarse
          </button>
        </div>

        <div className="p-6 space-y-5 text-xs sm:text-sm">
          
          {/* Quick Demo Accounts Banner */}
          {mode === 'login' && (
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 space-y-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-amber-500" />
                Cuentas de prueba del archivo SQL (1 clic):
              </span>
              <div className="grid grid-cols-3 gap-1.5">
                {demoAccounts.map((acc, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleDemoSelect(acc.email, acc.pass)}
                    className="p-2 bg-white hover:bg-emerald-50 rounded-xl border border-slate-200 text-left transition-colors cursor-pointer text-[11px]"
                  >
                    <p className="font-bold text-slate-800 truncate">{acc.label}</p>
                    <p className="text-slate-400 text-[10px]">{acc.role}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {mode === 'login' ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Correo Electrónico</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="ejemplo@correo.com"
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Contraseña</label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••"
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 bg-white font-mono"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer disabled:opacity-50"
              >
                {loading ? 'Verificando...' : 'Iniciar Sesión'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Nombre Completo</label>
                <input
                  type="text"
                  required
                  value={registerData.nombre}
                  onChange={(e) => setRegisterData({ ...registerData, nombre: e.target.value })}
                  placeholder="Tu nombre y apellido"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 bg-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Correo Electrónico *</label>
                <input
                  type="email"
                  required
                  value={registerData.correo}
                  onChange={(e) => setRegisterData({ ...registerData, correo: e.target.value })}
                  placeholder="tu@correo.com"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 bg-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Contraseña *</label>
                <input
                  type="password"
                  required
                  value={registerData.contrasena}
                  onChange={(e) => setRegisterData({ ...registerData, contrasena: e.target.value })}
                  placeholder="Crea una contraseña"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 bg-white font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Teléfono</label>
                  <input
                    type="tel"
                    value={registerData.telefono}
                    onChange={(e) => setRegisterData({ ...registerData, telefono: e.target.value })}
                    placeholder="55..."
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 bg-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Ubicación</label>
                  <input
                    type="text"
                    value={registerData.ubicacion}
                    onChange={(e) => setRegisterData({ ...registerData, ubicacion: e.target.value })}
                    placeholder="Ciudad o zona"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 bg-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer disabled:opacity-50 mt-2"
              >
                {loading ? 'Creando cuenta...' : 'Crear Cuenta y Guardar en BD'}
              </button>
            </form>
          )}

        </div>

      </div>
    </div>
  );
};
