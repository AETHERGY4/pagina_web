import React from 'react';
import { Heart, Mail, Phone, MapPin, Database, Server, Shield } from 'lucide-react';

interface FooterProps {
  onSelectTab: (tab: 'inicio' | 'adoptar' | 'tienda' | 'servicios' | 'historias' | 'database') => void;
  onOpenDeployGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab, onOpenDeployGuide }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800 text-xs sm:text-sm">
          
          {/* Column 1: Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/images/logo.png"
                alt="AdoptaFeliz"
                className="h-10 w-auto object-contain brightness-0 invert"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/PG.png';
                }}
              />
              <span className="text-xl font-black text-white font-display">
                Adopta<span className="text-emerald-400">Feliz</span>
              </span>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed">
              Plataforma comunitaria dedicada al rescate, rehabilitación y adopción responsable de animales en situación de calle o abandono en México.
            </p>

            <div className="pt-2 flex items-center gap-2 text-emerald-400 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Base de Datos MySQL Sincronizada</span>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase text-xs tracking-wider">Navegación</h4>
            <ul className="space-y-2 text-slate-400 text-xs">
              <li>
                <button onClick={() => onSelectTab('inicio')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  Inicio
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('adoptar')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  Mascotas en Adopción
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('tienda')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  Tienda Solidaria
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('servicios')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  Servicios Veterinarios
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('historias')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  Historias de Éxito
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('database')} className="hover:text-emerald-400 transition-colors cursor-pointer flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Explorador de Base de Datos</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase text-xs tracking-wider">Contacto & Refugio</h4>
            <ul className="space-y-2.5 text-slate-400 text-xs">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Chimalhuacán, Estado de México & CDMX</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-mono">contacto@adoptafeliz.org</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-mono">+52 (55) 5123-4567</span>
              </li>
              <li className="pt-1">
                <button
                  onClick={onOpenDeployGuide}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Server className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Pasos para Servidor Web</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Ethics */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase text-xs tracking-wider">Compromiso Ético</h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              No fomentamos el comercio de animales. Todas las mascotas son entregadas bajo contrato de adopción responsable con esquema veterinario y compromiso de esterilización.
            </p>
            <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/60 text-[11px] text-slate-300 flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Transacciones de tienda auditadas y encriptadas</span>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} AdoptaFeliz. Todos los derechos reservados.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-300 transition-colors cursor-pointer">Privacidad</span>
            <span>•</span>
            <span className="hover:text-slate-300 transition-colors cursor-pointer">Términos y Condiciones</span>
            <span>•</span>
            <span className="hover:text-slate-300 transition-colors cursor-pointer">Cookies</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
