const express = require('express');
const path = require('path');
const morgan = require('morgan');
const session = require('express-session');

const { database } = require('./keys');

//INICALIZANDO EXPRESS
const app = express();

// IMPORTE RUTAS
const alumnoRoutes = require('./routes/alumno');
const escuelaRoutes = require('./routes/escuela');
const authRoutes = require('./routes/authentication');

// CONFIGURACIONES
app.set('port', process.env.PORT || 5000);
app.set('views', path.join(__dirname, 'views'));
// app.set(path.join(app.get('views'), 'partials'));
app.set('view engine', '.ejs');

// MIDDLEWARES
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use (session({
    secret:'secret',
    resave: true,
    saveUninitialized: true,
}));

//VARIABLE GLOBAL
app.use((req, res, next) =>{
    next();
});

// USO RUTA
app.use('/', alumnoRoutes);
app.use('/escuela', escuelaRoutes);
app.use('/', authRoutes);

// ARCHIVOS ESTÁTICOS
app.use(express.static(path.join(__dirname, 'public')));

// INICIALIZAR SERVIDOR
app.listen(app.get('port'), () => {
    console.log(`Servidor en el puerto ${app.get('port')}`);
});
