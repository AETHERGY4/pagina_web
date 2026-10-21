import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PetCard } from './components/PetCard';
import { PetModal } from './components/PetModal';
import { AdoptionFormModal } from './components/AdoptionFormModal';
import { StoreSection } from './components/StoreSection';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { PublishPetModal } from './components/PublishPetModal';
import { ServicesSection } from './components/ServicesSection';
import { StoriesSection } from './components/StoriesSection';
import { DatabasePanel } from './components/DatabasePanel';
import { DeploymentModal } from './components/DeploymentModal';
import { AuthModal } from './components/AuthModal';
import { UserProfileModal } from './components/UserProfileModal';
import { Footer } from './components/Footer';
import { ToastContainer, ToastMessage } from './components/Toast';

import { api } from './services/api';
import { Mascota, Usuario, CartItem, Producto, Pago, DatabaseStatus } from './types';
import { STORE_PRODUCTS } from './data/mockData';
import { Search, Filter, Sparkles, Heart, ArrowRight, ShieldCheck, Home, CheckCircle2, PawPrint } from 'lucide-react';

export default function App() {
  // Navigation
  const [currentTab, setCurrentTab] = useState<'inicio' | 'adoptar' | 'tienda' | 'servicios' | 'historias' | 'database'>('inicio');

  // Application Data
  const [mascotas, setMascotas] = useState<Mascota[]>([]);
  const [loadingPets, setLoadingPets] = useState(true);
  const [dbStatus, setDbStatus] = useState<DatabaseStatus | null>(null);

  // User & Auth State
  const [currentUser, setCurrentUser] = useState<Usuario | null>(() => {
    const saved = localStorage.getItem('adoptafeliz_user');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    // Default test user from SQL dump (Jorge Adan)
    return {
      id: 1,
      correo: 'jv325867@gmail.com',
      nombre: 'Jorge Adan',
      telefono: '5551234567',
      ubicacion: 'Ciudad de México',
      bio: 'Amante de los perros'
    };
  });

  // Cart & Favorites
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('adoptafeliz_cart');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    // Default 1 item in cart from SQL payments
    return [{ product: STORE_PRODUCTS[0], quantity: 1 }];
  });

  const [favorites, setFavorites] = useState<number[]>(() => {
    const saved = localStorage.getItem('adoptafeliz_favs');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return [1]; // Canelo as favorite by default
  });

  // Modals state
  const [selectedPetForModal, setSelectedPetForModal] = useState<Mascota | null>(null);
  const [selectedPetForAdoption, setSelectedPetForAdoption] = useState<Mascota | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isPublishOpen, setIsPublishOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isDeployGuideOpen, setIsDeployGuideOpen] = useState(false);

  // Filters state for adoption catalog
  const [filterEspecie, setFilterEspecie] = useState<string>('todos');
  const [filterEdad, setFilterEdad] = useState<string>('todos');
  const [filterTamano, setFilterTamano] = useState<string>('todos');
  const [petSearch, setPetSearch] = useState<string>('');

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: 'success' | 'error' | 'info', message: string, title?: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, message, title }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Sync state to localStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('adoptafeliz_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('adoptafeliz_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('adoptafeliz_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('adoptafeliz_favs', JSON.stringify(favorites));
  }, [favorites]);

  // Load pets and DB status
  const loadInitialData = async () => {
    try {
      setLoadingPets(true);
      const [petsData, statusData] = await Promise.all([
        api.getMascotas(),
        api.getDbStatus().catch(() => null)
      ]);
      setMascotas(petsData);
      if (statusData) setDbStatus(statusData);
    } catch (err: any) {
      console.error('Failed to load initial data:', err);
    } finally {
      setLoadingPets(false);
    }
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  // Cart operations
  const handleAddToCart = (product: Producto) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    addToast('success', `${product.name} añadido al carrito solidario.`, 'Producto Agregado');
  };

  const handleUpdateCartQuantity = (id: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.product.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveFromCart = (id: string) => {
    setCart((prev) => prev.filter((i) => i.product.id !== id));
  };

  const handleCheckoutSuccess = (_pago: Pago) => {
    setCart([]);
    setIsCheckoutOpen(false);
    // Reload status to reflect new order in DB
    api.getDbStatus().then(setDbStatus).catch(() => {});
  };

  const handleToggleFavorite = (id: number) => {
    setFavorites((prev) => {
      const exists = prev.includes(id);
      if (exists) {
        addToast('info', 'Mascota removida de tus favoritos.');
        return prev.filter((favId) => favId !== id);
      } else {
        addToast('success', '¡Añadido a tus favoritos guardados!');
        return [...prev, id];
      }
    });
  };

  // Filtered Pets
  const filteredMascotas = useMemo(() => {
    return mascotas.filter((m) => {
      const matchEspecie = filterEspecie === 'todos' || m.especie === filterEspecie;
      const matchEdad = filterEdad === 'todos' || m.edad_tipo === filterEdad;
      const matchTamano = filterTamano === 'todos' || m.tamano === filterTamano;
      const matchSearch =
        petSearch === '' ||
        m.nombre.toLowerCase().includes(petSearch.toLowerCase()) ||
        m.ubicacion.toLowerCase().includes(petSearch.toLowerCase()) ||
        m.descripcion.toLowerCase().includes(petSearch.toLowerCase()) ||
        (m.personalidad && m.personalidad.some((p) => p.toLowerCase().includes(petSearch.toLowerCase())));

      return matchEspecie && matchEdad && matchTamano && matchSearch;
    });
  }, [mascotas, filterEspecie, filterEdad, filterTamano, petSearch]);

  const featuredMascotas = useMemo(() => {
    return mascotas.slice(0, 3);
  }, [mascotas]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans selection:bg-emerald-500 selection:text-white">
      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />

      {/* Navigation Header */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        cartCount={cart.reduce((s, i) => s + i.quantity, 0)}
        favoritesCount={favorites.length}
        currentUser={currentUser}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenPublish={() => setIsPublishOpen(true)}
        onOpenDeployGuide={() => setIsDeployGuideOpen(true)}
      />

      {/* Main Content Areas */}
      <main className="flex-1">
        
        {/* TAB 1: INICIO */}
        {currentTab === 'inicio' && (
          <div className="space-y-16">
            <Hero
              onGoToAdopt={() => {
                setCurrentTab('adoptar');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onGoToStore={() => {
                setCurrentTab('tienda');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenPublish={() => setIsPublishOpen(true)}
              dbStatus={dbStatus}
            />

            {/* Mascotas Destacadas */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                <div>
                  <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800">
                    Buscando una Familia
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-2 font-display">
                    Mascotas Destacadas
                  </h2>
                  <p className="text-slate-600 text-xs sm:text-sm mt-1">
                    Conoce a algunos de nuestros amigos listos para dar y recibir amor incondicional.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setCurrentTab('adoptar');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-emerald-600 hover:text-emerald-700 transition-colors cursor-pointer group"
                >
                  <span>Ver todas las mascotas ({mascotas.length})</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredMascotas.map((m) => (
                  <PetCard
                    key={m.id}
                    mascota={m}
                    isFavorite={favorites.includes(m.id)}
                    onToggleFavorite={handleToggleFavorite}
                    onOpenDetails={(pet) => setSelectedPetForModal(pet)}
                    onStartAdoption={(pet) => setSelectedPetForAdoption(pet)}
                  />
                ))}
              </div>
            </section>

            {/* ¿Cómo Funciona la Adopción? */}
            <section className="bg-white py-16 border-y border-slate-200/80">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-12">
                  <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-100 text-indigo-800">
                    Proceso 100% Transparente
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-3 font-display">
                    ¿Cómo Funciona la Adopción?
                  </h2>
                  <p className="text-slate-600 text-sm mt-2">
                    En 3 sencillos pasos puedes transformar una vida y sumar un nuevo miembro leal a tu familia.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200/80 text-center relative group hover:shadow-lg transition-all">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold text-xl mx-auto mb-4 shadow-md shadow-emerald-600/30">
                      1
                    </div>
                    <h3 className="font-bold text-lg text-slate-900 mb-2">Explora y Conoce</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Revisa las fichas médicas, fotos y personalidad de perros, gatos o aves rescatadas que buscan hogar.
                    </p>
                  </div>

                  <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200/80 text-center relative group hover:shadow-lg transition-all">
                    <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold text-xl mx-auto mb-4 shadow-md shadow-indigo-600/30">
                      2
                    </div>
                    <h3 className="font-bold text-lg text-slate-900 mb-2">Llena la Solicitud</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Completa el formulario en línea para coordinar con el rescatista y asegurar que el hogar sea ideal.
                    </p>
                  </div>

                  <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200/80 text-center relative group hover:shadow-lg transition-all">
                    <div className="w-14 h-14 rounded-2xl bg-teal-600 text-white flex items-center justify-center font-bold text-xl mx-auto mb-4 shadow-md shadow-teal-600/30">
                      3
                    </div>
                    <h3 className="font-bold text-lg text-slate-900 mb-2">Bienvenido a Casa</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Firma el compromiso de adopción, recibe la cartilla de vacunación y comienza una nueva historia de amor.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Banner de Tienda Preview */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-gradient-to-r from-emerald-600 to-indigo-700 rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
                <div className="space-y-3 max-w-xl text-center md:text-left">
                  <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-wider text-emerald-200">
                    Compras con Impacto
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black font-display">
                    Alimenta y Cuida a tu Mascota Apoyando Rescates
                  </h3>
                  <p className="text-emerald-100 text-xs sm:text-sm leading-relaxed">
                    Las ganancias de nuestra tienda financian esterilizaciones, cirugías de emergencia y alimento para albergues registrados.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setCurrentTab('tienda');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-6 py-3.5 bg-white text-emerald-800 font-bold text-xs sm:text-sm rounded-xl shadow-lg hover:bg-emerald-50 transition-all shrink-0 cursor-pointer"
                >
                  Explorar Tienda Solidaria
                </button>
              </div>
            </section>

            {/* Banner Rescatistas */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
              <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <PawPrint className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white">¿Rescataste a un animal y necesitas encontrarle hogar?</h4>
                    <p className="text-slate-400 text-xs sm:text-sm mt-1">
                      Publica su ficha de forma gratuita para que miles de familias de nuestra comunidad puedan verlo.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsPublishOpen(true)}
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all shrink-0 cursor-pointer"
                >
                  Publicar Mascota Ahora
                </button>
              </div>
            </section>
          </div>
        )}

        {/* TAB 2: ADOPTAR */}
        {currentTab === 'adoptar' && (
          <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            {/* Header */}
            <div className="text-center max-w-2xl mx-auto">
              <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800">
                Catálogo de Adopción
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-3 font-display">
                Encuentra a tu Compañero Ideal
              </h2>
              <p className="text-slate-600 text-sm mt-2">
                Todos nuestros animales se entregan con protocolo de salud verificado y cartilla médica.
              </p>
            </div>

            {/* Filter Bar */}
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {/* Search query */}
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={petSearch}
                    onChange={(e) => setPetSearch(e.target.value)}
                    placeholder="Buscar por nombre, ciudad, carácter..."
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs sm:text-sm text-slate-900"
                  />
                </div>

                {/* Especie */}
                <div>
                  <select
                    value={filterEspecie}
                    onChange={(e) => setFilterEspecie(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs sm:text-sm text-slate-700 bg-white"
                  >
                    <option value="todos">Todas las Especies</option>
                    <option value="perro">Perros</option>
                    <option value="gato">Gatos</option>
                    <option value="ave">Aves</option>
                    <option value="otro">Otros animales</option>
                  </select>
                </div>

                {/* Edad */}
                <div>
                  <select
                    value={filterEdad}
                    onChange={(e) => setFilterEdad(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs sm:text-sm text-slate-700 bg-white"
                  >
                    <option value="todos">Cualquier Edad</option>
                    <option value="cachorro">Cachorros (&lt; 1 año)</option>
                    <option value="joven">Jóvenes (1 a 3 años)</option>
                    <option value="adulto">Adultos (3 a 7 años)</option>
                    <option value="senior">Senior (7+ años)</option>
                  </select>
                </div>

                {/* Tamaño */}
                <div>
                  <select
                    value={filterTamano}
                    onChange={(e) => setFilterTamano(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs sm:text-sm text-slate-700 bg-white"
                  >
                    <option value="todos">Cualquier Tamaño</option>
                    <option value="Pequeño">Pequeño</option>
                    <option value="Mediano">Mediano</option>
                    <option value="Grande">Grande</option>
                  </select>
                </div>
              </div>

              {/* Active Results Summary */}
              <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                <span>
                  Mostrando <strong className="text-slate-800">{filteredMascotas.length}</strong> mascotas disponibles
                </span>

                {(filterEspecie !== 'todos' || filterEdad !== 'todos' || filterTamano !== 'todos' || petSearch !== '') && (
                  <button
                    onClick={() => {
                      setFilterEspecie('todos');
                      setFilterEdad('todos');
                      setFilterTamano('todos');
                      setPetSearch('');
                    }}
                    className="text-emerald-700 font-semibold hover:underline cursor-pointer"
                  >
                    Limpiar filtros
                  </button>
                )}
              </div>
            </div>

            {/* Pets Grid */}
            {loadingPets ? (
              <div className="py-20 text-center text-slate-400">
                <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                <p>Cargando catálogo desde la base de datos...</p>
              </div>
            ) : filteredMascotas.length === 0 ? (
              <div className="py-16 text-center bg-white rounded-3xl border border-slate-200 p-8">
                <Heart className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="font-bold text-slate-700 text-lg">No encontramos coincidencias</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  Prueba cambiando los filtros de búsqueda o restablece para ver todas las mascotas.
                </p>
                <button
                  onClick={() => {
                    setFilterEspecie('todos');
                    setFilterEdad('todos');
                    setFilterTamano('todos');
                    setPetSearch('');
                  }}
                  className="mt-4 px-4 py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl cursor-pointer"
                >
                  Ver Todos
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMascotas.map((m) => (
                  <PetCard
                    key={m.id}
                    mascota={m}
                    isFavorite={favorites.includes(m.id)}
                    onToggleFavorite={handleToggleFavorite}
                    onOpenDetails={(pet) => setSelectedPetForModal(pet)}
                    onStartAdoption={(pet) => setSelectedPetForAdoption(pet)}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: TIENDA */}
        {currentTab === 'tienda' && (
          <StoreSection
            onAddToCart={handleAddToCart}
            onOpenCart={() => setIsCartOpen(true)}
            cartCount={cart.reduce((s, i) => s + i.quantity, 0)}
          />
        )}

        {/* TAB 4: SERVICIOS */}
        {currentTab === 'servicios' && (
          <ServicesSection onToast={addToast} />
        )}

        {/* TAB 5: HISTORIAS */}
        {currentTab === 'historias' && (
          <StoriesSection onToast={addToast} />
        )}

        {/* TAB 6: BASE DE DATOS */}
        {currentTab === 'database' && (
          <DatabasePanel
            onSelectUserForLogin={(user) => {
              setCurrentUser(user);
              addToast('success', `Sesión iniciada como ${user.nombre || user.correo} (Usuario #${user.id})`, 'Usuario Conectado');
            }}
            onOpenDeployGuide={() => setIsDeployGuideOpen(true)}
            onToast={addToast}
          />
        )}

      </main>

      {/* Footer */}
      <Footer
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenDeployGuide={() => setIsDeployGuideOpen(true)}
      />

      {/* ALL MODALS */}
      
      {/* 1. Pet Details Modal */}
      <PetModal
        mascota={selectedPetForModal}
        isOpen={Boolean(selectedPetForModal)}
        onClose={() => setSelectedPetForModal(null)}
        onStartAdoption={(pet) => {
          setSelectedPetForModal(null);
          setSelectedPetForAdoption(pet);
        }}
        isFavorite={selectedPetForModal ? favorites.includes(selectedPetForModal.id) : false}
        onToggleFavorite={handleToggleFavorite}
      />

      {/* 2. Adoption Application Modal */}
      <AdoptionFormModal
        mascota={selectedPetForAdoption}
        currentUser={currentUser}
        isOpen={Boolean(selectedPetForAdoption)}
        onClose={() => setSelectedPetForAdoption(null)}
        onSuccess={(petName) => {
          addToast('success', `Tu solicitud de adopción para ${petName} fue enviada y registrada en la base de datos.`, '¡Solicitud Registrada!');
          loadInitialData();
        }}
        onToast={addToast}
      />

      {/* 3. Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onOpenCheckout={() => setIsCheckoutOpen(true)}
      />

      {/* 4. Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        currentUser={currentUser}
        onSuccess={handleCheckoutSuccess}
        onToast={addToast}
      />

      {/* 5. Publish Pet Modal */}
      <PublishPetModal
        isOpen={isPublishOpen}
        onClose={() => setIsPublishOpen(false)}
        currentUser={currentUser}
        onSuccess={(newPet) => {
          setMascotas((prev) => [newPet, ...prev]);
          setCurrentTab('adoptar');
        }}
        onToast={addToast}
      />

      {/* 6. Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={(user) => setCurrentUser(user)}
        onToast={addToast}
      />

      {/* 7. User Profile Modal */}
      <UserProfileModal
        user={currentUser}
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        onLogout={() => {
          setCurrentUser(null);
          addToast('info', 'Has cerrado sesión.');
        }}
        onUpdateUser={(updated) => setCurrentUser(updated)}
        onToast={addToast}
      />

      {/* 8. Server Deployment Guide Modal */}
      <DeploymentModal
        isOpen={isDeployGuideOpen}
        onClose={() => setIsDeployGuideOpen(false)}
      />

    </div>
  );
}
