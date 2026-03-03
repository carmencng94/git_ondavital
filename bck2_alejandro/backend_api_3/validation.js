export const ejecutaValidacion = (data, validacion, mensajeDeError) =>
  validacion(data)
    ? { ok: true, value: data }
    : { error: mensajeDeError };

export const validaTitulo = (titulo) =>
  ejecutaValidacion(
    titulo,
    data => data && typeof data === 'string' && data.length > 3,
    'Minimo de 4 caracteres'
  );

export const validaPrecio = (precio) =>
  ejecutaValidacion(
    precio,
    data => typeof data === 'number' && !Number.isNaN(data) && data > 0.05,
    'Minimo 0.1 euros'
  );

export default {
  ejecutaValidacion,
  validaTitulo,
  validaPrecio
};