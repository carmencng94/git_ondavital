import { productos } from '../database/productos.js';

const verTodosProductos = () => {
  return productos;
};

const crearNuevoProducto = (nuevoProducto) => {
  productos.push(nuevoProducto);
  return nuevoProducto;
};

const encontrarProducto = (identificador) => {
  const productoEncontrado = productos.find(producto => producto.id == identificador);
  return productoEncontrado;
};

const borrarProducto = (identificador) => {
  const indice = productos.findIndex(producto => producto.id == identificador);
  return indice;
};

export {
  verTodosProductos,
  crearNuevoProducto,
  encontrarProducto,
  borrarProducto
};