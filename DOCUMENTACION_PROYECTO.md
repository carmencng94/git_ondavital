# Documentación del Proyecto y Guía de Git

## Índice
1. Estructura del Proyecto
2. Explicación de Archivos Principales
3. Funcionamiento de Git
4. Trabajo con Ramas y Colaboración
5. Errores Comunes y Soluciones

---

## 1. Estructura del Proyecto

- **backend_api/**: Lógica de negocio (por ejemplo, productos.controller.js)
- **bck2_carmen/**: Proyecto Express con rutas y "base de datos" en memoria
- **http/**: Prácticas y ejercicios con Express y Node.js
- **git/**: Documentos y archivos relacionados con control de versiones

---

## 2. Explicación de Archivos Principales

### backend_api/productos/productos.controller.js
- Simula una base de datos con un array de productos.
- Exporta la función `obtenerListaProductos` para ser usada en otros módulos.

### bck2_carmen/app.js y database.js
- Usa import/export (ES6).
- `database.js` exporta un array de productos.
- `app.js` importa productos y define rutas con Express para obtener y crear productos.

### http/app.js
- Servidor Express básico que responde con "Hola!, esto marcha" en la ruta raíz.

### http/ejercicio_1.js a ejercicio9.js
- Cada archivo es un ejemplo de servidor Express con distintas rutas y funcionalidades (saludos, POST/GET, conversión de moneda, cálculo de IVA, etc.).

---

## 3. Funcionamiento de Git

Git es un sistema de control de versiones distribuido. Permite:
- Guardar el historial de cambios de tu proyecto.
- Trabajar en equipo sin sobrescribir el trabajo de otros.
- Volver a versiones anteriores si algo sale mal.

### Comandos Básicos
- `git status`: Muestra el estado del repositorio.
- `git add .`: Añade todos los archivos nuevos/modificados al área de staging.
- `git commit -m "mensaje"`: Guarda los cambios en el historial local.
- `git push`: Sube los cambios al repositorio remoto.
- `git pull`: Trae los cambios del repositorio remoto a tu copia local.

---

## 4. Trabajo con Ramas y Colaboración

### ¿Qué es una rama?
Una rama es una línea de desarrollo independiente. Permite trabajar en nuevas funcionalidades sin afectar el código principal.

### Crear y Cambiar de Rama
- Crear una rama: `git branch nombre-rama`
- Cambiar de rama: `git checkout nombre-rama`
- Crear y cambiar en un solo paso: `git checkout -b nombre-rama`

### Subir una Rama Nueva
- `git push -u origin nombre-rama`

### Fusionar Ramas (merge)
1. Cambia a la rama principal (por ejemplo, main): `git checkout main`
2. Fusiona la rama: `git merge nombre-rama`
3. Si hay conflictos, resuélvelos editando los archivos marcados, luego:
   - `git add archivo-en-conflicto`
   - `git commit`

### Buenas Prácticas para Colaborar
- Haz `pull` antes de empezar a trabajar para tener la última versión.
- Trabaja en ramas para cada funcionalidad o bugfix.
- Haz commits pequeños y descriptivos.
- Revisa los conflictos antes de hacer merge.
- Usa `git status` y `git log` para ver el estado y el historial.

---

## 5. Errores Comunes y Soluciones

- **No se suben carpetas nuevas**: Puede ser porque están vacías, están en `.gitignore`, o no se han añadido con `git add`.
- **Conflictos de ramas**: Ocurren cuando hay cambios incompatibles entre ramas. Se resuelven editando los archivos en conflicto, haciendo `git add` y `git commit`.
- **Error al ejecutar `node app.js`**: Asegúrate de estar en la carpeta correcta y que el archivo exista.
- **Error de import/export**: Si usas import/export en Node.js, asegúrate de que tu `package.json` tenga `"type": "module"` o usa `require/module.exports` para CommonJS.

---

¿Dudas? Consulta este documento o pregunta a tu colaborador/profesor.
