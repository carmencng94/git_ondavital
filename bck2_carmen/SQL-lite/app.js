// app.js (corregido – import de productos.js en vez de sqlite.js)
// ──────────────────────────────────────────────────────────────
// 1. Importamos Express – framework para HTTP/APIs.
import express from 'express';

// 2. Importamos uuidv4 – IDs únicos.
import { v4 as uuidv4 } from 'uuid';

// 3. CORRECCIÓN: Importamos productos de productos.js (array memoria).
// Base sólida: sqlite.js es para funcs SQL, no datos – separación Model.
import { productos } from './database/productos.js';  // ← CAMBIO AQUÍ (no sqlite.js)

// 4. Importamos validaciones – todas, incluyendo nuevas para ej. 4.
import { validaTitulo, validaPrecio, validaDescripcion, validaPais } from './validations.js';

// 5. Creamos app.
const app = express();

// 6. Middleware JSON.
app.use(express.json());

// ──────────────────────────────────────────────────────────────
// Rutas.
// ──────────────────────────────────────────────────────────────
app.route('/productos')
  .get((req, res) => {
    res.json(productos);  // Usa el array importado – base sólida: simple para dev.
  })

  .post((req, res) => {
    const { titulo, precio } = req.body;

    const nuevoProducto = {
      id: uuidv4(),
      titulo: titulo,
      precio: precio
    };

    const valida_titulo = validaTitulo(titulo);
    const valida_precio = validaPrecio(precio);

    if (valida_titulo.error) { return res.status(400).send(valida_titulo.error); }
    if (valida_precio.error) { return res.status(400).send(valida_precio.error); }

    productos.push(nuevoProducto);
    res.status(201).json(nuevoProducto);
  });

app.route('/productos/:id')
  .get((req, res) => {
    const productoEncontrado = productos.find(producto => producto.id == req.params.id);
    (productoEncontrado) ? res.json(productoEncontrado)
      : res.status(404).send(`El producto con id ${req.params.id} no existe`);
  });

// 7. Arranca server.
app.listen(3000, () => {
  console.log('Activado localhost:3000.');
});