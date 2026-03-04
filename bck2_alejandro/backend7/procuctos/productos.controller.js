import { productos } from '../database/productos.js';
import { v4 as uuidv4 } from 'uuid';
import { validaTitulo, validaPrecio } from '../validations.js';

// sqlite helpers (opcional, el resto del código sigue trabajando en memoria)
import {
  crearBaseDatos,
  agregarSeisProductos,
  leerTodosLosProductos
} from '../database/sqlite.js';

const encontrarProducto = (identificador) => {
  const productoEncontrado = productos.find(producto => producto.id == identificador);
  return productoEncontrado;
};

const borrarProducto = (identificador) => {
  const indice = productos.findIndex(producto => producto.id == identificador);
  return indice;
};

const verTodosProductos = () => {
  return productos;
};

const crearNuevoProducto = (titulo, precio) => {
  const valida_titulo = validaTitulo(titulo);
  const valida_precio = validaPrecio(precio);

  if (valida_titulo.error) {
    return { error: valida_titulo.error };
  }

  if (valida_precio.error) {
    return { error: valida_precio.error };
  }

  const nuevoProducto = {
    id: uuidv4(),
    titulo: titulo,
    precio: precio
  };

  productos.push(nuevoProducto);
  return nuevoProducto;
};

// wrappers para utilizar la base sqlite si alguna vez se desea
// (no son usados actualmente por el router clásico en app.js)

async function inicializarSqlite() {
  await crearBaseDatos();
  await agregarSeisProductos();
}

async function verTodosProductosSqlite() {
  return leerTodosLosProductos();
}

export {
  encontrarProducto,
  borrarProducto,
  verTodosProductos,
  crearNuevoProducto,
  inicializarSqlite,
  verTodosProductosSqlite
};