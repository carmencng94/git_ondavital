// Línea 1 ── Importamos la librería Express
//            Esto solo funciona si ya hiciste: npm install express
const express = require('express')

// Línea 2 ── Creamos la aplicación principal
//            "app" es el objeto que controla TODO el servidor
const app = express()

// Línea 3 ── Middleware para leer cuerpos en formato JSON
//            (útil cuando nos envíen datos tipo { "nombre": "Ana" })
app.use(express.json());

// Línea 4 ── Middleware para leer cuerpos en formato x-www-form-urlencoded
//            (el formato clásico de los formularios HTML: nombre=Juan&edad=25)
//            extended: true → permite datos más complejos (arrays, objetos anidados)
app.use(express.urlencoded({ extended: true }))

// Línea 5-8 ── Definimos una ruta que responde SOLO a peticiones GET
//              Cuando alguien entra a: http://localhost:5000/despedida/?nombre=...
app.get('/despedida/', (req, res) => {
    // req  = request  → toda la información que envía el cliente
    // res  = response → lo que nosotros vamos a devolver

    // req.query → objeto con TODOS los parámetros que vienen después del ?
    // Ejemplo: /despedida/?nombre=Mercedes&edad=30
    //          → req.query = { nombre: "Mercedes", edad: "30" }
    const cadena = `[¡Hasta luego, ${req.query.nombre}! Que tengas un gran día]`
    // Enviamos la cadena como respuesta (texto plano o HTML simple)
    // res.send() termina la petición y envía esto al navegador / Postman
    res.send(cadena)
})

// Línea 9 ── Arrancamos el servidor en el puerto 5000
//            El segundo argumento es un callback que se ejecuta cuando el servidor está listo
app.listen(5000, () => console.log('Server ready on localhost:5000'))