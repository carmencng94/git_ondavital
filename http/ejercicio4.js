const express = require('express')
const app = express()
app.use(express.urlencoded({ extended: true }))
app.get('/convierte/', (req, res) => {
const dolares = Number(req.query.dolares)
const tasaCambio = 0.83
const euros = dolares * tasaCambio
const respuestaHTML = `
        <html>
        <head>
            <title>Conversor Dólares → Euros</title>
            <style>
                body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
                h1 { color: #2c3e50; }
                .resultado { font-size: 2.5em; color: #27ae60; font-weight: bold; }
                .info { color: #7f8c8d; font-size: 1.1em; }
            </style>
        </head>
        <body>
            <h1>Conversor de Dólares a Euros</h1>
            
            <p class="info">Has introducido: <strong>${dolares} USD</strong></p>
            
            <p class="resultado">
                ${euros.toFixed(2)} € 
            </p>
            
            <p class="info">
                (Tasa aproximada: 1 USD = ${tasaCambio} EUR)<br>
                Fecha aproximada: 2025-2026
            </p>
            
            <br><br>
            <p>Prueba con otra cantidad: 
            <a href="/convierte/?dolares=50">50 USD</a> | 
            <a href="/convierte/?dolares=200">200 USD</a> | 
            <a href="/convierte/?dolares=1000">1000 USD</a>
            </p>
        </body>
        </html>
    `;
res.send(respuestaHTML)
})
app.listen(5000, () => console.log('Server ready on localhost:5000'))