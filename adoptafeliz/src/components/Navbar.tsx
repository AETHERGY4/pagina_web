import React, { useState } from 'react';
import {
  Menu,
  X,
  ShoppingBag,
  Heart,
  Database,
  Server,
  User,
  PlusCircle,
  HelpCircle,
  Phone
} from 'lucide-react';
import { Usuario } from '../types';

interface NavbarProps {
  currentTab: 'inicio' | 'adoptar' | 'tienda' | 'servicios' | 'historias' | 'database';
  onSelectTab: (tab: 'inicio' | 'adoptar' | 'tienda' | 'servicios' | 'historias' | 'database') => void;
  cartCount: number;
  favoritesCount: number;
  currentUser: Usuario | null;
  onOpenCart: () => void;
  onOpenAuth: () => void;
  onOpenProfile: () => void;
  onOpenPublish: () => void;
  onOpenDeployGuide: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  cartCount,
  favoritesCount,
  currentUser,
  onOpenCart,
  onOpenAuth,
  onOpenProfile,
  onOpenPublish,
  onOpenDeployGuide
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { id: 'inicio' | 'adoptar' | 'tienda' | 'servicios' | 'historias' | 'database'; label: string }[] = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'adoptar', label: 'Adoptar Mascotas' },
    { id: 'tienda', label: 'Tienda Solidaria' },
    { id: 'servicios', label: 'Servicios Veterinarios' },
    { id: 'historias', label: 'Historias de Éxito' },
    { id: 'database', label: 'Base de Datos' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <div
            onClick={() => onSelectTab('inicio')}
            className="flex items-center gap-3 cursor-pointer group shrink-0"
          >
            <div className="relative">
              <img
                src="/images/logo.png"
                alt="AdoptaFeliz"
                className="h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/PG.png';
                }}
              />
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight text-emerald-600 font-display">
                Adopta<span className="text-indigo-600">Feliz</span>
              </span>
              <span className="block text-[10px] text-slate-500 font-semibold tracking-wider uppercase -mt-1">
                Adopción & Bienestar Animal
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = currentTab === link.id;
              const isDb = link.id === 'database';
              return (
                <button
                  key={link.id}
                  onClick={() => onSelectTab(link.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs xl:text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-700 shadow-2xs font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  {isDb && <Database className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-600' : 'text-indigo-600'}`} />}
                  {link.label}
                  {isDb && (
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Deploy server guide button */}
            <button
              onClick={onOpenDeployGuide}
              title="Pasos para subir a un servidor (VPS, MySQL, cPanel)"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200 transition-all cursor-pointer"
            >
              <Server className="w-3.5 h-3.5" />
              <span>Subir a Servidor</span>
            </button>

            {/* Publicar mascota */}
            <button
              onClick={onOpenPublish}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm shadow-emerald-600/20 hover:shadow-md transition-all cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Publicar Mascota</span>
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Abrir carrito"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-emerald-600 text-white text-[11px] font-black flex items-center justify-center shadow-md animate-in zoom-in-50">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User Profile / Login */}
            {currentUser ? (
              <button
                onClick={onOpenProfile}
                className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl border border-slate-200 hover:border-emerald-500 bg-white shadow-2xs transition-all cursor-pointer"
              >
                <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                  {currentUser.nombre ? currentUser.nombre[0].toUpperCase() : currentUser.correo[0].toUpperCase()}
                </div>
                <div className="text-left text-xs">
                  <p className="font-bold text-slate-800 leading-tight max-w-[90px] truncate">
                    {currentUser.nombre ? currentUser.nombre.split(' ')[0] : 'Mi Cuenta'}
                  </p>
                  <p className="text-[10px] text-emerald-600 font-semibold leading-tight">BD Conectada</p>
                </div>
              </button>
            ) : (
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <User className="w-3.5 h-3.5 text-slate-500" />
                <span>Iniciar Sesión</span>
              </button>
            )}
          </div>

          {/* Mobile hamburger */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenCart}
              className="relative p-2 rounded-xl text-slate-700 hover:bg-slate-100"
              aria-label="Abrir carrito"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Alternar menú"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-3">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                onSelectTab(link.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-colors text-left ${
                currentTab === link.id
                  ? 'bg-emerald-50 text-emerald-800 font-bold'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span>{link.label}</span>
              {link.id === 'database' && (
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-100 text-emerald-800 font-mono">
                  MySQL Activa
                </span>
              )}
            </button>
          ))}

          <div className="pt-3 border-t border-slate-100 space-y-2">
            <button
              onClick={() => {
                onOpenPublish();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 bg-emerald-600 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Publicar Mascota para Adopción</span>
            </button>

            <button
              onClick={() => {
                onOpenDeployGuide();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 bg-indigo-50 border border-indigo-200 text-indigo-700 rounded-xl font-bold text-xs flex items-center justify-center gap-2"
            >
              <Server className="w-4 h-4" />
              <span>Guía para Subir a Servidor</span>
            </button>

            {currentUser ? (
              <button
                onClick={() => {
                  onOpenProfile();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 border border-slate-200 text-slate-800 rounded-xl font-semibold text-xs flex items-center justify-center gap-2"
              >
                <User className="w-4 h-4 text-emerald-600" />
                <span>Mi Perfil ({currentUser.nombre || currentUser.correo})</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  onOpenAuth();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 border border-slate-200 text-slate-800 rounded-xl font-semibold text-xs flex items-center justify-center gap-2"
              >
                <User className="w-4 h-4 text-slate-500" />
                <span>Iniciar Sesión / Registrarse</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
