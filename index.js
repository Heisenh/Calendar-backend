const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config();
const cors = require('cors');


// Crear el servidor de express
const app = express();

// Base de datos
dbConnection();

// CORS
app.use(cors({
  origin: '*',
  allowedHeaders: ['Content-Type', 'Authorization'],
  allowedMethods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

// Directorio publico
app.use(express.static('public'));

// Lectura y parseo del body
app.use(express.json());

// Rutas
app.use('/v1/api/auth', require('./routes/auth'));
app.use('/v1/api/events', require('./routes/events'));


// Escuchar peticiones
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en el puerto : ${process.env.PORT}`);
});
