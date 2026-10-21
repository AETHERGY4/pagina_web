export interface Usuario {
  id: number;
  correo: string;
  nombre: string | null;
  telefono: string | null;
  ubicacion: string | null;
  bio: string | null;
}

export interface Producto {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  reviewsCount: number;
  description: string;
  inStock: boolean;
  featured?: boolean;
}

export interface CartItem {
  product: Producto;
  quantity: number;
}

export interface Pago {
  id: number;
  nombre: string;
  email: string;
  direccion: string;
  metodo_pago: string;
  total: number;
  productos: string; // JSON string
  fecha: string;
}

export interface Mascota {
  id: number;
  nombre: string;
  especie: 'perro' | 'gato' | 'ave' | 'otro';
  edad: string;
  edad_tipo: 'cachorro' | 'joven' | 'adulto' | 'senior';
  genero: 'Macho' | 'Hembra';
  tamano: 'Pequeño' | 'Mediano' | 'Grande';
  descripcion: string;
  foto: string;
  galeria: string[];
  personalidad: string[];
  vacunado: boolean;
  desparasitado: boolean;
  esterilizado: boolean;
  chip: boolean;
  ubicacion: string;
  urgente?: boolean;
  estado: 'disponible' | 'en_proceso' | 'adoptado';
  rescatista_nombre: string;
  fecha_publicacion: string;
}

export interface SolicitudAdopcion {
  id: number;
  mascota_id: number;
  mascota_nombre: string;
  solicitante_nombre: string;
  solicitante_email: string;
  telefono: string;
  direccion: string;
  tipo_vivienda: string;
  tiene_mascotas: boolean;
  descripcion_hogar: string;
  motivo_adopcion: string;
  estado: 'pendiente' | 'aprobada' | 'rechazada';
  fecha: string;
}

export interface DatabaseStatus {
  dbType: string;
  connected: boolean;
  stats: {
    usuarios: number;
    pagos: number;
    mascotas: number;
    solicitudes: number;
    totalRecaudado: number;
  };
  dataFile: string;
  schemaSource: string;
}
