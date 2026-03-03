// 1. Importamos express → framework para crear el servidor y las rutas
import express from 'express';

// 2. Importamos la función uuidv4 → genera IDs únicos (como un DNI aleatorio)
import { v4 as uuidv4 } from 'uuid';

// 3. Creamos la aplicación/servidor express
const app = express();

// 4. Le decimos a express: "entiende cuerpos JSON que vengan en las peticiones POST/PUT"
app.use(express.json());

// Quitamos el array que estaba aquí
// const productos = [ ... ]   ← BORRAR ESTO

// Añadimos esta línea al principio (después de los imports)
import { productos } from './database.js';
// 6. Definimos la ruta /productos que sabe responder a GET y POST
app.route('/productos')
  // ── GET /productos ──→ devuelve TODOS los productos
  .get((req, res) => {
    res.json(productos);           // envía el array como JSON (formato estándar API)
  })

  // ── POST /productos ──→ crea un producto nuevo
  .post((req, res) => {
    // Extraemos SOLO lo que nos interesa del cuerpo de la petición
    const { titulo, precio } = req.body;

    // Creamos el nuevo objeto producto
    const nuevoProducto = {
      id: uuidv4(),       // ID único generado automáticamente
      titulo: titulo,
      precio: precio
    };

    // Lo añadimos al array (esto es lo que simula "guardar en base de datos")
    productos.push(nuevoProducto);

    // Respondemos con código 201 (Created) + el producto recién creado
    res.status(201).json(nuevoProducto);
  });

// 7. Ruta raíz solo para probar que el servidor está vivo
app.get('/', (req, res) => {
  res.send('Backend productos');
});

// 8. Arrancamos el servidor en el puerto 3000
app.listen(3000, () => {
  console.log('Activado localhost:3000.');
});