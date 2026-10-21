import React, { useEffect, useState } from 'react';
import { Database, Download, RefreshCw, Server, Users, CreditCard, Heart, FileText, CheckCircle2, ShieldAlert } from 'lucide-react';
import { api } from '../services/api';
import { Usuario, Pago, Mascota, SolicitudAdopcion, DatabaseStatus } from '../types';

interface DatabasePanelProps {
  onSelectUserForLogin: (usuario: Usuario) => void;
  onOpenDeployGuide: () => void;
  onToast: (type: 'success' | 'error' | 'info', message: string, title?: string) => void;
}

export const DatabasePanel: React.FC<DatabasePanelProps> = ({
  onSelectUserForLogin,
  onOpenDeployGuide,
  onToast
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTable, setActiveTable] = useState<'usuarios' | 'pagos' | 'mascotas' | 'solicitudes'>('usuarios');
  const [status, setStatus] = useState<DatabaseStatus | null>(null);
  const [tables, setTables] = useState<{
    usuarios: Usuario[];
    pagos: Pago[];
    mascotas: Mascota[];
    solicitudes: SolicitudAdopcion[];
  }>({
    usuarios: [],
    pagos: [],
    mascotas: [],
    solicitudes: []
  });

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await api.getDbTables();
      setStatus(data.status);
      setTables(data.tables);
    } catch (err: any) {
      onToast('error', err.message || 'Error al conectar con la base de datos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleReset = async () => {
    if (!window.confirm('¿Deseas restaurar la base de datos al estado del archivo SQL original proporcionado?')) {
      return;
    }
    try {
      const msg = await api.resetDatabase();
      onToast('success', msg, 'Base de datos restaurada');
      await loadData();
    } catch (err: any) {
      onToast('error', err.message);
    }
  };

  const handleDownloadSql = () => {
    window.open('/api/db/export-sql', '_blank');
    onToast('info', 'Descargando archivo adoptafelizdb.sql...', 'Exportación SQL');
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Banner de estado de la Base de Datos */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-700/80 mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2.5 text-emerald-400 font-semibold text-xs tracking-wider uppercase mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              Base de Datos Conectada y Activa
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Panel de Control de Base de Datos (<code className="text-emerald-400 font-mono">adoptafelizdb</code>)
            </h2>
            <p className="text-slate-300 text-sm mt-2 max-w-2xl">
              Esquema sincronizado desde tu archivo <span className="text-emerald-300 font-mono font-medium">adoptafelizdb__2__0d2b1f1f.sql</span> con persistencia en tiempo real para compras, adopciones y usuarios.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleDownloadSql}
              className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              Descargar Dump SQL (.sql)
            </button>

            <button
              onClick={onOpenDeployGuide}
              className="flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-medium rounded-xl border border-white/20 backdrop-blur-sm transition-all cursor-pointer"
            >
              <Server className="w-4 h-4 text-emerald-400" />
              Pasos para Subir a Servidor
            </button>

            <button
              onClick={handleReset}
              title="Restaurar a datos originales del SQL"
              className="p-2.5 bg-white/5 hover:bg-rose-500/20 text-slate-300 hover:text-rose-300 rounded-xl border border-white/10 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Metricas rápidas */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-700/60">
          <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
            <div className="flex items-center gap-2 text-slate-400 text-xs font-medium mb-1">
              <Users className="w-3.5 h-3.5 text-emerald-400" />
              Tabla `usuarios`
            </div>
            <div className="text-2xl font-bold text-white">
              {tables.usuarios.length} <span className="text-xs text-slate-400 font-normal">registrados</span>
            </div>
          </div>

          <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
            <div className="flex items-center gap-2 text-slate-400 text-xs font-medium mb-1">
              <CreditCard className="w-3.5 h-3.5 text-cyan-400" />
              Tabla `pagos`
            </div>
            <div className="text-2xl font-bold text-white">
              {tables.pagos.length} <span className="text-xs text-slate-400 font-normal">órdenes</span>
            </div>
          </div>

          <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
            <div className="flex items-center gap-2 text-slate-400 text-xs font-medium mb-1">
              <Heart className="w-3.5 h-3.5 text-rose-400" />
              Mascotas
            </div>
            <div className="text-2xl font-bold text-white">
              {tables.mascotas.length} <span className="text-xs text-slate-400 font-normal">fichas</span>
            </div>
          </div>

          <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
            <div className="flex items-center gap-2 text-slate-400 text-xs font-medium mb-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
              Total Tienda
            </div>
            <div className="text-2xl font-bold text-emerald-300">
              ${(status?.stats.totalRecaudado || 0).toFixed(2)} <span className="text-xs text-slate-400 font-normal">USD</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navegador de Tablas */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50/70 overflow-x-auto gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTable('usuarios')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTable === 'usuarios'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <Users className="w-4 h-4" />
              usuarios ({tables.usuarios.length})
            </button>

            <button
              onClick={() => setActiveTable('pagos')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTable === 'pagos'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <CreditCard className="w-4 h-4" />
              pagos ({tables.pagos.length})
            </button>

            <button
              onClick={() => setActiveTable('mascotas')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTable === 'mascotas'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <Heart className="w-4 h-4" />
              mascotas ({tables.mascotas.length})
            </button>

            <button
              onClick={() => setActiveTable('solicitudes')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTable === 'solicitudes'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <FileText className="w-4 h-4" />
              solicitudes_adopcion ({tables.solicitudes.length})
            </button>
          </div>

          <button
            onClick={loadData}
            disabled={loading}
            className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 transition-colors shrink-0 cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            Recargar
          </button>
        </div>

        {/* Tabla Usuarios */}
        {activeTable === 'usuarios' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100/70 text-slate-600 font-semibold border-b border-slate-200 uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4">ID</th>
                  <th className="py-3 px-4">Correo</th>
                  <th className="py-3 px-4">Nombre</th>
                  <th className="py-3 px-4">Teléfono</th>
                  <th className="py-3 px-4">Ubicación</th>
                  <th className="py-3 px-4">Bio / Rol</th>
                  <th className="py-3 px-4 text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {tables.usuarios.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-mono text-slate-500 font-medium">#{u.id}</td>
                    <td className="py-3 px-4 font-medium text-slate-900">{u.correo}</td>
                    <td className="py-3 px-4 text-slate-700">{u.nombre || <span className="text-slate-400 italic">Sin nombre</span>}</td>
                    <td className="py-3 px-4 font-mono text-slate-600">{u.telefono || '—'}</td>
                    <td className="py-3 px-4 text-slate-600">{u.ubicacion || '—'}</td>
                    <td className="py-3 px-4 text-slate-600 max-w-xs truncate">{u.bio || '—'}</td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => onSelectUserForLogin(u)}
                        className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-medium text-xs rounded-lg border border-emerald-200 transition-colors cursor-pointer"
                      >
                        Iniciar como este usuario
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tabla Pagos */}
        {activeTable === 'pagos' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100/70 text-slate-600 font-semibold border-b border-slate-200 uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4">ID</th>
                  <th className="py-3 px-4">Cliente</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Dirección</th>
                  <th className="py-3 px-4">Método</th>
                  <th className="py-3 px-4">Total</th>
                  <th className="py-3 px-4">Productos</th>
                  <th className="py-3 px-4">Fecha</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {tables.pagos.map((p) => {
                  let itemsCount = 0;
                  try {
                    const parsed = JSON.parse(p.productos);
                    itemsCount = Array.isArray(parsed) ? parsed.length : 1;
                  } catch {
                    itemsCount = 1;
                  }
                  return (
                    <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-4 font-mono text-slate-500 font-medium">#{p.id}</td>
                      <td className="py-3 px-4 font-medium text-slate-900">{p.nombre}</td>
                      <td className="py-3 px-4 text-slate-600 font-mono text-xs">{p.email}</td>
                      <td className="py-3 px-4 text-slate-600">{p.direccion}</td>
                      <td className="py-3 px-4">
                        <span className="inline-block px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md font-medium text-[11px] capitalize">
                          {p.metodo_pago}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-bold text-emerald-600">${Number(p.total).toFixed(2)}</td>
                      <td className="py-3 px-4 text-slate-600">
                        <span className="font-semibold text-slate-800">{itemsCount}</span> artículos
                      </td>
                      <td className="py-3 px-4 font-mono text-xs text-slate-500">{p.fecha}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Tabla Mascotas */}
        {activeTable === 'mascotas' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100/70 text-slate-600 font-semibold border-b border-slate-200 uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4">Mascota</th>
                  <th className="py-3 px-4">Especie</th>
                  <th className="py-3 px-4">Edad / Tamaño</th>
                  <th className="py-3 px-4">Salud</th>
                  <th className="py-3 px-4">Rescatista</th>
                  <th className="py-3 px-4">Ubicación</th>
                  <th className="py-3 px-4">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {tables.mascotas.map((m) => (
                  <tr key={m.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img src={m.foto} alt={m.nombre} className="w-9 h-9 rounded-xl object-cover" />
                        <div>
                          <p className="font-bold text-slate-900">{m.nombre}</p>
                          <span className="text-[11px] text-slate-400 font-mono">#{m.id}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 capitalize font-medium text-slate-700">{m.especie}</td>
                    <td className="py-3 px-4 text-slate-600">{m.edad} • {m.tamano}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-1 text-[11px]">
                        {m.vacunado && <span className="bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded border border-emerald-200">Vacunado</span>}
                        {m.esterilizado && <span className="bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded border border-blue-200">Esterilizado</span>}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-600">{m.rescatista_nombre}</td>
                    <td className="py-3 px-4 text-slate-500">{m.ubicacion}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${
                        m.estado === 'disponible'
                          ? 'bg-emerald-100 text-emerald-800'
                          : m.estado === 'en_proceso'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-slate-200 text-slate-700'
                      }`}>
                        {m.estado === 'disponible' ? 'Disponible' : m.estado === 'en_proceso' ? 'En Trámite' : 'Adoptado'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tabla Solicitudes */}
        {activeTable === 'solicitudes' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100/70 text-slate-600 font-semibold border-b border-slate-200 uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4">ID</th>
                  <th className="py-3 px-4">Mascota</th>
                  <th className="py-3 px-4">Solicitante</th>
                  <th className="py-3 px-4">Contacto</th>
                  <th className="py-3 px-4">Vivienda</th>
                  <th className="py-3 px-4">Estado</th>
                  <th className="py-3 px-4">Fecha</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {tables.solicitudes.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-slate-400">
                      Aún no se han enviado solicitudes de adopción.
                    </td>
                  </tr>
                ) : (
                  tables.solicitudes.map((s) => (
                    <tr key={s.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-4 font-mono text-slate-500">#{s.id}</td>
                      <td className="py-3 px-4 font-bold text-slate-900">{s.mascota_nombre}</td>
                      <td className="py-3 px-4 font-medium text-slate-800">{s.solicitante_nombre}</td>
                      <td className="py-3 px-4 text-xs font-mono text-slate-600">{s.solicitante_email} • {s.telefono}</td>
                      <td className="py-3 px-4 text-slate-600">{s.tipo_vivienda}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 capitalize">
                          {s.estado}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-mono text-xs text-slate-500">{s.fecha}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </section>
  );
};
