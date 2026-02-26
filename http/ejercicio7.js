// 1) Importamos Express → librería principal para crear servidores web en Node.js
const express = require('express');

// 2) Creamos la instancia de nuestra aplicación/servidor
const app = express();

// 3) Middleware muy importante #1
//    Permite leer cuerpos de peticiones que vienen en formato JSON
//    (muy común en APIs modernas: { "nombre": "Maria" })
app.use(express.json());

// 4) Middleware muy importante #2
//    Permite leer cuerpos de peticiones tipo formulario HTML clásico
//    (application/x-www-form-urlencoded → nombre=Maria&edad=25)
app.use(express.urlencoded({ extended: true }));

// 5) Ruta POST /bienvenida/
//    Solo se activa cuando llega una petición POST a esta URL
app.post('/bienvenida/', (req, res) => {
    // 6) req.body → aquí llegan los datos enviados en el CUERPO de la petición
    //    (no en la URL como en GET)
    //    Gracias a los middlewares de arriba, req.body ya está parseado
    console.log('Datos recibidos en el servidor:', req.body);

    // 7) Creamos el mensaje de bienvenida usando el nombre que nos enviaron
    //    Si no viene nombre → usamos "amigo" como valor por defecto
    const nombre = req.body.nombre || 'amigo';
    const mensaje = `¡Hola! ${nombre}, bienvenid@ a mi servidor 😊`;

    // 8) Enviamos la respuesta al cliente (navegador, Insomnia, Postman...)
    res.send(mensaje);
});

// 9) Ruta de ayuda (GET) en la raíz para que sepas qué hacer cuando entras
app.get('/', (req, res) => {
    res.send(`
        <h2>Este servidor tiene una ruta POST</h2>
        <p>Prueba enviar un POST a: <code>http://localhost:5000/bienvenida/</code></p>
        <p>Usa Insomnia o Postman con body tipo <strong>x-www-form-urlencoded</strong></p>
        <ul>
            <li>nombre: Maria</li>
        </ul>
        <p>O con JSON: { "nombre": "Lucía" }</p>
    `);
});

// 10) Arrancamos el servidor (SIEMPRE al final del archivo)
app.listen(5000, () => {
    console.log('Servidor listo → http://localhost:5000');
    console.log('Prueba POST → /bienvenida/');
});