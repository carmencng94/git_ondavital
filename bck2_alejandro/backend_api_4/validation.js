export const ejecutaValidacion = (data, validacion, mensajeDeError) =>
  validacion(data) ? { ok: true, value: data } : { error: mensajeDeError };

export const validaTitulo = (titulo) =>
  ejecutaValidacion(
    titulo,
    data => data && typeof data === 'string' && data.length > 3,
    'Mínimo de 4 carácteres'
  );

export const validaPrecio = (precio) =>
  ejecutaValidacion(
    precio,
    data => typeof data === 'number' && !Number.isNaN(data) && data > 0.05,
    'Mínimo 0.1 euros'
  );

export default {
  ejecutaValidacion,
  validaTitulo,
  validaPrecio
};