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
// controller.get('/VistaAdmin', (req, res) => {
//     res.render('vistaadmin');
// });

module.exports = controller;