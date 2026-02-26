// 1) Importamos Express → la librería principal para crear servidores web en Node.js
const express = require('express');

// 2) Creamos la instancia de la aplicación/servidor
//    "app" será el objeto con el que definimos rutas, middlewares, etc.
const app = express();

// 3) Middleware para leer cuerpos JSON (útil para APIs que envían { "clave": "valor" })
app.use(express.json());

// 4) Middleware para leer cuerpos de formularios clásicos (application/x-www-form-urlencoded)
//    extended: true → permite arrays y objetos anidados si los necesitamos
app.use(express.urlencoded({ extended: true }));

// 5) Ruta POST /bienvenida/
//    Solo se activa cuando llega una petición POST a esta ruta
app.post('/bienvenida/', (req, res) => {
    // 6) Mostramos en la consola del servidor qué datos nos han llegado
    //    Esto es muy útil para depurar y entender qué está pasando
    console.log('Datos recibidos por POST:', req.body);

    // 7) Accedemos al campo "nombre" que viene en el CUERPO de la petición
    //    Si no viene nada → usamos "amigo" como valor por defecto (||)
    const nombre = req.body.nombre || 'amigo';

    // 8) Creamos el mensaje de respuesta usando template string (backticks)
    const cadena = `Hola! ${nombre}`;

    // 9) Enviamos la respuesta al cliente (termina la petición)
    res.send(cadena);
});

// 10) Ruta GET /despedida/
//     Se activa cuando alguien entra con GET (navegador, enlace, etc.)
app.get('/despedida/', (req, res) => {
    // 11) Aquí usamos req.query porque los datos vienen en la URL (?nombre=...)
    //     Ejemplo: /despedida/?nombre=Lucia → req.query.nombre = "Lucia"
    const cadena = `Adios! ${req.query.nombre || 'amigo'}`;

    // 12) Enviamos la respuesta
    res.send(cadena);
});

// 13) Arrancamos el servidor en el puerto 5000
//     El callback se ejecuta cuando el servidor está listo para recibir peticiones
app.listen(5000, '127.0.0.1', () => {
    console.log('Server ready on 127.0.0.1:5000');
    console.log('Pruebas:');
    console.log('  - GET  → http://localhost:5000/despedida/?nombre=Juan');
    console.log('  - POST → /bienvenida/ con body: nombre=maria');
});