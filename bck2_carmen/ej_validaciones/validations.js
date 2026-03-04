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