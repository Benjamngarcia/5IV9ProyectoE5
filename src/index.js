const express = require('express');
const path = require('path');
const morgan = require('morgan');
const session = require('express-session');
const MySQLStore = require('express-mysql-session');
const flash = require('connect-flash');

const { database } = require('./keys');

//INICALIZANDO EXPRESS
const app = express();

// IMPORTE RUTAS

// CONFIGURACIONES
app.set('port', process.env.PORT || 5000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.ejs');

// MIDDLEWARES
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use (session({
    secret:'secret',
    resave: true,
    saveUninitialized: true,
    store: new MySQLStore(database)
}));
//VARIABLE GLOBAL
app.use((req, res, next) =>{
    app.locals.success = req.flash('success');
    app.locals.message = req.flash('message');
    next();
});

// USO RUTA
app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use('/escuela', require('./routes/escuela'));

// ARCHIVOS ESTÁTICOS
app.use(express.static(path.join(__dirname, 'public')));

// INICIALIZAR SERVIDOR
app.listen(app.get('port'), () => {
    console.log(`Servidor en el puerto ${app.get('port')}`);
});
