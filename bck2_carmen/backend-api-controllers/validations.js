/*
// ──────────────────────────────────────────────────────────────
// 1. Función genérica para cualquier validación
// Recibe: dato, función de regla, mensaje de error
export const ejecutaValidacion = (data, validacion, mensajeDeError) =>
  // Ternario: si pasa la regla → { ok: true, value: data }
  // Si falla → { error: "mensaje" }
  // Base sólida: esto permite devolver "dato limpio" o error de forma consistente
  validacion(data) ? { ok: true, value: data } : { error: mensajeDeError };

// ──────────────────────────────────────────────────────────────
// 2. Validación específica para título
export const validaTitulo = (titulo) =>
  ejecutaValidacion(
    titulo,
    // Regla: existe, es string y longitud > 3 (mínimo 4 chars)
    // Base sólida: typeof para tipo correcto + length para tamaño
    data => data && typeof data === 'string' && data.length > 3,
    'Mínimo de 4 carácteres'
  );

// ──────────────────────────────────────────────────────────────
// 3. Validación específica para precio
export const validaPrecio = (precio) =>
  ejecutaValidacion(
    precio,
    // Regla: es number, no NaN y > 0.05 (mínimo 0.1 €, pero dice 6.1? – parece typo, usamos 0.1)
    // Base sólida: !Number.isNaN para números inválidos (ej: "abc" → NaN)
    data => typeof data === 'number' && !Number.isNaN(data) && data > 0.05,
    'Mínimo 0.1 euros'  // Corregimos el typo del PDF "6.1" a 0.1
  );

// 4. Export default → permite importar todo como objeto (opcional, pero útil)
export default {
  ejecutaValidacion,
  validaTitulo,
  validaPrecio
};
/*/

// validations.js
// ──────────────────────────────────────────────────────────────
// Usamos Joi para validaciones declarativas y potentes
import Joi from 'joi';

// 1. Esquema solo para el título (se puede reutilizar en cualquier sitio)
const tituloSchema = Joi.string()           // debe ser string
  .min(4)                                   // mínimo 4 caracteres
  .required()                               // obligatorio
  .messages({                               // mensajes en español (base sólida)
    'string.empty': 'El título no puede estar vacío',
    'string.min': 'El título debe tener al menos 4 caracteres',
    'any.required': 'El título es obligatorio'
  });

// 2. Esquema solo para el precio
const precioSchema = Joi.number()           // debe ser número
  .min(0.1)                                 // mínimo 0.1 €
  .required()                               // obligatorio
  .messages({
    'number.base': 'El precio debe ser un número',
    'number.min': 'El precio debe ser mayor o igual a 0.1 €',
    'any.required': 'El precio es obligatorio'
  });

// 3. Funciones que validan y devuelven el resultado de Joi
//    (exactamente como pide el ejercicio 2)
export const validaTitulo = (titulo) => {
  return tituloSchema.validate(titulo);     // devuelve { error, value }
};

export const validaPrecio = (precio) => {
  return precioSchema.validate(precio);
};

// Export default opcional (por si quieres importar todo junto)
export default {
  validaTitulo,
  validaPrecio
};