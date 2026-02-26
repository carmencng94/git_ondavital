const express = require('express')
const app = express()
app.use(express.urlencoded({extended: true}))
app.get('/saludo/', (req, res) => {
const cadena = `Hola! ${req.query.nombre}`
res.send(cadena)
})
app.listen(5000, () =>
console.log('Escribir en navegador:    localhost:5000/saludo/?nombre=Juan'))