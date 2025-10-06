const express = require('express');
import pkg from 'pg';
const { Pool } = pkg;

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS para permitir peticiones desde el frontend
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

// Configuración de PostgreSQL
const pool = new Pool({
  user: '',
  host: '',
  database: '',
  password: '',
  port: 5432,
});

// Probar conexión a la base de datos
pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error conectando a PostgreSQL:', err.stack);
  }
  console.log('Conexión exitosa a PostgreSQL');
  release();
});

// ==================== RUTAS ====================

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ mensaje: 'API Talento Sin Barreras funcionando' });
});

// REGISTRO DE USUARIOS
app.post('/api/registro', async (req, res) => {
  const { nombre, apellidoPaterno, apellidoMaterno, correo, contrasenia, rol } = req.body;

  try {
    // Validaciones básicas
    if (!nombre || !apellidoPaterno || !correo || !contrasenia || !rol) {
      return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    // Verificar si el correo ya existe
    const existeUsuario = await pool.query(
      'SELECT * FROM usuarios WHERE correo = $1',
      [correo]
    );

    if (existeUsuario.rows.length > 0) {
      return res.status(409).json({ error: 'El correo ya está registrado' });
    }

    // Insertar nuevo usuario (SIN HASHEAR contraseña por ahora - agregar bcrypt después)
    const resultado = await pool.query(
      `INSERT INTO usuarios (nombre, apellido_paterno, apellido_materno, correo, contrasenia, rol, fecha_registro)
       VALUES ($1, $2, $3, $4, $5, $6, NOW())
       RETURNING id, nombre, correo, rol`,
      [nombre, apellidoPaterno, apellidoMaterno, correo, contrasenia, rol]
    );

    res.status(201).json({
      mensaje: 'Usuario registrado exitosamente',
      usuario: resultado.rows[0]
    });

  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
});

// LOGIN
app.post('/api/login', async (req, res) => {
  const { correo, contrasenia } = req.body;

  try {
    if (!correo || !contrasenia) {
      return res.status(400).json({ error: 'Correo y contraseña son requeridos' });
    }

    const resultado = await pool.query(
      'SELECT id, nombre, apellido_paterno, correo, rol FROM usuarios WHERE correo = $1 AND contrasenia = $2',
      [correo, contrasenia]
    );

    if (resultado.rows.length === 0) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    res.json({
      mensaje: 'Login exitoso',
      usuario: resultado.rows[0]
    });

  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
});

// OBTENER PERFIL DE USUARIO
app.get('/api/usuario/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const resultado = await pool.query(
      'SELECT id, nombre, apellido_paterno, apellido_materno, correo, rol, fecha_registro FROM usuarios WHERE id = $1',
      [id]
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json(resultado.rows[0]);

  } catch (error) {
    console.error('Error obteniendo usuario:', error);
    res.status(500).json({ error: 'Error al obtener usuario' });
  }
});

// CREAR OFERTA LABORAL (solo instituciones)
app.post('/api/ofertas', async (req, res) => {
  const { titulo, descripcion, tipo, requisitos, id_institucion } = req.body;

  try {
    const resultado = await pool.query(
      `INSERT INTO ofertas (titulo, descripcion, tipo, requisitos, id_institucion, fecha_publicacion)
       VALUES ($1, $2, $3, $4, $5, NOW())
       RETURNING *`,
      [titulo, descripcion, tipo, requisitos, id_institucion]
    );

    res.status(201).json({
      mensaje: 'Oferta creada exitosamente',
      oferta: resultado.rows[0]
    });

  } catch (error) {
    console.error('Error creando oferta:', error);
    res.status(500).json({ error: 'Error al crear oferta' });
  }
});

// OBTENER TODAS LAS OFERTAS
app.get('/api/ofertas', async (req, res) => {
  try {
    const resultado = await pool.query(`
      SELECT o.*, u.nombre as nombre_institucion 
      FROM ofertas o
      JOIN usuarios u ON o.id_institucion = u.id
      WHERE o.activa = true
      ORDER BY o.fecha_publicacion DESC
    `);

    res.json(resultado.rows);

  } catch (error) {
    console.error('Error obteniendo ofertas:', error);
    res.status(500).json({ error: 'Error al obtener ofertas' });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
