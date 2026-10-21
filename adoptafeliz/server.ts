import express, { Request, Response } from 'express';
import path from 'node:path';
import fs from 'node:fs';
import { db } from './src/server/database.ts';

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const isProd = process.env.NODE_ENV === 'production';

app.use(express.json({ limit: '15mb' }));

// Database status & metrics
app.get('/api/db/status', (_req: Request, res: Response) => {
  try {
    const status = db.getStatus();
    res.json({ success: true, data: status });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Full database tables inspector
app.get('/api/db/tables', (_req: Request, res: Response) => {
  try {
    const status = db.getStatus();
    const usuarios = db.getUsuarios();
    const pagos = db.getPagos();
    const mascotas = db.getMascotas();
    const solicitudes = db.getSolicitudes();
    res.json({
      success: true,
      data: {
        status,
        tables: {
          usuarios,
          pagos,
          mascotas,
          solicitudes
        }
      }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Export raw SQL file
app.get('/api/db/export-sql', (_req: Request, res: Response) => {
  try {
    const sql = db.exportSqlDump();
    res.setHeader('Content-Type', 'application/sql');
    res.setHeader('Content-Disposition', 'attachment; filename="adoptafelizdb.sql"');
    res.send(sql);
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Reset database to initial dump state
app.post('/api/db/reset', (_req: Request, res: Response) => {
  try {
    db.resetToOriginalDump();
    res.json({ success: true, message: 'Base de datos restaurada al volcado original.' });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Auth: Login
app.post('/api/auth/login', (req: Request, res: Response) => {
  try {
    const { correo, contrasena } = req.body;
    if (!correo || !contrasena) {
      return res.status(400).json({ success: false, error: 'Correo y contraseña requeridos.' });
    }

    const user = db.getUsuarioByEmail(correo);
    if (!user || user.contrasena !== contrasena) {
      return res.status(401).json({ success: false, error: 'Credenciales inválidas. Revisa tu correo o contraseña.' });
    }

    const { contrasena: _, ...safeUser } = user;
    return res.json({ success: true, user: safeUser });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// Auth: Register
app.post('/api/auth/register', (req: Request, res: Response) => {
  try {
    const { correo, contrasena, nombre, telefono, ubicacion, bio } = req.body;
    if (!correo || !contrasena) {
      return res.status(400).json({ success: false, error: 'Correo y contraseña son obligatorios.' });
    }

    const newUser = db.createUsuario({
      correo: correo.trim().toLowerCase(),
      contrasena,
      nombre: nombre ? nombre.trim() : null,
      telefono: telefono ? telefono.trim() : null,
      ubicacion: ubicacion ? ubicacion.trim() : null,
      bio: bio ? bio.trim() : null
    });

    const { contrasena: _, ...safeUser } = newUser;
    return res.status(201).json({ success: true, user: safeUser });
  } catch (error: any) {
    return res.status(400).json({ success: false, error: error.message });
  }
});

// Users list
app.get('/api/usuarios', (_req: Request, res: Response) => {
  try {
    const users = db.getUsuarios();
    res.json({ success: true, data: users });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update user profile
app.put('/api/usuarios/:id', (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { nombre, telefono, ubicacion, bio, contrasena } = req.body;

    const updates: any = {};
    if (nombre !== undefined) updates.nombre = nombre;
    if (telefono !== undefined) updates.telefono = telefono;
    if (ubicacion !== undefined) updates.ubicacion = ubicacion;
    if (bio !== undefined) updates.bio = bio;
    if (contrasena) updates.contrasena = contrasena;

    const updated = db.updateUsuario(id, updates);
    const { contrasena: _, ...safeUser } = updated;
    res.json({ success: true, user: safeUser });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Pagos (Store Purchases)
app.get('/api/pagos', (req: Request, res: Response) => {
  try {
    const email = req.query.email as string | undefined;
    const pagos = db.getPagos(email);
    res.json({ success: true, data: pagos });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Create payment (Checkout)
app.post('/api/pagos/checkout', (req: Request, res: Response) => {
  try {
    const { nombre, email, direccion, metodo_pago, total, productos } = req.body;

    if (!nombre || !email || !direccion || !total || !productos) {
      return res.status(400).json({ success: false, error: 'Faltan campos obligatorios para procesar la compra.' });
    }

    const newPago = db.createPago({
      nombre,
      email,
      direccion,
      metodo_pago: metodo_pago || 'tarjeta',
      total: parseFloat(total),
      productos: typeof productos === 'string' ? productos : JSON.stringify(productos)
    });

    return res.status(201).json({
      success: true,
      message: '¡Pago registrado exitosamente en la base de datos!',
      data: newPago
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// Mascotas
app.get('/api/mascotas', (req: Request, res: Response) => {
  try {
    let mascotas = db.getMascotas();
    const { especie, edad_tipo, q } = req.query;

    if (especie && especie !== 'todos') {
      mascotas = mascotas.filter((m) => m.especie === especie);
    }
    if (edad_tipo && edad_tipo !== 'todos') {
      mascotas = mascotas.filter((m) => m.edad_tipo === edad_tipo);
    }
    if (q) {
      const search = (q as string).toLowerCase();
      mascotas = mascotas.filter(
        (m) =>
          m.nombre.toLowerCase().includes(search) ||
          m.descripcion.toLowerCase().includes(search) ||
          m.ubicacion.toLowerCase().includes(search)
      );
    }

    res.json({ success: true, data: mascotas });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/mascotas/:id', (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const mascota = db.getMascotaById(id);
    if (!mascota) {
      return res.status(404).json({ success: false, error: 'Mascota no encontrada.' });
    }
    return res.json({ success: true, data: mascota });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/mascotas', (req: Request, res: Response) => {
  try {
    const { nombre, especie, edad, edad_tipo, genero, tamano, descripcion, foto, personalidad, ubicacion, rescatista_nombre } = req.body;

    if (!nombre || !especie || !descripcion) {
      return res.status(400).json({ success: false, error: 'Nombre, especie y descripción son obligatorios.' });
    }

    const nueva = db.createMascota({
      nombre,
      especie: especie || 'perro',
      edad: edad || '1 año',
      edad_tipo: edad_tipo || 'joven',
      genero: genero || 'Macho',
      tamano: tamano || 'Mediano',
      descripcion,
      foto: foto || '/images/mascotas_adopcion_1.jpg',
      galeria: [foto || '/images/mascotas_adopcion_1.jpg'],
      personalidad: Array.isArray(personalidad) ? personalidad : ['Cariñoso', 'Tranquilo'],
      vacunado: true,
      desparasitado: true,
      esterilizado: false,
      chip: false,
      ubicacion: ubicacion || 'Estado de México',
      urgente: true,
      estado: 'disponible',
      rescatista_nombre: rescatista_nombre || 'Comunidad AdoptaFeliz'
    });

    res.status(201).json({ success: true, data: nueva, message: '¡Mascota publicada con éxito!' });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Solicitudes de Adopcion
app.get('/api/adopciones', (req: Request, res: Response) => {
  try {
    const email = req.query.email as string | undefined;
    const solicitudes = db.getSolicitudes(email);
    res.json({ success: true, data: solicitudes });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/adopciones', (req: Request, res: Response) => {
  try {
    const {
      mascota_id,
      mascota_nombre,
      solicitante_nombre,
      solicitante_email,
      telefono,
      direccion,
      tipo_vivienda,
      tiene_mascotas,
      descripcion_hogar,
      motivo_adopcion
    } = req.body;

    if (!mascota_id || !solicitante_nombre || !solicitante_email || !telefono) {
      return res.status(400).json({ success: false, error: 'Por favor completa todos los campos requeridos.' });
    }

    const solicitud = db.createSolicitud({
      mascota_id: parseInt(mascota_id, 10),
      mascota_nombre: mascota_nombre || 'Mascota AdoptaFeliz',
      solicitante_nombre,
      solicitante_email,
      telefono,
      direccion: direccion || 'No especificada',
      tipo_vivienda: tipo_vivienda || 'Casa',
      tiene_mascotas: Boolean(tiene_mascotas),
      descripcion_hogar: descripcion_hogar || '',
      motivo_adopcion: motivo_adopcion || ''
    });

    return res.status(201).json({
      success: true,
      message: '¡Tu solicitud de adopción ha sido enviada con éxito! El rescatista te contactará pronto.',
      data: solicitud
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// Render Health Check endpoint
app.get('/healthz', (_req: Request, res: Response) => {
  res.status(200).send('OK');
});

// ----------------- SERVING VITE FRONTEND ----------------- //

async function startServer() {
  // Always serve uploaded and static images
  app.use('/images', express.static(path.resolve(process.cwd(), 'public/images')));

  if (!isProd) {
    // Development mode with Vite middleware
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production mode on Render / VPS / Cloud
    const distPath = path.resolve(process.cwd(), 'dist');
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get('*', (_req, res) => {
        res.sendFile(path.join(distPath, 'index.html'));
      });
    }
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🐾 Servidor AdoptaFeliz corriendo en http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
