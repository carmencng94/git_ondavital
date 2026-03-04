// validations.js
// ──────────────────────────────────────────────────────────────
// Import Joi – validación declarativa.
// Base sólida: Joi reduce ifs manuales – potente para tipos/reglas complejas.
import Joi from 'joi';

// ──────────────────────────────────────────────────────────────
// Schemas base (título/precio) – de ej. 2.
// Base sólida: .messages() para UX – errores en español.
const tituloSchema = Joi.string().min(4).required().messages({
  'string.empty': 'El título no puede estar vacío',
  'string.min': 'El título debe tener al menos 4 caracteres',
  'any.required': 'El título es obligatorio'
});

const precioSchema = Joi.number().min(0.1).required().messages({
  'number.base': 'El precio debe ser un número',
  'number.min': 'El precio debe ser mayor o igual a 0.1 €',
  'any.required': 'El precio es obligatorio'
});

// ── NUEVOS PARA EJ. 4 ──────────────────────────────────────────
// Descripcion – min 10, optional.
// Base sólida: .optional() – flexible, no falla si ausente.
const descripcionSchema = Joi.string().min(10).optional().messages({
  'string.min': 'La descripción debe tener al menos 10 caracteres',
  'string.base': 'La descripción debe ser texto'
});

// Pais – length 2, required.
// Base sólida: .length() para códigos fijos (ISO).
const paisSchema = Joi.string().length(2).required().messages({
  'string.length': 'El país debe ser un código de 2 letras (ej: "ES")',
  'any.required': 'El país es obligatorio',
  'string.base': 'El país debe ser texto'
});

// ──────────────────────────────────────────────────────────────
// Funciones – validan y retornan { error, value }.
// Base sólida: Wrappers – encapsulan schemas para reusar.
export const validaTitulo = (titulo) => tituloSchema.validate(titulo);
export const validaPrecio = (precio) => precioSchema.validate(precio);
export const validaDescripcion = (descripcion) => descripcionSchema.validate(descripcion);
export const validaPais = (pais) => paisSchema.validate(pais);

// Default export – objeto.
export default {
  validaTitulo,
  validaPrecio,
  validaDescripcion,
  validaPais
};