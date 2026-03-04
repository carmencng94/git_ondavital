// ──────────────────────────────────────────────────────────────
// 1. Importamos Express → framework para crear rutas y servidor
import express from 'express';

// 2. Importamos uuidv4 → genera IDs únicos para nuevos productos
import { v4 as uuidv4 } from 'uuid';

// 3. Importamos el array de productos desde la "base de datos" (en memoria)
import { productos } from './database/productos.js';

// 4. Importamos SOLO las funciones de validación que necesitamos
//    (buena práctica: importar lo mínimo para no cargar todo)
import { validaTitulo, validaPrecio } from './validations.js';

// 5. Creamos la instancia de la app Express
const app = express();

// 6. Middleware global: permite leer cuerpos JSON en POST/PUT
app.use(express.json());

// ──────────────────────────────────────────────────────────────
// Rutas para /productos (lista y crear)
// ──────────────────────────────────────────────────────────────
app.route('/productos')
  // GET /productos → devuelve TODA la lista
  .get((req, res) => {
    // Simplemente devolvemos el array en JSON
    res.json(productos);
  })

  // POST /productos → crea uno nuevo
  .post((req, res) => {
    // Destructuring: extraemos título y precio del body
    // Base sólida: esto evita escribir req.body.titulo cada vez
    const { titulo, precio } = req.body;

    // Creamos el objeto nuevo (aún sin validar)
    const nuevoProducto = {
      id: uuidv4(),     // ID único automático (base sólida: evita duplicados)
      titulo: titulo,
      precio: precio
    };

    // Validamos título usando la función importada
    // Base sólida: validación separada → reutilizable en otros lugares
const resultadoTitulo = validaTitulo(titulo);
  const resultadoPrecio = validaPrecio(precio);
  
    if (resultadoTitulo.error) {
    return res.status(400).send(resultadoTitulo.error.message);
  }

  if (resultadoPrecio.error) {
    return res.status(400).send(resultadoPrecio.error.message);
  }

  productos.push(nuevoProducto);
  res.status(201).json(nuevoProducto);
  });

// ──────────────────────────────────────────────────────────────
// Ruta para /productos/:id (detalle por ID)
// ──────────────────────────────────────────────────────────────
app.route('/productos/:id')
  // GET /productos/:id → busca y devuelve uno específico
  .get((req, res) => {
    // .find() → recorre el array y devuelve el primero que coincida
    // Base sólida: == en vez de === porque req.params.id es siempre string
    const productoEncontrado = productos.find(producto => producto.id == req.params.id);

    // Ternario: si existe → JSON; si no → 404 + mensaje
    // Base sólida: ternario para decisiones simples y legibles
    (productoEncontrado)
      ? res.json(productoEncontrado)
      : res.status(404).send(`El producto con id ${req.params.id} no existe`);
  });

// 7. Arrancamos el servidor en puerto 3000
app.listen(3000, () => {
  console.log('Activado localhost:3000.');
});