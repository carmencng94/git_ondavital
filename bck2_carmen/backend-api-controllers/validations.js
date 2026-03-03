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