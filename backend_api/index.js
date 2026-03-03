// 1. Traemos las librerías que instalamos (sistema antiguo "CommonJS")
const express = require('express');       // el framework principal
const bodyParser = require('body-parser'); // para leer JSON que nos envíen en POST/PUT
const cors = require('cors');             // para permitir peticiones desde el frontend

// 2. Importamos nuestras funciones de lógica (las crearemos después)
const productosController = require('./productos/productos.controller');

// 3. Creamos la "aplicación" express → este es nuestro servidor
const app = express();

// 4. Middlewares (funciones que se ejecutan ANTES de llegar a las rutas)
// Le decimos a express: "por favor entiende cuerpos JSON"
app.use(bodyParser.json());

// Le decimos: "permite que cualquier origen (frontend) me hable"
app.use(cors());

// 5. Definimos las rutas (endpoints) de nuestra API

// ──→ GET /productos  ← nos devuelve TODOS los productos
app.route('/productos')
  .get(async (req, res) => {              // ← método GET
    try {
      // Llamamos a la función que está en otro archivo
      const listaProductos = await productosController.obtenerListaProductos();
      
      // Devolvemos la lista en formato JSON (muy típico en APIs)
      res.json(listaProductos);
    } catch (err) {
      // Si algo falla mostramos error en consola del servidor
      console.error(err.message);
      // Y enviamos error 500 al cliente (navegador o frontend)
      res.status(500).send('Error al obtener la lista de productos');
    }
  })

  // Aquí irá el POST más adelante (por ahora está vacío)
  .post((req, res) => {
    // ← más adelante pondremos código para CREAR productos
  });

// Ruta de prueba para saber que el servidor está vivo
app.get('/', (req, res) => {
  res.send('Backend productos');   // simple mensaje HTML
});

// 6. Arrancamos el servidor y escuchamos en el puerto 3000
app.listen(3000, () => {
  console.log('Activado en http://localhost:3000');
});