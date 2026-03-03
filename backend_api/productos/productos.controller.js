// Este archivo contiene la "lógica de negocio" (los datos y funciones)

// Por ahora usamos una lista fija (base de datos de mentira)
const productos = [
  { id: 'A001', titulo: 'Monitor 27',   precio: 300 },
  { id: 'A002', titulo: 'CPU-Zi',       precio: 100 },
  { id: 'A003', titulo: 'Micrófono',    precio:  24 }
];

// Función que devuelve TODA la lista
function obtenerListaProductos() {
  return productos;          // simplemente devolvemos el array
}

// Exportamos SOLO las funciones que queremos usar desde fuera
module.exports = {
  obtenerListaProductos
};