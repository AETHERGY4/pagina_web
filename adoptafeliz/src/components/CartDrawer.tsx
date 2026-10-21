import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onOpenCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onOpenCheckout
}) => {
  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 50.0;
  const missingForFree = Math.max(0, freeShippingThreshold - subtotal);
  const shipping = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 5.0;
  const total = subtotal + shipping;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="px-6 py-5 bg-gradient-to-r from-emerald-600 to-teal-700 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-emerald-200" />
              <h2 className="text-lg font-bold text-white">Tu Carrito Solidario</h2>
              <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-white/20">
                {cart.reduce((s, i) => s + i.quantity, 0)}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Alert */}
          {cart.length > 0 && (
            <div className="bg-emerald-50 px-6 py-3 border-b border-emerald-100 text-xs">
              {missingForFree === 0 ? (
                <p className="text-emerald-800 font-bold flex items-center gap-1.5">
                  🎉 ¡Felicidades! Tienes Envío Gratis para este pedido.
                </p>
              ) : (
                <p className="text-emerald-700 font-medium">
                  Agrega <span className="font-bold text-emerald-900">${missingForFree.toFixed(2)}</span> más para obtener <strong>Envío Gratis</strong>
                </p>
              )}
            </div>
          )}

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                  <ShoppingBag className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="font-bold text-slate-700 text-base mb-1">Tu carrito está vacío</h3>
                <p className="text-xs text-slate-500 max-w-xs mb-6">
                  Explora la tienda y agrega productos. Con cada compra salvas vidas y apoyas a rescatistas.
                </p>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 bg-emerald-600 text-white font-semibold text-xs rounded-xl shadow-md hover:bg-emerald-700 transition-colors cursor-pointer"
                >
                  Ver Productos
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 items-center"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 rounded-xl object-cover bg-white p-1 border border-slate-200 shrink-0"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/productos_tienda.jpg';
                    }}
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900 truncate">
                      {item.product.name}
                    </h4>
                    <p className="text-xs font-bold text-emerald-600 mt-0.5">
                      ${item.product.price.toFixed(2)}
                    </p>

                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center border border-slate-200 bg-white rounded-lg overflow-hidden">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, -1)}
                          className="p-1 hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer"
                          aria-label="Disminuir"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-semibold text-slate-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, 1)}
                          className="p-1 hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer"
                          aria-label="Aumentar"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-slate-400 hover:text-rose-600 p-1 transition-colors cursor-pointer ml-auto"
                        aria-label="Eliminar"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cart.length > 0 && (
            <div className="p-6 bg-slate-50 border-t border-slate-200 space-y-4">
              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-900">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Envío</span>
                  <span className="font-semibold text-slate-900">
                    {shipping === 0 ? <span className="text-emerald-600 font-bold">Gratis</span> : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-slate-900 pt-2 border-t border-slate-200">
                  <span>Total</span>
                  <span className="text-emerald-700">${total.toFixed(2)} USD</span>
                </div>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onOpenCheckout();
                }}
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-2xl shadow-lg shadow-emerald-600/30 hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceder al Pago Seguro</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Registrado directamente en la base de datos MySQL/MariaDB</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
