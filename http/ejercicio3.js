const express = require('express')
const app = express()
app.use(express.urlencoded({extended: true}))
app.post('/saludo/', (req, res) => {
const nombre = req.body.nombre || "amigo"
const edad = req.body.edad || "?"
const cadena = `Hola! ${nombre} tienes ${edad} años`
res.send(cadena)
})
app.get('/', (req, res) => {
res.send(`<h2>Esta ruta es POST → no funciona en el navegador directamente</h2>
        <p>Usa Postman, Insomnia o un formulario HTML con method="post"</p>
        <p>Ejemplo de body (x-www-form-urlencoded):</p>
        <ul>
            <li>nombre: Carlos</li>
            <li>edad: 33</li>
        </ul>
`);
});
app.listen(5000, () => console.log('Server ready on localhost:5000'))