// Importamos módulos necesarios
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON y URLencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware para manejar errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Error interno del servidor');
});

// URLs de Mockaroo 
const URL_LIBROS = 'https://api.mockaroo.com/api/3b186e00?count=20&key=fdaa9370';
const URL_USUARIOS = 'https://api.mockaroo.com/api/a90469d0?count=10&key=fdaa9370';
const URL_AUTORES = "https://api.mockaroo.com/api/eed22c30?count=20&key=fdaa9370" 
const URL_PRESTAMOS = 'https://api.mockaroo.com/api/cb283ef0?count=5&key=fdaa9370';




// Función para cargar datos desde una URL
async function cargarDatosDesdeURL(url) {
  try {
    const response = await axios.get(url);
    // Asigna un id único a cada libro
    const datos = response.data.map((libro, index) => ({
      ...libro,
      id: index + 1  // Asigna un id único basado en el índice + 1
    }));
    return datos;
  } catch (error) {
    console.error('Error al cargar datos desde Mockaroo:', error.message);
    return [];
  }
}

// Variables para almacenar los datos (simulando una "base de datos")
let libros = [];
let usuarios = [];
let autores = [];
let prestamos = [];

// Cargar datos al iniciar el servidor
async function cargarDatos() {
  libros = await cargarDatosDesdeURL(URL_LIBROS);
  usuarios = await cargarDatosDesdeURL(URL_USUARIOS);
  autores = await cargarDatosDesdeURL(URL_AUTORES);
  prestamos = await cargarDatosDesdeURL(URL_PRESTAMOS);

  console.log('Datos cargados:');
  console.log('Libros:', libros);
  console.log('Usuarios:', usuarios);
  console.log('Autores:', autores);
  console.log('Prestamos:', prestamos);
}

cargarDatos();

// Rutas CRUD para libros
app.get('/libros', (req, res) => {
  res.json(libros);
});

app.post('/libros', (req, res) => {
  const nuevoLibro = req.body;
  // Asigna un nuevo id al nuevo libro
  nuevoLibro.id = libros.length + 1;
  libros.push(nuevoLibro);
  res.status(201).json(nuevoLibro);
});

app.put('/libros/:id', (req, res) => {
  const id = req.params.id;
  const index = libros.findIndex(libro => libro.id === parseInt(id));
  if (index !== -1) {
    libros[index] = req.body;
    res.json(libros[index]);
  } else {
    res.status(404).send('Libro no encontrado');
  }
});

app.delete('/libros/:id', (req, res) => {
  const id = req.params.id;
  libros = libros.filter(libro => libro.id !== parseInt(id));
  res.status(204).send();
});

// Rutas CRUD para autores
app.get('/autores', (req, res) => {
  res.json(autores);
});

app.post('/autores', (req, res) => {
  const nuevoAutor = req.body;
  nuevoAutor.id = autores.length + 1;
  autores.push(nuevoAutor);
  res.status(201).json(nuevoAutor);
});
app.get('/libros', (req, res) => {
  res.json(libros);
});

app.put('/autores/:id', (req, res) => {
  const id = req.params.id;
  const index = autores.findIndex(autor => autor.id === parseInt(id));
  if (index !== -1) {
    autores[index] = req.body;
    res.json(autores[index]);
  } else {
    res.status(404).send('Autor no encontrado');
  }
});

app.delete('/autores/:id', (req, res) => {
  const id = req.params.id;
  autores = autores.filter(autor => autor.id !== parseInt(id));
  res.status(204).send();
});

// Rutas CRUD para usuarios
app.get('/usuarios', (req, res) => {
  res.json(usuarios);
});

app.post('/usuarios', (req, res) => {
  const nuevoUsuario = req.body;
  nuevoUsuario.id = usuarios.length + 1;
  usuarios.push(nuevoUsuario);
  res.status(201).json(nuevoUsuario);
});

app.put('/usuarios/:id', (req, res) => {
  const id = req.params.id;
  const index = usuarios.findIndex(usuario => usuario.id === parseInt(id));
  if (index !== -1) {
    usuarios[index] = req.body;
    res.json(usuarios[index]);
  } else {
    res.status(404).send('Usuario no encontrado');
  }
});

app.delete('/usuarios/:id', (req, res) => {
  const id = req.params.id;
  usuarios = usuarios.filter(usuario => usuario.id !== parseInt(id));
  res.status(204).send();
});

// Rutas CRUD para préstamos
app.get('/prestamos', (req, res) => {
  res.json(prestamos);
});

app.post('/prestamos', (req, res) => {
  const nuevoPrestamo = req.body;
  nuevoPrestamo.id = prestamos.length + 1;
  prestamos.push(nuevoPrestamo);
  res.status(201).json(nuevoPrestamo);
});

app.put('/prestamos/:id', (req, res) => {
  const id = req.params.id;
  const index = prestamos.findIndex(prestamo => prestamo.id === parseInt(id));
  if (index !== -1) {
    prestamos[index] = req.body;
    res.json(prestamos[index]);
  } else {
    res.status(404).send('Préstamo no encontrado');
  }
});

app.delete('/prestamos/:id', (req, res) => {
  const id = req.params.id;
  prestamos = prestamos.filter(prestamo => prestamo.id !== parseInt(id));
  res.status(204).send();
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});