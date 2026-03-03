# 1. Importamos Flask → el framework equivalente a Express en Python
from flask import Flask, jsonify, request

# 2. Importamos nuestra "base de datos" en memoria (array de productos)
#    Suponemos que existe un archivo database.py con: productos = [...]
from database import productos

# 3. Importamos uuid para generar IDs únicos (equivalente a uuidv4 en JS)
import uuid

# 4. Creamos la aplicación Flask (similar a const app = express())
app = Flask(__name__)

# 5. Definimos la función de validación reutilizable (como ejecutaValidacion en JS)
#    En Python se usa if ternario (expresión condicional)
def ejecuta_validacion(data, validacion, mensaje_error):
    # Si validacion(data) es True → devuelve data
    # Si False → devuelve diccionario con error
    return data if validacion(data) else {'error': mensaje_error}

# 6. Definimos la ruta /productos que acepta GET y POST
#    methods=['GET', 'POST'] → indica qué verbos HTTP acepta
@app.route('/productos', methods=['GET', 'POST'])
def handle_productos():
    # request.method → nos dice si es GET o POST
    if request.method == 'GET':
        # jsonify → convierte el array/diccionario a JSON y pone Content-Type correcto
        return jsonify(productos)
    
    if request.method == 'POST':
        # request.get_json() → lee el body JSON (equivalente a req.body en Express)
        data = request.get_json()
        
        # .get() → accede a claves de forma segura (devuelve None si no existe)
        titulo = data.get('titulo')
        precio = data.get('precio')   # ← nota: en este código NO se usa precio aún
        
        # Creamos el nuevo producto (solo con id y titulo en esta versión)
        nuevo_producto = {
            'id': str(uuid.uuid4()),   # uuid.uuid4() genera UUID → lo convertimos a string
            'titulo': titulo
        }
        
        # Validamos el título con lambda (función anónima en Python)
        valida_titulo = ejecuta_validacion(
            titulo,
            lambda data: data and len(data) > 3,   # lambda = función corta sin nombre
                                                   # data and → comprueba que no sea None/False
                                                   # len(data) > 3 → mínimo 4 caracteres
            'Mínimo de 4 caracteres'
        )
        
        # Si hay error → devolvemos JSON con el mensaje + status 400
        if 'error' in valida_titulo:
            return jsonify(valida_titulo['error']), 400
        
        # Si todo OK → añadimos al array y respondemos 201 + el producto
        productos.append(nuevo_producto)
        return jsonify(nuevo_producto), 201

# 7. Ruta raíz simple
@app.route('/')
def home():
    return 'Backend productos'

# 8. Bloque principal: solo se ejecuta si este archivo se corre directamente
#    (no si se importa como módulo)
if __name__ == '__main__':
    # app.run() → arranca el servidor en localhost:3000
    # debug=True se usa mucho en desarrollo (muestra errores detallados)
    app.run('localhost', 3000)   # o app.run(debug=True) para más info