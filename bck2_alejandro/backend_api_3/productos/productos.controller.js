import { productos } from '../database/productos.js';

const encontrarProducto = (identificador) => {
  const productoEncontrado = productos.find(
    producto => producto.id == identificador
  );
  return productoEncontrado;
};

export { encontrarProducto };