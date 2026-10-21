import { Producto } from '../types';

export const STORE_PRODUCTS: Producto[] = [
  {
    id: '1',
    name: 'Alimento Premium para Perros Adultos (15kg)',
    price: 45.99,
    category: 'Alimento',
    image: '/images/productos_tienda.jpg',
    rating: 4.9,
    reviewsCount: 38,
    description: 'Fórmula balanceada con proteínas de alto valor biológico, omega 3 y probióticos para una digestión óptima y pelaje brillante.',
    inStock: true,
    featured: true
  },
  {
    id: '2',
    name: 'Collar Ajustable con Placa ID Personalizada',
    price: 18.99,
    category: 'Accesorios',
    image: '/images/accesorios_mascotas.webp',
    rating: 4.8,
    reviewsCount: 24,
    description: 'Collar de nylon reforzado resistente al agua con grabado láser gratuito del nombre y teléfono de tu mascota.',
    inStock: true,
    featured: true
  },
  {
    id: '3',
    name: 'Cama Ortopédica Memory Foam Deluxe',
    price: 89.99,
    category: 'Camas',
    image: '/images/cama_mascota.jpg',
    rating: 5.0,
    reviewsCount: 52,
    description: 'Espuma de memoria ergonómica que alivia la presión articular en perros y gatos. Funda lavable y base antideslizante.',
    inStock: true,
    featured: true
  },
  {
    id: '4',
    name: 'Juguete Interactivo Dispensador de Premios',
    price: 24.99,
    category: 'Juguetes',
    image: '/images/mascotas_adopcion_1.jpg',
    rating: 4.7,
    reviewsCount: 19,
    description: 'Estimulación mental que reduce la ansiedad por separación y el aburrimiento. Material no tóxico ultrarresistente.',
    inStock: true,
    featured: true
  },
  {
    id: '5',
    name: 'Kit Completo de Higiene y Cuidado Dental',
    price: 34.99,
    category: 'Higiene',
    image: '/images/mascotas_adopcion_2.jpg',
    rating: 4.8,
    reviewsCount: 15,
    description: 'Incluye cepillo ergonómico, pasta enzimática con sabor a carne, champú hipoalergénico y toallitas biodegradables.',
    inStock: true
  },
  {
    id: '6',
    name: 'Arnés Antitirones Ergonómico Reflectante',
    price: 28.50,
    category: 'Accesorios',
    image: '/images/accesorios_mascotas.webp',
    rating: 4.9,
    reviewsCount: 31,
    description: 'Diseño en Y que protege la tráquea y distribuye la fuerza de tiro cómodamente. Costuras reflectantes 3M para paseos nocturnos.',
    inStock: true
  },
  {
    id: '7',
    name: 'Transportadora de Viaje Ventilada IATA',
    price: 59.90,
    category: 'Viaje',
    image: '/images/productos_tienda.jpg',
    rating: 4.6,
    reviewsCount: 14,
    description: 'Aprobada para vuelos y viajes terrestres. Cierre de seguridad reforzado y ventilación panorámica de 360 grados.',
    inStock: true
  },
  {
    id: '8',
    name: 'Rascador Torre con Hamaca y Nido para Gatos',
    price: 64.00,
    category: 'Camas',
    image: '/images/cama_mascota.jpg',
    rating: 4.9,
    reviewsCount: 42,
    description: 'Postes de sisal natural para afilar uñas, plataforma de observación y hamaca acolchada para siestas relajantes.',
    inStock: true
  }
];

export interface Servicio {
  id: string;
  titulo: string;
  categoria: string;
  descripcion: string;
  icono: string;
  imagen: string;
  precioDesde: string;
  incluye: string[];
}

export const SERVICIOS: Servicio[] = [
  {
    id: 'veterinaria',
    titulo: 'Atención Médica y Chequeo General',
    categoria: 'Salud',
    descripcion: 'Consultas preventivas, desparasitación, esquema completo de vacunación y certificados de salud avalados por veterinarios titulados.',
    icono: 'Stethoscope',
    imagen: '/images/servicios_veterinarios.jpg',
    precioDesde: '$25.00',
    incluye: ['Examen físico completo', 'Revisión dental y auricular', 'Control de peso y nutrición', 'Esquema de vacunas']
  },
  {
    id: 'domicilio',
    titulo: 'Servicio Veterinario a Domicilio',
    categoria: 'Atención',
    descripcion: 'Atención médica directamente en la comodidad de tu hogar, evitando estrés de traslado para mascotas nerviosas o convalecientes.',
    icono: 'Truck',
    imagen: '/images/servicios_domicilio.png',
    precioDesde: '$35.00',
    incluye: ['Traslado a domicilio', 'Tratamientos básicos', 'Aplicación de inyecciones', 'Asesoría presencial']
  },
  {
    id: 'estetica',
    titulo: 'Peluquería y Estética Canina/Felina',
    categoria: 'Higiene',
    descripcion: 'Baño medicado, corte de pelo según raza, vaciado de glándulas anales, corte de uñas y limpieza ótica profesional.',
    icono: 'Scissors',
    imagen: '/images/servicios_mascotas.jpg',
    precioDesde: '$20.00',
    incluye: ['Baño con champú ozonizado', 'Cepillado y deslanado', 'Corte de uñas higiénico', 'Perfume natural antialérgico']
  },
  {
    id: 'esterilizacion',
    titulo: 'Campaña de Esterilización a Bajo Costo',
    categoria: 'Comunidad',
    descripcion: 'Cirugías a cargo de cirujanos con protocolos de anestesia inhalatoria segura. Fomentamos el control ético de la población animal.',
    icono: 'HeartPulse',
    imagen: '/images/servicios_veterinarios.jpg',
    precioDesde: '$30.00',
    incluye: ['Cirugía con anestesia inhalatoria', 'Medicamentos postoperatorios', 'Revisión de retiro de puntos', 'Orientación de cuidados']
  }
];

export interface HistoriaExito {
  id: string;
  mascota: string;
  adoptante: string;
  tiempo: string;
  foto: string;
  historia: string;
  cita: string;
}

export const HISTORIAS_EXITO: HistoriaExito[] = [
  {
    id: '1',
    mascota: 'Max',
    adoptante: 'Familia Ramírez',
    tiempo: 'Adoptado hace 8 meses',
    foto: '/images/mascotas_adopcion_1.jpg',
    historia: 'Max fue encontrado en un lote baldío desnutrido y temeroso. Tras ser rehabilitado por el refugio, la familia Ramírez le dio la bienvenida a su hogar. Ahora es el compañero inseparable de los niños y su lealtad no tiene límites.',
    cita: 'Adoptar a Max ha sido la decisión más hermosa que hemos tomado. Llenó nuestra casa de risas y alegría infinita.'
  },
  {
    id: '2',
    mascota: 'Luna',
    adoptante: 'Sofía & Carlos',
    tiempo: 'Adoptada hace 1 año',
    foto: '/images/GatoPerfil.jpg',
    historia: 'Luna pasó meses esperando a alguien que entendiera su naturaleza tranquila. Carlos y Sofía buscaban un felino para su departamento y encontraron en Luna una compañera cariñosa que los recibe cada tarde con ronroneos.',
    cita: 'Pensábamos que rescatábamos a Luna, pero la verdad es que ella nos rescató de la rutina con su dulce compañía.'
  },
  {
    id: '3',
    mascota: 'Canelo',
    adoptante: 'Jorge Adán',
    tiempo: 'Adoptado recientemente',
    foto: '/images/Perfilmax.jpg',
    historia: 'Canelo era el cachorro más tímido de la camada rescatada en Chimalhuacán. Al conocer a Jorge se produjo una conexión instantánea. Hoy corre feliz en los parques y cuenta con una familia que lo ama.',
    cita: 'AdoptaFeliz hizo que todo el proceso fuera transparente, seguro y con un acompañamiento veterinario ejemplar.'
  }
];
