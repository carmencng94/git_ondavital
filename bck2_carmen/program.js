import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const app = express();
app.use(express.json());

// Importamos el array de productos desde el archivo database.js
import { productos } from './database.js';

// Esta función es muy importante: la vamos a usar para validar cualquier dato
// Recibe 3 cosas:
// 1. El valor que queremos validar (data)
// 2. Una función que dice SI es válido o no (validacion)
// 3. El mensaje de error si falla
const ejecutaValidacion = (data, validacion, mensajedeError) =>
  // Si la función validacion devuelve true → devolvemos el dato limpio
  // Si devuelve false → devolvemos un objeto { error: "mensaje" }
  validacion(data) ? data : { error: mensajedeError };

app.route('/productos')
  .get((req, res) => {
    // Simplemente devuelve TODOS los productos en JSON
    res.json(productos);
  })

  .post((req, res) => {
    // 1. Extraemos titulo y precio del cuerpo de la petición (req.body)
    // Esto se llama "destructuring" → forma moderna y limpia de sacar variables
    const { titulo, precio } = req.body;

    // 2. Creamos el nuevo producto (aún sin validar)
    const nuevoProducto = {
      id: uuidv4(),     // ID único automático
      titulo: titulo,   // ← aquí todavía no sabemos si es válido
      precio: precio
    };

    // 3. Validamos el título usando nuestra función reutilizable
    const valida_titulo = ejecutaValidacion(
      titulo,                           // el dato a validar
      data => data && data.length > 3,  // función anónima (arrow function)
                                        // data && → comprueba que no sea null/undefined
                                        // data.length > 3 → mínimo 4 caracteres
      'Mínimo de 4 carácteres'          // mensaje si falla
    );

    // 4. Si la validación falló → respondemos con error 400 (Bad Request)
    // y paramos la ejecución con return
    if (valida_titulo.error) {
      res.status(400).send(valida_titulo.error);
      return;   // ← muy importante: evita que siga ejecutando el resto
    }

const valida_precio = ejecutaValidacion(
      precio,
      // Regla: debe existir, ser número y ser > 0.1
      data => {
        // Convertimos a número por si viene como string ("12.50")
        const num = Number(data);
        // Comprobamos que sea un número válido y mayor que 0.1
        return !isNaN(num) && num > 0.1;
      },
      'El precio debe ser un número mayor que 0.1 €'
    );

    if (valida_precio.error) {
      return res.status(400).send(valida_precio.error);
    }







    // 5. Si llegamos aquí → el título está bien → guardamos el producto
    productos.push(nuevoProducto);

    // 6. Respondemos con 201 Created + el producto nuevo
    res.status(201).json(nuevoProducto);
  });

app.get('/', (req, res) => {
  res.send('Backend productos');
});

app.listen(3000, () => {
  console.log('Activado localhost:3000.');
});