import React, { useState } from 'react';
import { X, CreditCard, ShieldCheck, CheckCircle2, Lock, ArrowRight, Wallet, ShoppingBag } from 'lucide-react';
import { CartItem, Usuario, Pago } from '../types';
import { api } from '../services/api';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  currentUser: Usuario | null;
  onSuccess: (pago: Pago) => void;
  onToast: (type: 'success' | 'error' | 'info', message: string, title?: string) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cart,
  currentUser,
  onSuccess,
  onToast
}) => {
  if (!isOpen) return null;

  const [loading, setLoading] = useState(false);
  const [completedPago, setCompletedPago] = useState<Pago | null>(null);

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal >= 50.0 || subtotal === 0 ? 0 : 5.0;
  const total = subtotal + shipping;

  const [formData, setFormData] = useState({
    nombre: currentUser?.nombre || 'Jorge adan vazquez gomez',
    email: currentUser?.correo || 'jv325867@gmail.com',
    direccion: currentUser?.ubicacion || 'calle jarrito, Chimalhuacán',
    metodo_pago: 'tarjeta',
    numeroTarjeta: '•••• •••• •••• 4242',
    expiracion: '12/28',
    cvv: '•••'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nombre || !formData.email || !formData.direccion) {
      onToast('error', 'Por favor ingresa tu nombre, correo y dirección de envío.');
      return;
    }

    try {
      setLoading(true);
      const itemsPayload = cart.map((i) => ({
        id: i.product.id,
        name: i.product.name,
        price: i.product.price,
        image: i.product.image,
        quantity: i.quantity
      }));

      const res = await api.checkout({
        nombre: formData.nombre,
        email: formData.email,
        direccion: formData.direccion,
        metodo_pago: formData.metodo_pago,
        total: Number(total.toFixed(2)),
        productos: itemsPayload
      });

      setCompletedPago(res.pago);
      onSuccess(res.pago);
      onToast('success', '¡Compra registrada correctamente en la tabla `pagos`!', 'Pago Exitoso');
    } catch (err: any) {
      onToast('error', err.message || 'Error al procesar el pago.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/70 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[92vh] flex flex-col overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-700 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Pasarela de Pago Solidario</h2>
              <p className="text-xs text-emerald-100">Guarda registro directo en la base de datos MySQL (tabla <code className="font-mono bg-white/20 px-1 rounded">pagos</code>)</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-2 rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success screen */}
        {completedPago ? (
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <h3 className="text-2xl font-bold text-slate-900">¡Pago Registrado con Éxito!</h3>
              <p className="text-slate-600 text-sm mt-1 max-w-md mx-auto">
                Tu orden ha sido guardada en la base de datos con el identificador{' '}
                <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200">
                  ID #{completedPago.id}
                </span>
              </p>
            </div>

            {/* Recibo Box */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-left text-xs max-w-md mx-auto space-y-2">
              <div className="flex justify-between pb-2 border-b border-slate-200">
                <span className="text-slate-500">Cliente</span>
                <span className="font-semibold text-slate-800">{completedPago.nombre}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-slate-200">
                <span className="text-slate-500">Correo Electrónico</span>
                <span className="font-mono text-slate-800">{completedPago.email}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-slate-200">
                <span className="text-slate-500">Dirección</span>
                <span className="text-slate-800 text-right">{completedPago.direccion}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-slate-200">
                <span className="text-slate-500">Método de Pago</span>
                <span className="font-semibold text-slate-800 capitalize">{completedPago.metodo_pago}</span>
              </div>
              <div className="flex justify-between pt-1 text-sm font-bold">
                <span className="text-slate-800">Total Facturado</span>
                <span className="text-emerald-700">${Number(completedPago.total).toFixed(2)} USD</span>
              </div>
            </div>

            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={onClose}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
              >
                Volver a la Tienda
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 text-xs sm:text-sm">
            
            {/* Order summary banner */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 font-medium">Resumen del Pedido</p>
                <p className="text-xs text-slate-700 font-semibold">{cart.length} productos solidarios</p>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 block">Total a pagar</span>
                <span className="text-xl font-black text-emerald-700">${total.toFixed(2)} USD</span>
              </div>
            </div>

            {/* Customer Details */}
            <div className="space-y-3">
              <h4 className="font-bold text-slate-900 border-b border-slate-100 pb-1.5">
                1. Datos del Comprador
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Nombre Completo *</label>
                  <input
                    type="text"
                    required
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 bg-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Correo Electrónico *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Dirección de Envío *</label>
                <input
                  type="text"
                  required
                  value={formData.direccion}
                  onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
                  placeholder="Calle, número, colonia, código postal"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 bg-white"
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="space-y-3 pt-2">
              <h4 className="font-bold text-slate-900 border-b border-slate-100 pb-1.5">
                2. Método de Pago
              </h4>

              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'tarjeta', label: 'Tarjeta Crédito/Débito', icon: CreditCard },
                  { id: 'paypal', label: 'PayPal Seguro', icon: Wallet },
                  { id: 'transferencia', label: 'Transferencia SPEI', icon: Lock }
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, metodo_pago: item.id })}
                      className={`p-3 rounded-xl border text-center flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                        formData.metodo_pago === item.id
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-800 font-bold'
                          : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-[11px] leading-tight">{item.label}</span>
                    </button>
                  );
                })}
              </div>

              {formData.metodo_pago === 'tarjeta' && (
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2.5">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">Número de Tarjeta</label>
                    <input
                      type="text"
                      value={formData.numeroTarjeta}
                      onChange={(e) => setFormData({ ...formData, numeroTarjeta: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 font-mono text-xs bg-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">Expiración</label>
                      <input
                        type="text"
                        value={formData.expiracion}
                        onChange={(e) => setFormData({ ...formData, expiracion: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-200 font-mono text-xs bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">CVV</label>
                      <input
                        type="password"
                        value={formData.cvv}
                        onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-200 font-mono text-xs bg-white"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="pt-2 flex items-center justify-between border-t border-slate-100">
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <Lock className="w-3.5 h-3.5 text-emerald-600" />
                <span>Transacción segura y encriptada</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold text-xs hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/30 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {loading ? 'Guardando en BD...' : `Confirmar y Pagar $${total.toFixed(2)}`}
                </button>
              </div>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
