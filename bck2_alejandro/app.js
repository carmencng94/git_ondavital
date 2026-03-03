import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const app = express();
app.use(express.json());

import { productos } from './database.js';

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

    productos.push(nuevoProducto);
    res.status(201).json(nuevoProducto); // respuesta creado producto
  });

app.get('/', (req, res) => {
  res.send('Backend productos');
});

app.listen(3000, () => {
  console.log('Activado localhost:3000.');
});