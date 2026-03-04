// app.js
// ──────────────────────────────────────────────────────────────
// 1. Importamos Express – framework para HTTP/APIs.
// Base sólida: ES Modules para código moderno – tree-shaking optimiza.
import express from 'express';

// 2. Importamos uuidv4 – IDs únicos.
// Base sólida: UUID evita duplicados en entornos distribuidos.
import { v4 as uuidv4 } from 'uuid';

// 3. Importamos productos – simula BD.
// Base sólida: Separado – fácil escalar a real DB.
import { productos } from './database/productosdb.js';

// 4. Importamos validaciones – todas, incluyendo nuevas para ej. 4.
// Base sólida: Import selectivo – solo lo usado, reduce carga.
import { validaTitulo, validaPrecio, validaDescripcion, validaPais } from './validations.js';

// 5. Creamos app.
// Base sólida: Instancia central para middlewares/rutas.
const app = express();

// 6. Middleware JSON.
// Base sólida: Parsea req.body – sin esto, POST falla.
app.use(express.json());

// ──────────────────────────────────────────────────────────────
// Ruta /productos – GET lista, POST crear (con nuevos campos).
// Base sólida: app.route() agrupa – evita repetición.
app.route('/productos')
  // GET – lista.
  .get((req, res) => {
    res.json(productos);
  })

  // POST – crear, con descripcion/pais (ej. 4).
  // Base sólida: Valida TODO antes de guardar – defensivo.
  .post((req, res) => {
    // Destructuring ampliado – extrae todos campos.
    // Base sólida: ES6 – limpio, maneja undefined si no vienen.
    const { titulo, precio, descripcion, pais } = req.body;

    // Crea producto con nuevos campos.
    // Base sólida: ?? para defaults (ej: descripcion ?? '') si quieres.
    const nuevoProducto = {
      id: uuidv4(),
      titulo: titulo,
      precio: precio,
      descripcion: descripcion,  // NUEVO (ej. 4) – opcional
      pais: pais                 // NUEVO (ej. 4) – required
    };

    // Validaciones – todas, incluyendo nuevas.
    // Base sólida: Chequeo secuencial – early return si falla.
    const resultadoTitulo = validaTitulo(titulo);
    const resultadoPrecio = validaPrecio(precio);
    const resultadoDescripcion = validaDescripcion(descripcion); // NUEVA (opcional)
    const resultadoPais = validaPais(pais);                     // NUEVA (required)

    if (resultadoTitulo.error) { return res.status(400).send(resultadoTitulo.error.message); }
    if (resultadoPrecio.error) { return res.status(400).send(resultadoPrecio.error.message); }
    if (resultadoDescripcion.error) { return res.status(400).send(resultadoDescripcion.error.message); }
    if (resultadoPais.error) { return res.status(400).send(resultadoPais.error.message); }

    // Guarda.
    productos.push(nuevoProducto);

    // Respuesta 201.
    res.status(201).json(nuevoProducto);
  });

// ──────────────────────────────────────────────────────────────
// Ruta /productos/:id – detalle (sin cambios, pero completo).
app.route('/productos/:id')
  .get((req, res) => {
    const productoEncontrado = productos.find(producto => producto.id == req.params.id);
    (productoEncontrado) ? res.json(productoEncontrado)
      : res.status(404).send(`El producto con id ${req.params.id} no existe`);
  });

// Inicia server.
app.listen(3000, () => {
  console.log('Activado localhost:3000.');
});