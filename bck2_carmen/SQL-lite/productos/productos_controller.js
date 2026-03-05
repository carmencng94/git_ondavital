// productos/productos.controller.js
import { v4 as uuidv4 } from 'uuid';
import { validaTitulo, validaPrecio } from '../validations.js';

// SQLite helpers
import {
  crearBaseDatos,
  agregarSeisProductos,
  leerTodosLosProductos
} from '../database/sqlite.js';

// ── Funciones que siguen usando memoria (por ahora) ──
const encontrarProducto = (identificador) => {
  // (puedes mantenerlo o cambiarlo a SQLite más adelante)
  console.log('Buscando en memoria (pendiente migrar a SQLite)');
  return null; // placeholder
};

const crearNuevoProducto = (titulo, precio) => {
  const valida_titulo = validaTitulo(titulo);
  const valida_precio = validaPrecio(precio);

  if (valida_titulo.error) return { error: valida_titulo.error };
  if (valida_precio.error) return { error: valida_precio.error };

  const nuevoProducto = {
    id: uuidv4(),
    titulo: titulo,
    precio: precio
  };

  // Aquí en el futuro guardaremos en SQLite
  console.log('Producto creado (todavía en memoria)');
  return nuevoProducto;
};

// ── Funciones SQLite (ya listas) ──
async function verTodosProductosSqlite() {
  return leerTodosLosProductos();
}

async function inicializarSqlite() {
  await crearBaseDatos();
  await agregarSeisProductos();
}

export { 
  encontrarProducto,
  crearNuevoProducto,
  verTodosProductosSqlite,
  inicializarSqlite
};