const controller = {};
const pool = require('../database');

//VISTA DIRECTOR-------------------------------
//MOSTRAR TABLA ALUMNOS
controller.list = (req, res) => {
    pool.getConnection((err, conn) => {
        pool.query('SELECT * FROM alumno', (err, result) => {
            if (err) {
                res.json(err);
            }
            res.render('vistadirector', {
                data: result
            });
        });
    });
};
//VISTA ADMINISTRADOR-------------------------------
controller.showPage = (req, res) => {
    if(req.session.loggedin){
        res.render('vistaadmin',{
            login: true,
            data: req.session.data
        });
    } else{
        res.render('admin',{
            login: false,
            name: 'Debes iniciar sesión'
        });
    }
};

module.exports = controller;