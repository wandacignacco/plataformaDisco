const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();  // Cargar las variables de entorno desde el archivo .env
const cookieParser = require('cookie-parser');
const path = require('path');  // Importamos 'path' para manejar las rutas de archivos
const router = require('./routes'); // Importamos las rutas

const app = express();

// Middleware para procesar JSON
app.use(express.json());

// Servir archivos estáticos desde la carpeta 'frontend'
app.use(express.static(path.join(__dirname, '..', '..', 'frontend')));  // Accedemos a frontend desde dos niveles arriba

// Ruta para servir el archivo HTML en la raíz
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'frontend', 'index.html'));  // Ajusta la ruta para acceder correctamente a 'frontend/index.html'
});

// Usamos las rutas
app.use('/', router);
app.use(cookieParser());

// Conectar a MongoDB Atlas usando la URL de la variable de entorno
const url = process.env.DB; // Usar la URL de la base de datos desde el archivo .env

// Función para conectar a MongoDB y arrancar el servidor
const connectToMongo = async () => {
  try {
    await mongoose.connect(url);  
    app.listen(process.env.PORT || 3000, () => {  
      console.log(`Servidor escuchando en puerto PORT y DB conectada`);
    });
  } catch (error) {
    console.log("Error al conectar con MongoDB:", error);
  }
};

// Llamar la función para conectar a la base de datos
connectToMongo();