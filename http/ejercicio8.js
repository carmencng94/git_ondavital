/*¡Perfecto! Vamos con el **Ejercicio 8** del segundo documento.

El ejercicio 8 dice:

> **Ejercicio 8)** Pide, a un experto en Backend, (perplexity, chatGPT, character.AI…. )  
> Qué diferencias hay entre mensajes de tipo GET y de tipo POST

Como soy tu profesor de backend aquí, voy a explicártelo de forma clara, ordenada y con ejemplos prácticos, como si estuviéramos en clase.  
El objetivo es que entiendas las diferencias **de verdad** y que sepas cuándo usar cada uno (esto es fundamental para los ejercicios siguientes).

### Diferencias entre GET y POST – Explicación completa y práctica

| #  | Característica                     | GET                                      | POST                                      | ¿Por qué importa? / Cuándo usar cada uno |
|----|------------------------------------|------------------------------------------|-------------------------------------------|-------------------------------------------|
| 1  | **Método HTTP**                    | GET                                      | POST                                      | Es el verbo que indica la intención       |
| 2  | **Dónde van los datos**            | En la **URL** (query string: ?clave=valor) | En el **cuerpo** (body) de la petición    | Seguridad y tamaño de datos               |
| 3  | **Visibilidad de los datos**       | Visible en la barra de direcciones, historial del navegador, logs del servidor | No visible en la URL (solo en el cuerpo)  | GET → nunca datos sensibles                |
| 4  | **Tamaño máximo de datos**         | Limitado (≈ 2000–8000 caracteres según navegador/servidor) | Mucho mayor (depende del servidor, MB o GB) | POST para formularios largos, archivos, JSON grande |
| 5  | **Es idempotente / seguro repetir** | Sí (repetir la petición no cambia nada en el servidor) | No (repetir puede crear duplicados: 2 pedidos, 2 registros…) | GET para consultas, POST para crear/modificar |
| 6  | **Se puede cachear**               | Sí (navegadores y proxies pueden guardar la respuesta) | No (normalmente no se cachea)             | GET para búsquedas, listas públicas       |
| 7  | **Se puede guardar en favoritos / compartir enlace** | Sí                                       | No                                        | GET para páginas que quieres compartir    |
| 8  | **Ejemplo típico**                 | Buscar productos, ver perfil, filtrar lista | Login, registro, subir foto, enviar comentario, comprar | — |
| 9  | **Cómo se ve en el navegador**     | http://localhost:5000/saludo/?nombre=Juan | No se puede escribir directamente en la barra | GET → fácil de probar en navegador        |
|10  | **Dónde llegan los datos al servidor** | `req.query`                              | `req.body`                                | Diferente objeto en Express               |

### Ejemplos reales con el código que ya hemos visto

**Ejemplo GET (como en ejercicio 6)**

```js
app.get('/despedida/', (req, res) => {
    const nombre = req.query.nombre || 'amigo';
    res.send(`Adios! ${nombre}`);
});
```

URL de prueba:  
`http://localhost:5000/despedida/?nombre=Mercedes`

→ Los datos van en la URL → visibles → seguros para repetir → ideales para consultas

**Ejemplo POST (como en el servidor de bienvenida que hicimos para el ejercicio 7)**

```js
app.post('/bienvenida/', (req, res) => {
    const nombre = req.body.nombre || 'amigo';
    res.send(`¡Hola! ${nombre}, bienvenid@`);
});
```

En Insomnia / Postman:
- Método: POST
- Body → Form URL Encoded → `nombre = maria`

→ Los datos van ocultos en el cuerpo → no quedan en el historial → ideales para datos sensibles o acciones que modifican algo

### Reglas prácticas que debes grabarte (para toda tu carrera)

| Situación real                              | Usa…   | Razón principal                              |
|---------------------------------------------|--------|----------------------------------------------|
| Buscar, filtrar, ordenar, paginar           | GET    | Es una consulta, no cambia nada              |
| Enviar formulario de registro / login      | POST   | Datos sensibles (email, contraseña)          |
| Subir foto, archivo, documento              | POST   | GET no soporta archivos grandes              |
| Crear un nuevo usuario, pedido, comentario  | POST   | Acción que crea/modifica datos               |
| Modificar datos existentes (editar perfil)  | PUT o PATCH | (más adelante veremos estas)                 |
| Eliminar algo                               | DELETE | Acción destructiva                           |

### Preguntas para pensar y afianzar (responde mentalmente o escríbelas)

1. ¿Por qué nunca debes poner una contraseña en una URL con GET?  
2. Si haces un login con GET → ¿qué problemas de seguridad tendría?  
3. ¿Por qué los motores de búsqueda usan GET para las búsquedas?  
4. Si un usuario refresca la página (F5) después de un POST de compra → ¿qué podría pasar?  
5. ¿En qué objeto de Express llegan los datos de GET? ¿Y los de POST?

Cuando hayas pensado en estas preguntas (o si quieres que las resolvamos juntos), dime y pasamos al **Ejercicio 9** (que combina GET y POST en el mismo servidor).

¿Quieres que resolvamos alguna de estas preguntas ahora o seguimos directo al 9? 

¿Por qué nunca debes poner una contraseña en una URL con GET?
Si haces un login con GET → ¿qué problemas de seguridad tendría?
¿Por qué los motores de búsqueda usan GET para las búsquedas?
Si un usuario refresca la página (F5) después de un POST de compra → ¿qué podría pasar?
¿En qué objeto de Express llegan los datos de GET? ¿Y los de POST?
¿Por qué nunca debes poner una contraseña en una URL con GET?
Respuesta:
Porque los datos enviados por GET quedan visibles y registrados en muchos sitios:

En la barra de direcciones del navegador → cualquiera que mire la pantalla lo ve
En el historial del navegador → queda guardado para siempre (a menos que borres el historial)
En los logs del servidor (muchos servidores guardan la URL completa)
En los logs de proxies o firewalls de la empresa/red
En las referencias (cuando haces clic en otro enlace, la URL anterior puede enviarse como Referer)

Ejemplo peligroso:
texthttp://tutienda.com/login?usuario=juan&password=MiClave123
→ Cualquiera que vea el historial, o que mire por encima del hombro, o que revise los logs del servidor, ve la contraseña.
Regla de oro #1:
Nunca uses GET para datos sensibles (contraseñas, tokens, números de tarjeta, DNI, emails privados, etc.).
Usa siempre POST para estos casos.
Pregunta 2
Si haces un login con GET → ¿qué problemas de seguridad tendría?
Problemas principales:

Exposición de credenciales (como en la pregunta 1)
Ataque CSRF más fácil (aunque no es el principal problema aquí)
Facilidad para phishing → un atacante puede crear un enlace malicioso que incluya credenciales robadas
No se puede usar doble submit cookie ni tokens CSRF fácilmente (POST permite más protecciones)
Historial y autocompletado → el navegador puede guardar el usuario y contraseña en el autocompletado

Ejemplo real de ataque:
Un atacante envía por WhatsApp o email un enlace:
texthttp://tutienda-falsa.com/login?usuario=victima@gmail.com&password=123456
Si la víctima hace clic (por curiosidad o por error) → envía sus credenciales reales al servidor falso.
Conclusión:
Login = siempre POST (y con HTTPS obligatorio)
Pregunta 3
¿Por qué los motores de búsqueda usan GET para las búsquedas?
Porque las búsquedas son operaciones de solo lectura (idempotentes y seguras):

Puedes repetir la búsqueda 100 veces → no pasa nada
Puedes compartir el enlace → el amigo ve exactamente lo mismo
Puedes ponerlo en favoritos
Puedes cachear la página (Google lo hace mucho)
La URL representa el estado de la búsqueda → es útil

Ejemplo típico:
texthttps://www.google.com/search?q=como+aprender+express+nodejs
→ Puedes copiar ese enlace y enviárselo a alguien → funciona perfecto.
Si fuera POST → no podrías compartir el enlace directamente.
Regla práctica:
Si la acción es consultar / leer / buscar / filtrar / ordenar → GET
Si la acción es crear / modificar / eliminar / enviar datos sensibles → POST
Pregunta 4
Si un usuario refresca la página (F5) después de un POST de compra → ¿qué podría pasar?
Problema clásico llamado doble envío o reenvío de formulario:
El navegador muestra un aviso:
"¿Quieres reenviar los datos del formulario?"
Si el usuario dice Sí → el servidor recibe otro POST idéntico → puede:

Crear dos pedidos en vez de uno
Enviar dos emails de confirmación
Cobrar dos veces la tarjeta (si no hay controles)
Duplicar comentarios, likes, registros, etc.

Soluciones habituales (que verás más adelante):

Patrón PRG (Post/Redirect/Get)
Después del POST exitoso → redirigir (res.redirect('/exito'))
→ el F5 refresca la página de éxito (GET) → no reenvía datos
Tokens anti-duplicado (unique transaction ID)
Mensajes flash + comprobación de estado

Ejemplo simple con Express:
JavaScriptapp.post('/comprar', (req, res) => {
    // procesar pago...
    // guardar pedido...
    res.redirect('/compra-exitosa');   // ← evita el reenvío
});
Pregunta 5
¿En qué objeto de Express llegan los datos de GET? ¿Y los de POST?

GET → datos en la URL (query string) → llegan en:
req.queryEjemplo: /despedida/?nombre=Mercedes&edad=30
→ req.query = { nombre: 'Mercedes', edad: '30' }
POST → datos en el cuerpo de la petición → llegan en:
req.bodyEjemplo: body con nombre=maria (form-urlencoded)
→ req.body = { nombre: 'maria' }

Resumen tabla rápida para recordar siempre:


























MétodoDónde van los datosObjeto en ExpressEjemplo de accesoVisible en URL?GETQuery string (?...)req.queryreq.query.nombreSíPOSTCuerpo (body)req.bodyreq.body.nombreNo
*/