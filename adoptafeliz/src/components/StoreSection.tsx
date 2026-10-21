import React, { useState, useMemo } from 'react';
import { ShoppingBag, Star, Search, Filter, Plus, Check, ShieldCheck } from 'lucide-react';
import { STORE_PRODUCTS } from '../data/mockData';
import { Producto } from '../types';

interface StoreSectionProps {
  onAddToCart: (product: Producto) => void;
  onOpenCart: () => void;
  cartCount: number;
}

export const StoreSection: React.FC<StoreSectionProps> = ({
  onAddToCart,
  onOpenCart,
  cartCount
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  const categories = [
    { id: 'todos', label: 'Todos los Productos' },
    { id: 'Alimento', label: 'Alimento & Nutrición' },
    { id: 'Accesorios', label: 'Accesorios & Paseo' },
    { id: 'Camas', label: 'Camas & Rascadores' },
    { id: 'Juguetes', label: 'Juguetes Interactivos' },
    { id: 'Higiene', label: 'Higiene & Salud' }
  ];

  const filteredProducts = useMemo(() => {
    return STORE_PRODUCTS.filter((prod) => {
      const matchesCat = selectedCategory === 'todos' || prod.category === selectedCategory;
      const matchesSearch =
        searchQuery === '' ||
        prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prod.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [selectedCategory, searchQuery, sortBy]);

  const handleAdd = (prod: Producto) => {
    onAddToCart(prod);
    setAddedIds((prev) => ({ ...prev, [prod.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [prod.id]: false }));
    }, 1500);
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Hero Tienda */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-emerald-700 via-teal-700 to-indigo-800 text-white p-8 sm:p-12 mb-10 shadow-xl">
        <div className="relative z-10 max-w-2xl">
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md text-emerald-200 inline-block mb-3">
            100% de Ganancias Destinadas a Rescates
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Tienda Solidaria AdoptaFeliz
          </h2>
          <p className="text-emerald-100 text-sm sm:text-base mt-2 leading-relaxed">
            Cada compra de alimento, accesorios o juguetes apoya directamente las cuentas veterinarias, alimento y refugio de animales en recuperación.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenCart}
              className="flex items-center gap-2.5 px-5 py-2.5 bg-white text-emerald-800 font-bold text-xs sm:text-sm rounded-xl shadow-lg hover:bg-emerald-50 transition-all cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-emerald-700" />
              Ver Carrito ({cartCount} artículos)
            </button>
            <div className="flex items-center gap-2 text-xs text-emerald-200">
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              <span>Envío seguro a todo el país • Pagos protegidos</span>
            </div>
          </div>
        </div>
      </div>

      {/* Controls & Filters Bar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-8 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        {/* Categories Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search & Sort */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar productos..."
              className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs sm:text-sm text-slate-800"
            />
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="py-2 px-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs text-slate-700 bg-white"
            >
              <option value="featured">Destacados</option>
              <option value="price-asc">Precio: Menor a Mayor</option>
              <option value="price-desc">Precio: Mayor a Menor</option>
              <option value="rating">Mejor Calificados</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((prod) => (
          <div
            key={prod.id}
            className="group bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
          >
            <div>
              {/* Image */}
              <div className="relative aspect-square overflow-hidden bg-slate-100 p-4 flex items-center justify-center">
                <img
                  src={prod.image}
                  alt={prod.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/productos_tienda.jpg';
                  }}
                />
                <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-slate-900/80 text-white backdrop-blur-sm">
                  {prod.category}
                </span>
              </div>

              {/* Details */}
              <div className="p-5">
                <div className="flex items-center gap-1 text-amber-400 text-xs mb-1.5">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span className="font-bold text-slate-700">{prod.rating.toFixed(1)}</span>
                  <span className="text-slate-400 font-normal">({prod.reviewsCount})</span>
                </div>

                <h3 className="font-bold text-slate-900 text-sm leading-snug group-hover:text-emerald-700 transition-colors line-clamp-2 mb-2">
                  {prod.name}
                </h3>

                <p className="text-slate-500 text-xs line-clamp-2 leading-relaxed">
                  {prod.description}
                </p>
              </div>
            </div>

            {/* Bottom Price & Button */}
            <div className="p-5 pt-0 flex items-center justify-between border-t border-slate-100 mt-2">
              <div>
                <span className="text-[11px] text-slate-400 uppercase font-semibold block">Precio</span>
                <span className="text-lg font-extrabold text-slate-900">${prod.price.toFixed(2)}</span>
              </div>

              <button
                onClick={() => handleAdd(prod)}
                className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl font-bold text-xs transition-all shadow-sm cursor-pointer ${
                  addedIds[prod.id]
                    ? 'bg-emerald-700 text-white'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white hover:shadow-md'
                }`}
              >
                {addedIds[prod.id] ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    ¡Agregado!
                  </>
                ) : (
                  <>
                    <Plus className="w-3.5 h-3.5" />
                    Agregar
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
