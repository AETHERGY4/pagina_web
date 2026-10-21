import fs from 'node:fs';
import path from 'node:path';

export interface Usuario {
  id: number;
  correo: string;
  contrasena: string;
  nombre: string | null;
  telefono: string | null;
  ubicacion: string | null;
  bio: string | null;
}

export interface ProductoPago {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface Pago {
  id: number;
  nombre: string;
  email: string;
  direccion: string;
  metodo_pago: string;
  total: number;
  productos: string; // JSON string in SQL
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

export interface DatabaseSchema {
  usuarios: Usuario[];
  pagos: Pago[];
  mascotas: Mascota[];
  solicitudes: SolicitudAdopcion[];
}

const DATA_DIR = path.resolve(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'adoptafeliz_db.json');

const INITIAL_USUARIOS: Usuario[] = [
  { id: 1, correo: 'jv325867@gmail.com', contrasena: '12345', nombre: 'Jorge Adan', telefono: '5551234567', ubicacion: 'Ciudad de México', bio: 'Amante de los perros' },
  { id: 4, correo: 'yoel@gmail.com', contrasena: '12345', nombre: 'Yoel', telefono: '55665734', ubicacion: 'calle juarez', bio: 'adoptante' },
  { id: 5, correo: '2022452129@teschi.edu.mx', contrasena: '123456789', nombre: 'Jorge vazquez gomez', telefono: '5531391379', ubicacion: 'calle mariano', bio: 'me gustan los perro' },
  { id: 7, correo: 'luis27@gmail.com', contrasena: '12345678', nombre: 'Luis', telefono: '5583729379', ubicacion: 'calla serrada faipedro', bio: 'me gustan los gatos' },
  { id: 8, correo: 'andres17.tolentino@gmail.com', contrasena: 'regina2418', nombre: 'Jose Andres', telefono: '5548324298', ubicacion: 'calle moneda', bio: 'me gustan los perros' },
  { id: 10, correo: '2022452121@teschi.edu.mx', contrasena: '654321', nombre: 'agripino jose', telefono: '55823283', ubicacion: 'calle lomas', bio: 'soy rescatista' },
  { id: 11, correo: 'jorge4556@gmail.com', contrasena: '4321', nombre: 'Jorge R.', telefono: null, ubicacion: null, bio: null },
  { id: 12, correo: '2022453421@teschi.edu.mx', contrasena: '12345', nombre: 'Estudiante Teschi', telefono: null, ubicacion: null, bio: null },
  { id: 13, correo: 'joseflorez@gmail.com', contrasena: '123456', nombre: 'Jose Florez', telefono: null, ubicacion: null, bio: null },
  { id: 14, correo: '4545@teschi.edu.mx', contrasena: 'renegul', nombre: 'Rene G.', telefono: null, ubicacion: null, bio: null }
];

const INITIAL_PAGOS: Pago[] = [
  {
    id: 1,
    nombre: 'Jorge adan vazquez gomez',
    email: 'jv325867@gmail.com',
    direccion: 'calle jarrito',
    metodo_pago: 'tarjeta',
    total: 89.96,
    productos: JSON.stringify([
      { id: '1', name: 'Alimento Premium para Perros Adultos', price: 45.99, image: '/images/productos_tienda.jpg', quantity: 1 },
      { id: '2', name: 'Collar Ajustable con Placa ID', price: 18.99, image: '/images/accesorios_mascotas.webp', quantity: 2 }
    ]),
    fecha: '2025-06-27 08:29:18'
  },
  {
    id: 2,
    nombre: 'Jorge adan vazquez gomez',
    email: 'jv325867@gmail.com',
    direccion: 'calle jarrito',
    metodo_pago: 'tarjeta',
    total: 70.97,
    productos: JSON.stringify([
      { id: '1', name: 'Alimento Premium para Perros Adultos', price: 45.99, image: '/images/productos_tienda.jpg', quantity: 1 },
      { id: '2', name: 'Collar Ajustable con Placa ID', price: 18.99, image: '/images/accesorios_mascotas.webp', quantity: 1 }
    ]),
    fecha: '2025-06-27 09:00:35'
  },
  {
    id: 3,
    nombre: 'Jorge adan vazquez gomez',
    email: 'jv325867@gmail.com',
    direccion: 'calle jarrito',
    metodo_pago: 'tarjeta',
    total: 120.97,
    productos: JSON.stringify([
      { id: '4', name: 'Juguete Interactivo Dispensador', price: 24.99, image: '/images/mascotas_adopcion_1.jpg', quantity: 1 },
      { id: '3', name: 'Cama Ortopédica Memory Foam', price: 89.99, image: '/images/cama_mascota.jpg', quantity: 1 }
    ]),
    fecha: '2025-06-27 09:02:47'
  },
  {
    id: 4,
    nombre: 'jose agripino',
    email: '2022452129@teschi.edu.mx',
    direccion: 'calle jarrito',
    metodo_pago: 'tarjeta',
    total: 185.95,
    productos: JSON.stringify([
      { id: '1', name: 'Alimento Premium para Perros Adultos', price: 45.99, image: '/images/productos_tienda.jpg', quantity: 1 },
      { id: '2', name: 'Collar Ajustable con Placa ID', price: 18.99, image: '/images/accesorios_mascotas.webp', quantity: 1 },
      { id: '4', name: 'Juguete Interactivo Dispensador', price: 24.99, image: '/images/mascotas_adopcion_1.jpg', quantity: 1 },
      { id: '3', name: 'Cama Ortopédica Memory Foam', price: 89.99, image: '/images/cama_mascota.jpg', quantity: 1 }
    ]),
    fecha: '2025-06-27 13:13:27'
  },
  {
    id: 5,
    nombre: 'pablo joel',
    email: 'joseflorez@gmail.com',
    direccion: 'calle jarrito',
    metodo_pago: 'tarjeta',
    total: 111.96,
    productos: JSON.stringify([
      { id: '1', name: 'Alimento Premium para Perros Adultos', price: 45.99, image: '/images/productos_tienda.jpg', quantity: 1 },
      { id: '4', name: 'Juguete Interactivo Dispensador', price: 24.99, image: '/images/mascotas_adopcion_1.jpg', quantity: 1 },
      { id: '5', name: 'Kit Completo de Higiene', price: 34.99, image: '/images/mascotas_adopcion_2.jpg', quantity: 1 }
    ]),
    fecha: '2025-06-27 13:27:37'
  },
  {
    id: 6,
    nombre: 'Jorge adan vazquez gomez',
    email: 'jv325867@gmail.com',
    direccion: 'calle jarrito',
    metodo_pago: 'tarjeta',
    total: 70.97,
    productos: JSON.stringify([
      { id: '1', name: 'Alimento Premium para Perros Adultos', price: 45.99, image: '/images/productos_tienda.jpg', quantity: 1 },
      { id: '2', name: 'Collar Ajustable con Placa ID', price: 18.99, image: '/images/accesorios_mascotas.webp', quantity: 1 }
    ]),
    fecha: '2025-06-27 15:03:48'
  }
];

const INITIAL_MASCOTAS: Mascota[] = [
  {
    id: 1,
    nombre: 'Canelo',
    especie: 'perro',
    edad: '4 meses',
    edad_tipo: 'cachorro',
    genero: 'Macho',
    tamano: 'Mediano',
    descripcion: 'Cachorro mestizo súper juguetón, cariñoso y lleno de vitalidad. Rescatado en Chimalhuacán, convive bien con niños y otras mascotas.',
    foto: '/images/Perfilmax.jpg',
    galeria: ['/images/Perfilmax.jpg', '/images/perr1.jpg', '/images/mascotas_adopcion_1.jpg'],
    personalidad: ['Juguetón', 'Sociable', 'Cariñoso', 'Apto con niños'],
    vacunado: true,
    desparasitado: true,
    esterilizado: false,
    chip: true,
    ubicacion: 'Chimalhuacán, Estado de México',
    urgente: true,
    estado: 'disponible',
    rescatista_nombre: 'agripino jose (Rescatista Teschi)',
    fecha_publicacion: '2025-06-20'
  },
  {
    id: 2,
    nombre: 'Luna',
    especie: 'gato',
    edad: '2 años',
    edad_tipo: 'adulto',
    genero: 'Hembra',
    tamano: 'Pequeño',
    descripcion: 'Gata elegante y ronroneadora, de pelaje suave. Le encantan los lugares soleados y las caricias suaves. Ideal para departamentos.',
    foto: '/images/GatoPerfil.jpg',
    galeria: ['/images/GatoPerfil.jpg', '/images/gatito1.jpg', '/images/gatito2.jpg'],
    personalidad: ['Tranquila', 'Independiente', 'Ronroneadora', 'Hogareña'],
    vacunado: true,
    desparasitado: true,
    esterilizado: true,
    chip: true,
    ubicacion: 'Ciudad de México',
    urgente: false,
    estado: 'disponible',
    rescatista_nombre: 'Jorge Adan',
    fecha_publicacion: '2025-06-22'
  },
  {
    id: 3,
    nombre: 'Max',
    especie: 'perro',
    edad: '3 años',
    edad_tipo: 'adulto',
    genero: 'Macho',
    tamano: 'Grande',
    descripcion: 'Noble y protector. Rescatado de la vía pública con desnutrición pero ahora 100% recuperado, activo y listo para caminatas.',
    foto: '/images/mascotas_adopcion_1.jpg',
    galeria: ['/images/mascotas_adopcion_1.jpg', '/images/perr1.jpg'],
    personalidad: ['Protector', 'Fiel', 'Enérgico', 'Leal'],
    vacunado: true,
    desparasitado: true,
    esterilizado: true,
    chip: true,
    ubicacion: 'Nezahualcóyotl, Edo. Mex.',
    urgente: false,
    estado: 'disponible',
    rescatista_nombre: 'Jose Andres Tolentino',
    fecha_publicacion: '2025-06-25'
  },
  {
    id: 4,
    nombre: 'Sombra',
    especie: 'gato',
    edad: '2 años',
    edad_tipo: 'joven',
    genero: 'Macho',
    tamano: 'Mediano',
    descripcion: 'Gato negro de ojos hipnóticos color ámbar. Desmitifica supersticiones: es de lo más dulce, ronronea sin parar y es muy limpio.',
    foto: '/images/Gato_NegroPerfil.jpg',
    galeria: ['/images/Gato_NegroPerfil.jpg', '/images/gatito3.jpg'],
    personalidad: ['Curioso', 'Divertido', 'Cariñoso', 'Limpio'],
    vacunado: true,
    desparasitado: true,
    esterilizado: true,
    chip: false,
    ubicacion: 'Texcoco, Edo. Mex.',
    urgente: false,
    estado: 'disponible',
    rescatista_nombre: 'Luis F.',
    fecha_publicacion: '2025-06-26'
  },
  {
    id: 5,
    nombre: 'Kiwi',
    especie: 'ave',
    edad: '1 año',
    edad_tipo: 'joven',
    genero: 'Hembra',
    tamano: 'Pequeño',
    descripcion: 'Hermosa ninfa cantora y curiosa. Rescatada de comercio informal; requiere un hogar espacioso con tiempo para interactuar.',
    foto: '/images/AvePerfil.jpg',
    galeria: ['/images/AvePerfil.jpg'],
    personalidad: ['Inteligente', 'Cantora', 'Sociable'],
    vacunado: true,
    desparasitado: true,
    esterilizado: false,
    chip: false,
    ubicacion: 'Ciudad de México',
    urgente: false,
    estado: 'disponible',
    rescatista_nombre: 'Yoel Rescates',
    fecha_publicacion: '2025-06-28'
  },
  {
    id: 6,
    nombre: 'Bella',
    especie: 'perro',
    edad: '7 años',
    edad_tipo: 'senior',
    genero: 'Hembra',
    tamano: 'Mediano',
    descripcion: 'Perrita senior con corazón de oro. Muy dulce, agradecida, calmada y educada para hacer sus necesidades afuera.',
    foto: '/images/mascotas_adopcion_2.jpg',
    galeria: ['/images/mascotas_adopcion_2.jpg'],
    personalidad: ['Senior cariñosa', 'Tranquila', 'Muy educada', 'Noble'],
    vacunado: true,
    desparasitado: true,
    esterilizado: true,
    chip: true,
    ubicacion: 'Chimalhuacán, Edo. Mex.',
    urgente: true,
    estado: 'disponible',
    rescatista_nombre: 'agripino jose',
    fecha_publicacion: '2025-06-29'
  },
  {
    id: 7,
    nombre: 'Buddy',
    especie: 'perro',
    edad: '6 meses',
    edad_tipo: 'cachorro',
    genero: 'Macho',
    tamano: 'Pequeño',
    descripcion: 'Cachorrillo simpático y curioso. Le fascina perseguir pelotas de tenis y dormir siestas en el regazo.',
    foto: '/images/mascotas_adopcion_3.jpg',
    galeria: ['/images/mascotas_adopcion_3.jpg'],
    personalidad: ['Muy activo', 'Juguetón', 'Aprende rápido'],
    vacunado: true,
    desparasitado: true,
    esterilizado: false,
    chip: true,
    ubicacion: 'Puebla / CDMX',
    urgente: false,
    estado: 'disponible',
    rescatista_nombre: 'Jorge vazquez gomez',
    fecha_publicacion: '2025-07-01'
  },
  {
    id: 8,
    nombre: 'Milo & Oliver',
    especie: 'gato',
    edad: '3 meses',
    edad_tipo: 'cachorro',
    genero: 'Macho',
    tamano: 'Pequeño',
    descripcion: 'Hermanitos inseparables rescatados de una bodega. Se entregan juntos o por separado a familias responsables.',
    foto: '/images/gatito1.jpg',
    galeria: ['/images/gatito1.jpg', '/images/gatito2.jpg', '/images/gatito3.jpg'],
    personalidad: ['Traviesos', 'Hermanos inseparables', 'Amorosos'],
    vacunado: true,
    desparasitado: true,
    esterilizado: false,
    chip: false,
    ubicacion: 'CDMX',
    urgente: false,
    estado: 'disponible',
    rescatista_nombre: 'Yoel Rescates',
    fecha_publicacion: '2025-07-02'
  }
];

const INITIAL_SOLICITUDES: SolicitudAdopcion[] = [
  {
    id: 1,
    mascota_id: 1,
    mascota_nombre: 'Canelo',
    solicitante_nombre: 'Jorge Adan',
    solicitante_email: 'jv325867@gmail.com',
    telefono: '5551234567',
    direccion: 'calle jarrito, Chimalhuacán',
    tipo_vivienda: 'Casa propia con patio cercado',
    tiene_mascotas: true,
    descripcion_hogar: 'Casa familiar con amplio jardín protegido, vivimos 3 personas.',
    motivo_adopcion: 'Buscamos un perrito cariñoso para que sea parte de nuestra familia.',
    estado: 'aprobada',
    fecha: '2025-06-28 11:20:00'
  }
];

class DatabaseService {
  private data: DatabaseSchema;
  private dbType: 'json_file_store' | 'mysql';

  constructor() {
    this.dbType = 'json_file_store';
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    if (fs.existsSync(DB_FILE)) {
      try {
        const fileContent = fs.readFileSync(DB_FILE, 'utf-8');
        this.data = JSON.parse(fileContent);
        // Ensure all arrays exist
        if (!this.data.usuarios) this.data.usuarios = [...INITIAL_USUARIOS];
        if (!this.data.pagos) this.data.pagos = [...INITIAL_PAGOS];
        if (!this.data.mascotas) this.data.mascotas = [...INITIAL_MASCOTAS];
        if (!this.data.solicitudes) this.data.solicitudes = [...INITIAL_SOLICITUDES];
      } catch (err) {
        console.error('Error reading database file, initializing defaults:', err);
        this.data = this.getDefaultData();
        this.save();
      }
    } else {
      this.data = this.getDefaultData();
      this.save();
    }
  }

  private getDefaultData(): DatabaseSchema {
    return {
      usuarios: [...INITIAL_USUARIOS],
      pagos: [...INITIAL_PAGOS],
      mascotas: [...INITIAL_MASCOTAS],
      solicitudes: [...INITIAL_SOLICITUDES]
    };
  }

  public save(): void {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(this.data, null, 2), 'utf-8');
      this.exportSqlDump();
    } catch (err) {
      console.error('Failed to save database file:', err);
    }
  }

  public exportSqlDump(): string {
    const lines: string[] = [
      '--',
      '-- Base de datos: adoptafelizdb',
      '-- Generado automáticamente por AdoptaFeliz Node Engine',
      `-- Fecha: ${new Date().toISOString()}`,
      '--',
      'SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";',
      'START TRANSACTION;',
      'SET time_zone = "+00:00";',
      '',
      'DROP TABLE IF EXISTS `solicitudes_adopcion`;',
      'DROP TABLE IF EXISTS `mascotas`;',
      'DROP TABLE IF EXISTS `pagos`;',
      'DROP TABLE IF EXISTS `usuarios`;',
      '',
      'CREATE TABLE `usuarios` (',
      '  `id` int(11) NOT NULL AUTO_INCREMENT,',
      '  `correo` varchar(255) NOT NULL UNIQUE,',
      '  `contrasena` varchar(255) NOT NULL,',
      '  `nombre` varchar(100) DEFAULT NULL,',
      '  `telefono` varchar(20) DEFAULT NULL,',
      '  `ubicacion` varchar(100) DEFAULT NULL,',
      '  `bio` text DEFAULT NULL,',
      '  PRIMARY KEY (`id`)',
      ') ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;',
      '',
      'CREATE TABLE `pagos` (',
      '  `id` int(11) NOT NULL AUTO_INCREMENT,',
      '  `nombre` varchar(100) DEFAULT NULL,',
      '  `email` varchar(100) DEFAULT NULL,',
      '  `direccion` text DEFAULT NULL,',
      '  `metodo_pago` varchar(50) DEFAULT NULL,',
      '  `total` decimal(10,2) DEFAULT NULL,',
      '  `productos` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`productos`)),',
      '  `fecha` datetime DEFAULT current_timestamp(),',
      '  PRIMARY KEY (`id`)',
      ') ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;',
      '',
      'CREATE TABLE `mascotas` (',
      '  `id` int(11) NOT NULL AUTO_INCREMENT,',
      '  `nombre` varchar(100) NOT NULL,',
      '  `especie` varchar(50) NOT NULL,',
      '  `edad` varchar(50) NOT NULL,',
      '  `edad_tipo` varchar(50) NOT NULL,',
      '  `genero` varchar(20) NOT NULL,',
      '  `tamano` varchar(20) NOT NULL,',
      '  `descripcion` text NOT NULL,',
      '  `foto` varchar(255) NOT NULL,',
      '  `personalidad` text DEFAULT NULL,',
      '  `vacunado` tinyint(1) DEFAULT 1,',
      '  `desparasitado` tinyint(1) DEFAULT 1,',
      '  `esterilizado` tinyint(1) DEFAULT 0,',
      '  `chip` tinyint(1) DEFAULT 0,',
      '  `ubicacion` varchar(100) DEFAULT NULL,',
      '  `estado` varchar(50) DEFAULT "disponible",',
      '  `rescatista_nombre` varchar(100) DEFAULT NULL,',
      '  `fecha_publicacion` date DEFAULT NULL,',
      '  PRIMARY KEY (`id`)',
      ') ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;',
      ''
    ];

    // Export usuarios
    if (this.data.usuarios.length > 0) {
      lines.push('INSERT INTO `usuarios` (`id`, `correo`, `contrasena`, `nombre`, `telefono`, `ubicacion`, `bio`) VALUES');
      const uValues = this.data.usuarios.map((u) => {
        const esc = (val: string | null) => (val === null ? 'NULL' : `'${val.replace(/'/g, "\\'")}'`);
        return `(${u.id}, ${esc(u.correo)}, ${esc(u.contrasena)}, ${esc(u.nombre)}, ${esc(u.telefono)}, ${esc(u.ubicacion)}, ${esc(u.bio)})`;
      });
      lines.push(uValues.join(',\n') + ';');
      lines.push('');
    }

    // Export pagos
    if (this.data.pagos.length > 0) {
      lines.push('INSERT INTO `pagos` (`id`, `nombre`, `email`, `direccion`, `metodo_pago`, `total`, `productos`, `fecha`) VALUES');
      const pValues = this.data.pagos.map((p) => {
        const esc = (val: string | null) => (val === null ? 'NULL' : `'${val.replace(/'/g, "\\'")}'`);
        return `(${p.id}, ${esc(p.nombre)}, ${esc(p.email)}, ${esc(p.direccion)}, ${esc(p.metodo_pago)}, ${p.total}, ${esc(p.productos)}, '${p.fecha}')`;
      });
      lines.push(pValues.join(',\n') + ';');
      lines.push('');
    }

    lines.push('COMMIT;');

    const sql = lines.join('\n');
    try {
      fs.writeFileSync(path.join(DATA_DIR, 'adoptafelizdb_export.sql'), sql, 'utf-8');
    } catch {
      // ignore
    }
    return sql;
  }

  // --- Usuarios Methods ---
  public getUsuarios(): Omit<Usuario, 'contrasena'>[] {
    return this.data.usuarios.map(({ contrasena, ...rest }) => rest);
  }

  public getUsuarioByEmail(email: string): Usuario | undefined {
    return this.data.usuarios.find((u) => u.correo.toLowerCase() === email.toLowerCase());
  }

  public getUsuarioById(id: number): Usuario | undefined {
    return this.data.usuarios.find((u) => u.id === id);
  }

  public createUsuario(user: Omit<Usuario, 'id'>): Usuario {
    const existing = this.getUsuarioByEmail(user.correo);
    if (existing) {
      throw new Error('El correo electrónico ya se encuentra registrado.');
    }
    const maxId = this.data.usuarios.reduce((max, u) => Math.max(max, u.id), 0);
    const newUsuario: Usuario = {
      id: maxId + 1,
      ...user
    };
    this.data.usuarios.push(newUsuario);
    this.save();
    return newUsuario;
  }

  public updateUsuario(id: number, updates: Partial<Omit<Usuario, 'id'>>): Usuario {
    const idx = this.data.usuarios.findIndex((u) => u.id === id);
    if (idx === -1) {
      throw new Error('Usuario no encontrado.');
    }
    this.data.usuarios[idx] = {
      ...this.data.usuarios[idx],
      ...updates
    };
    this.save();
    return this.data.usuarios[idx];
  }

  // --- Pagos Methods ---
  public getPagos(email?: string): Pago[] {
    if (email) {
      return this.data.pagos.filter((p) => p.email.toLowerCase() === email.toLowerCase());
    }
    return [...this.data.pagos].reverse();
  }

  public createPago(pago: Omit<Pago, 'id' | 'fecha'>): Pago {
    const maxId = this.data.pagos.reduce((max, p) => Math.max(max, p.id), 0);
    const now = new Date();
    const formattedDate = now.toISOString().replace('T', ' ').substring(0, 19);
    const newPago: Pago = {
      id: maxId + 1,
      ...pago,
      fecha: formattedDate
    };
    this.data.pagos.push(newPago);
    this.save();
    return newPago;
  }

  // --- Mascotas Methods ---
  public getMascotas(): Mascota[] {
    return [...this.data.mascotas];
  }

  public getMascotaById(id: number): Mascota | undefined {
    return this.data.mascotas.find((m) => m.id === id);
  }

  public createMascota(mascota: Omit<Mascota, 'id' | 'fecha_publicacion'>): Mascota {
    const maxId = this.data.mascotas.reduce((max, m) => Math.max(max, m.id), 0);
    const newMascota: Mascota = {
      id: maxId + 1,
      ...mascota,
      fecha_publicacion: new Date().toISOString().split('T')[0]
    };
    this.data.mascotas.unshift(newMascota);
    this.save();
    return newMascota;
  }

  public updateMascotaEstado(id: number, estado: 'disponible' | 'en_proceso' | 'adoptado'): Mascota {
    const idx = this.data.mascotas.findIndex((m) => m.id === id);
    if (idx === -1) throw new Error('Mascota no encontrada');
    this.data.mascotas[idx].estado = estado;
    this.save();
    return this.data.mascotas[idx];
  }

  // --- Solicitudes Methods ---
  public getSolicitudes(email?: string): SolicitudAdopcion[] {
    if (email) {
      return this.data.solicitudes.filter((s) => s.solicitante_email.toLowerCase() === email.toLowerCase());
    }
    return [...this.data.solicitudes].reverse();
  }

  public createSolicitud(solicitud: Omit<SolicitudAdopcion, 'id' | 'fecha' | 'estado'>): SolicitudAdopcion {
    const maxId = this.data.solicitudes.reduce((max, s) => Math.max(max, s.id), 0);
    const now = new Date();
    const formattedDate = now.toISOString().replace('T', ' ').substring(0, 19);
    const newSolicitud: SolicitudAdopcion = {
      id: maxId + 1,
      ...solicitud,
      estado: 'pendiente',
      fecha: formattedDate
    };
    this.data.solicitudes.unshift(newSolicitud);

    // Update mascota status to 'en_proceso'
    this.updateMascotaEstado(solicitud.mascota_id, 'en_proceso');

    this.save();
    return newSolicitud;
  }

  // --- Database Stats and Management ---
  public getStatus() {
    return {
      dbType: this.dbType,
      connected: true,
      stats: {
        usuarios: this.data.usuarios.length,
        pagos: this.data.pagos.length,
        mascotas: this.data.mascotas.length,
        solicitudes: this.data.solicitudes.length,
        totalRecaudado: this.data.pagos.reduce((sum, p) => sum + Number(p.total), 0)
      },
      dataFile: DB_FILE,
      schemaSource: 'adoptafelizdb__2__0d2b1f1f.sql'
    };
  }

  public resetToOriginalDump(): void {
    this.data = this.getDefaultData();
    this.save();
  }
}

export const db = new DatabaseService();
