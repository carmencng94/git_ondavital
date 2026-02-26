// 1) Importamos la librería Express
//    Esto debe ser SIEMPRE lo primero (o casi lo primero)
const express = require('express')

// 2) Creamos la aplicación/servidor
//    Aquí nace la variable "app"
const app = express()

// 3) Configuramos middlewares (si los necesitamos)
//    En este caso solo urlencoded para futuros POST
app.use(express.urlencoded({ extended: true }))

// 4) Definimos las rutas ANTES de arrancar el servidor
app.get('/iva/', (req, res) => {
    
    const precioSinIVA = Number(req.query.precio) || 0;
    const tasaIVA = 21;
    const porcentaje = tasaIVA / 100;
    
    const iva = precioSinIVA * porcentaje;
    const total = precioSinIVA + iva;
    
    const html = `
        <h1>Calculadora IVA 21%</h1>
        <p>Precio sin IVA: ${precioSinIVA.toFixed(2)} €</p>
        <p>IVA (${tasaIVA}%): ${iva.toFixed(2)} €</p>
        <hr>
        <h2>Total a pagar: ${total.toFixed(2)} €</h2>
        <p><a href="/iva/?precio=100">Probar con 100 €</a></p>
    `;
    
    res.send(html);
})

// 5) SOLO AL FINAL arrancamos el servidor
//    ¡¡¡Aquí es donde se usa app.listen()!!!
app.listen(5000, () => {
    console.log('Servidor escuchando en http://localhost:5000')
    console.log('Prueba: http://localhost:5000/iva/?precio=120')
})