import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { productos } from './database/productos.js';
import { validaTitulo, validaPrecio } from './validations.js';
import * as productosController from './productos/productos.controller.js';


const app = express();
app.use(express.json());

app.route('/productos')
  .get((req, res) => {
    res.json(productos);
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

    if (valida_titulo.error) {
      return res.status(400).send(valida_titulo.error);
    }

    if (valida_precio.error) {
      return res.status(400).send(valida_precio.error);
    }

    productos.push(nuevoProducto);
    res.status(201).json(nuevoProducto); // respuesta creado producto
  });

app.route('/productos/:id')
  .get((req, res) => {
    const productoEncontrado = productosController.encontrarProducto(req.params.id);

    productoEncontrado
      ? res.json(productoEncontrado)
      : res.status(404).send(`El producto con id ${req.params.id} no existe`);
  })
  .delete((req, res) => {
    const indice_a_Borrar = productosController.borrarProducto(req.params.id);

    const mensaje = indice_a_Borrar === -1
      ? `Producto con id ${req.params.id} no existe. Nada que borrar`
      : `Borrado producto con id ${req.params.id}`;

    const estado = indice_a_Borrar === -1 ? 404 : 200;

    return res.status(estado).send(mensaje);
  });

  
app.listen(3000, () => {
  console.log('Activado localhost:3000.');
});