const express = require("express")
const app = express()
app.get("/", (req, res) => {
const cadena = `Hola!, esto marcha`
res.send(cadena)
})
app.listen(5000, () => console.log("Ir a http://localhost:5000"))