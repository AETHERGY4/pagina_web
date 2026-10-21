import { Usuario, Pago, Mascota, SolicitudAdopcion, DatabaseStatus } from '../types';

export const api = {
  // Database status & info
  async getDbStatus(): Promise<DatabaseStatus> {
    const res = await fetch('/api/db/status');
    const json = await res.json();
    if (!json.success) throw new Error(json.error || 'Error al obtener estado de BD');
    return json.data;
  },

  async getDbTables(): Promise<{ status: DatabaseStatus; tables: { usuarios: Usuario[]; pagos: Pago[]; mascotas: Mascota[]; solicitudes: SolicitudAdopcion[] } }> {
    const res = await fetch('/api/db/tables');
    const json = await res.json();
    if (!json.success) throw new Error(json.error || 'Error al inspeccionar tablas');
    return json.data;
  },

  async resetDatabase(): Promise<string> {
    const res = await fetch('/api/db/reset', { method: 'POST' });
    const json = await res.json();
    if (!json.success) throw new Error(json.error || 'Error al resetear base de datos');
    return json.message;
  },

  // Auth
  async login(correo: string, contrasena: string): Promise<Usuario> {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ correo, contrasena })
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.error || 'Credenciales inválidas');
    return json.user;
  },

  async register(data: { correo: string; contrasena: string; nombre?: string; telefono?: string; ubicacion?: string; bio?: string }): Promise<Usuario> {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.error || 'Error al registrar usuario');
    return json.user;
  },

  async updateUsuario(id: number, updates: Partial<Usuario> & { contrasena?: string }): Promise<Usuario> {
    const res = await fetch(`/api/usuarios/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.error || 'Error al actualizar perfil');
    return json.user;
  },

  // Pagos / Checkout
  async getPagos(email?: string): Promise<Pago[]> {
    const url = email ? `/api/pagos?email=${encodeURIComponent(email)}` : '/api/pagos';
    const res = await fetch(url);
    const json = await res.json();
    if (!json.success) throw new Error(json.error || 'Error al obtener pagos');
    return json.data;
  },

  async checkout(data: {
    nombre: string;
    email: string;
    direccion: string;
    metodo_pago: string;
    total: number;
    productos: any[];
  }): Promise<{ message: string; pago: Pago }> {
    const res = await fetch('/api/pagos/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.error || 'Error al procesar pago');
    return { message: json.message, pago: json.data };
  },

  // Mascotas
  async getMascotas(params?: { especie?: string; edad_tipo?: string; q?: string }): Promise<Mascota[]> {
    const query = new URLSearchParams();
    if (params?.especie) query.set('especie', params.especie);
    if (params?.edad_tipo) query.set('edad_tipo', params.edad_tipo);
    if (params?.q) query.set('q', params.q);

    const res = await fetch(`/api/mascotas?${query.toString()}`);
    const json = await res.json();
    if (!json.success) throw new Error(json.error || 'Error al obtener mascotas');
    return json.data;
  },

  async createMascota(mascota: Partial<Mascota>): Promise<Mascota> {
    const res = await fetch('/api/mascotas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(mascota)
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.error || 'Error al publicar mascota');
    return json.data;
  },

  // Solicitudes de Adopcion
  async getSolicitudes(email?: string): Promise<SolicitudAdopcion[]> {
    const url = email ? `/api/adopciones?email=${encodeURIComponent(email)}` : '/api/adopciones';
    const res = await fetch(url);
    const json = await res.json();
    if (!json.success) throw new Error(json.error || 'Error al obtener solicitudes');
    return json.data;
  },

  async createSolicitud(data: Partial<SolicitudAdopcion>): Promise<{ message: string; solicitud: SolicitudAdopcion }> {
    const res = await fetch('/api/adopciones', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.error || 'Error al registrar solicitud');
    return { message: json.message, solicitud: json.data };
  }
};
