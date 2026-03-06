// app.js
import express from 'express';
import * as productosController from '../SQL-lite/productos/productos_controller.js';
import { validaTitulo, validaPrecio } from '../SQL-lite/validations.js';
import { productos } from '../SQL-lite/database/productos.js';

// Middleware de seguridad (nuevo)
const requireApiKey = (req, res, next) => {
  const apiKey = req.header('x-api-key');
  if (!apiKey || apiKey !== 'mi-clave-secreta') {
    return res.status(401).send('Falta o es incorrecta la cabecera x-api-key');
  }
  next();   // ← deja pasar a la ruta
};

const app = express();
app.use(express.json());

// ──────────────────────────────────────────────────────────────
// RUTAS
app.route('/productos')
  .get((req, res) => {
    res.json(productos);
  })

  // POST con middleware → solo pasa si trae la clave correcta
  .post(requireApiKey, (req, res) => {
    const { titulo, precio } = req.body;

    const valida_titulo = validaTitulo(titulo);
    if (valida_titulo.error) {
      return res.status(400).send(valida_titulo.error);
    }

    const valida_precio = validaPrecio(precio);
    if (valida_precio.error) {
      return res.status(400).send(valida_precio.error);
    }

    const resultado = productosController.crearNuevoProducto(titulo, precio);

    if (resultado.error) {
      return res.status(400).send(resultado.error);
    }

    res.status(201).json(resultado);
  });

app.route('/productos/:id')
  .get((req, res) => {
    const productoEncontrado = productos.find(producto => producto.id == req.params.id);
    (productoEncontrado) ? res.json(productoEncontrado)
      : res.status(404).send(`El producto con id ${req.params.id} no existe`);
  });

app.listen(3000, () => {
  console.log('Activado localhost:3000.');
});