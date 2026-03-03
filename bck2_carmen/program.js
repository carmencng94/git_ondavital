// programa.js
// ──────────────────────────────────────────────────────────────
// 1. Importamos las dependencias
import express from 'express';
import { v4 as uuidv4 } from 'uuid';

// 2. Creamos la app Express
const app = express();

// 3. Middleware para leer JSON en el body
app.use(express.json());

// 4. Importamos la "base de datos" en memoria
import { productos } from './database.js';

// 5. Función reutilizable para validaciones (la mantenemos aunque aquí no la usemos en este endpoint)
const ejecutaValidacion = (data, validacion, mensajedeError) =>
  validacion(data) ? data : { error: mensajedeError };


// ──────────────────────────────────────────────────────────────
// RUTAS
// ──────────────────────────────────────────────────────────────

// Ruta raíz de prueba
app.get('/', (req, res) => {
  res.send('Backend productos');
});

// ── GET /productos ──→ lista completa
app.route('/productos')

  .get((req, res) => {
    res.json(productos);  // devuelve TODOS los productos
  })

  // ── POST /productos ──→ crear nuevo (mantenemos lo del ej. 6)
  .post((req, res) => {
    const { titulo, precio } = req.body;

    const nuevoProducto = {
      id: uuidv4(),
      titulo,
      precio
    };

    // Validación título
    const valida_titulo = ejecutaValidacion(
      titulo,
      data => data && typeof data === 'string' && data.trim().length > 3,
      'El título debe tener al menos 4 caracteres'
    );

    if (valida_titulo.error) {
      return res.status(400).send(valida_titulo.error);
    }

    // Validación precio
    const valida_precio = ejecutaValidacion(
      precio,
      data => {
        const num = Number(data);
        return !isNaN(num) && num > 0.1;
      },
      'El precio debe ser un número mayor que 0.1 €'
    );

    if (valida_precio.error) {
      return res.status(400).send(valida_precio.error);
    }

    productos.push(nuevoProducto);
    res.status(201).json(nuevoProducto);
  });

// ── NUEVO ENDPOINT del Ejercicio 7 ───────────────────────────────
// GET /productos/:id  → devuelve UN SOLO producto por ID
app.route('/productos/:id')
  .get((req, res) => {
    // req.params → objeto con todos los parámetros de la URL
    // :id → se captura aquí como req.params.id  (es un string)
    const idBuscado = req.params.id;

    // Método .find() → busca el primer elemento que cumpla la condición
    // Compara con == (coerción de tipos) porque id puede ser string
    const productoEncontrado = productos.find(
      producto => producto.id == idBuscado
    );

    // Ternario corto: si existe → devolvemos el producto en JSON
    // si no existe → 404 + mensaje claro
    productoEncontrado
      ? res.json(productoEncontrado)
      : res.status(404).send(`El producto con id ${idBuscado} no existe`);
  });

// Arrancamos el servidor
app.listen(3000, () => {
  console.log('Activado localhost:3000.');
});