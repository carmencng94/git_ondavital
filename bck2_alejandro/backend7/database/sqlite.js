import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export async function crearBaseDatos() {
  const db = await open({
    filename: './database/productos.db',
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS productos (
      id TEXT PRIMARY KEY,
      titulo TEXT NOT NULL,
      precio REAL NOT NULL
    )
  `);

  return db;
}

export async function agregarSeisProductos() {
  const db = await crearBaseDatos();

  const productos = [
    { id: 'A001', titulo: 'Monitor 27', precio: 300 },
    { id: 'A002', titulo: 'CPU-Zi', precio: 100 },
    { id: 'A003', titulo: 'Micrófono', precio: 24 },
    { id: 'A004', titulo: 'Teclado mecánico', precio: 55 },
    { id: 'A005', titulo: 'Webcam HD', precio: 45 },
    { id: 'A006', titulo: 'Auriculares', precio: 70 }
  ];

  const insertSQL = `
    INSERT OR IGNORE INTO productos (id, titulo, precio)
    VALUES (?, ?, ?)
  `;

  const stmt = await db.prepare(insertSQL);

  for (const p of productos) {
    await stmt.run(p.id, p.titulo, p.precio);
  }

  await stmt.finalize();

  return productos;
}

export async function leerTodosLosProductos() {
  const db = await crearBaseDatos();
  return db.all('SELECT * FROM productos');
}