// database/sqlite.js
// ──────────────────────────────────────────────────────────────
// Librerías para SQLite – file-based BD.
// Base sólida: sqlite3 low-level, sqlite wrapper async – usa promises para Node async.
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// ── Crear BD y tabla ──
// async function – base sólida: BD IO es async, evita block.
export async function crearBaseDatos() {
  // open() – abre/crea file productos.db.
  // Base sólida: driver sqlite3 – verbose para debug opcional.
  const db = await open({
    filename: './database/productos.db',  // Path relativo – crea file si no existe.
    driver: sqlite3.Database
  });

  // db.exec() – ejecuta SQL no-query (CREATE).
  // Base sólida: IF NOT EXISTS – idempotente (seguro correr múltiples veces).
  await db.exec(`
    CREATE TABLE IF NOT EXISTS productos (
      id TEXT PRIMARY KEY,    // TEXT para UUID string – base sólida: PK única.
      titulo TEXT NOT NULL,   // NOT NULL – fuerza requerido en BD nivel.
      precio REAL NOT NULL    // REAL para floats (precios con decimales).
    )
  `);

  return db;  // Retorna db – reutilizable en otras funciones.
}

// ── Añadir 6 productos iniciales ──
export async function agregarSeisProductos() {
  const db = await crearBaseDatos();  // Reusa db – base sólida: no abrir/cerrar cada vez (eficiente).

  // Array datos seed.
  // Base sólida: Datos fijos para test – en prod, usa migrations (Knex/Prisma).
  const productos = [
    { id: 'A001', titulo: 'Monitor 27', precio: 300 },
    { id: 'A002', titulo: 'CPU-Zi', precio: 100 },
    { id: 'A003', titulo: 'Micrófono', precio: 24 },
    { id: 'A004', titulo: 'Teclado mecánico', precio: 55 },
    { id: 'A005', titulo: 'Webcam HD', precio: 45 },
    { id: 'A006', titulo: 'Auriculares', precio: 70 }
  ];

  // SQL insert – OR IGNORE evita duplicados (por PK id).
  // Base sólida: Prepared statements (?) – previenen SQL injection.
  const insertSQL = `
    INSERT OR IGNORE INTO productos (id, titulo, precio)
    VALUES (?, ?, ?)
  `;

  // db.prepare() – statement reutilizable.
  // Base sólida: Loop async – await cada run para secuencial (aunque batch posible).
  const stmt = await db.prepare(insertSQL);
  for (const p of productos) {
    await stmt.run(p.id, p.titulo, p.precio);  // Bind params ? – seguro.
  }
  await stmt.finalize();  // Cierra statement – libera recursos.

  return productos;  // Retorna para log/test.
}

// ── Leer todos ──
export async function leerTodosLosProductos() {
  const db = await crearBaseDatos();
  // db.all() – query con rows – base sólida: all para arrays completos.
  return db.all('SELECT * FROM productos');
}