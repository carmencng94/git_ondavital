// validaciones.js
// Funciones de validación reutilizables para productos

export const ejecutaValidacion = (data, validacion, mensajedeError) =>
  validacion(data) ? data : { error: mensajedeError };

export const validaTitulo = (titulo) =>
  ejecutaValidacion(
    titulo,
    data => data && typeof data === 'string' && data.trim().length > 3,
    'El título debe tener al menos 4 caracteres'
  );

export const validaPrecio = (precio) =>
  ejecutaValidacion(
    precio,
    data => {
      const num = Number(data);
      return !isNaN(num) && num > 0.1;
    },
    'El precio debe ser un número mayor que 0.1 €'
  );
