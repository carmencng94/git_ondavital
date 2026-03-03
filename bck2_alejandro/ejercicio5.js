import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { productos } from './database.js';

const app = express();
app.use(express.json());

// Funcion de validacion reutilizable
const ejecutaValidacion = (data, validacion, mensajedeError) =>
  validacion(data) ? data : { error: mensajedeError };

app.route('/productos')
  .get((req, res) => {
    res.json(productos);
  })
  .post((req, res) => {

    const { titulo, precio } = req.body;

    // Validacion titulo
    const valida_titulo = ejecutaValidacion(
      titulo,
      data => data && data.length > 3,
      'Minimo de 4 caracteres'
    );

    if (valida_titulo.error) {
      res.status(400).send(valida_titulo.error);
      return;
    }

    // Validacion precio
    const valida_precio = ejecutaValidacion(
      precio,
      data => typeof data === 'number' && data > 0.1,
      'El precio debe ser mayor que 0.1'
    );

    if (valida_precio.error) {
      res.status(400).send(valida_precio.error);
      return;
    }

    const nuevoProducto = {
      id: uuidv4(),
      titulo: titulo,
      precio: precio
    };

    productos.push(nuevoProducto);
    res.status(201).json(nuevoProducto);
  });

app.get('/', (req, res) => {
  res.send('Backend productos');
});

app.listen(3000, () => {
  console.log('Activado localhost:3000');
});