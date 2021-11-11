const controller = {};
const pool = require('../database');

//CARGAR PÁGINA EN LANDING PAGE
controller.showLP = (req, res) => {
    res.render('index');
};
//REDIRECCIONAR A VISTAS DE ALUMNO//
controller.vistaAlumn = (req, res) => {
    if (req.session.loggedinAlum) {
        res.render('alumno/vistauser', {
            loginalum: true,
            data: req.session.data
        });
    } else {
        res.render('alumno/vistauser', {
            loginalum: false,
            name: 'Debes iniciar sesión'
        });
    }
};
controller.editarAlumn = (req, res) => {
    if (req.session.loggedinAlum) {
        const {
            id
        } = req.params;
        pool.query('SELECT * FROM alumno WHERE id_alum = ?', [id], (err, result) => {
            res.render('alumno/vistauser_editarusuario', {
                loginalum: true,
                data: req.session.data
            });
        });
    } else {
        res.render('alumno/vistauser_editarusuario', {
            loginalum: false,
            name: 'Debes iniciar sesión'
        });
    }
};
controller.actualizarAlumn = (req, res) => {
    if (req.session.loggedinAlum) {
        const {
            id
        } = req.params;
        const newInfo = req.body;
        pool.query('UPDATE alumno set ? WHERE id_alum = ?', [newInfo, id], (err, result) => {
            res.redirect('/VistaAlumn');
        });
    } else {
        res.redirect('/VistaAlumn');
    }
};
controller.editarTutor = (req, res) => {
    if (req.session.loggedinAlum) {
        const {
            id
        } = req.params;
        pool.query('SELECT * FROM tutor WHERE id_alum = ?', [id], (err, result) => {
            res.render('alumno/vistauser_editartutor', {
                loginalum: true,
                data: req.session.data
            });
        });
    } else {
        res.render('alumno/vistauser_editartutor', {
            loginalum: false,
            name: 'Debes iniciar sesión'
        });
    }
};

controller.verCuest = (req, res) => {
    const dataC = req.body;
    console.log(req.body);
    nochis = 2;
    if (req.session.loggedinAlum) {
            const query = pool.query('INSERT INTO encuesta set ?', [data], (err, encuesta) => {
                
                console.log(encuesta);
                const buenas = JSON.stringify(dataC);
                nochis = buenas;
                console.log(nochis);
                if (nochis == '{"EncBool":"0"}') {
                    res.render('alumno/showqr');
                }
                else if (nochis == '{"EncBool":"1"}') {
                    res.render('alumno/vistauser');

                }
                else {
                    res.render('alumno/cuestionario');
                }
            })
    } else {
        res.render('alumno/cuestionario', {
            loginalum: false,
            name: 'Debes iniciar sesión'
        });
    }
};
controller.redirCuest = (req, res) => {
    if (req.session.loggedinAlumn) {

    } else {
        res.render('alumno/cuestionario', {
            loginalum: false,
            name: 'Debes iniciar sesión'
        });
    }
}
module.exports = controller;