const express = require('express');
const path = require('path');
const morgan = require('morgan');

//INICALIZANDO EXPRESS
const app = express();

// IMPORTE RUTAS
const escuelaRoutes = require('./routes/rutas');

// CONFIGURACIONES
app.set('port', process.env.PORT || 5000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.ejs');

// MIDDLEWARES
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//VARIABLE GLOBAL
app.use((req, res, next) =>{
    next();
});

// USO RUTA
app.use('/', escuelaRoutes);

// ARCHIVOS ESTÁTICOS
app.use(express.static(path.join(__dirname, 'public')));

// INICIALIZAR SERVIDOR
app.listen(app.get('port'), () => {
    console.log(`Servidor en el puerto ${app.get('port')}`);
});
