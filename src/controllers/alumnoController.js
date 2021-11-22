const controller = {};
const pool = require('../database');

//CARGAR PÁGINA EN LANDING PAGE
controller.showLP = (req, res) => {
    res.render('index');
};
//REDIRECCIONAR A VISTAS DE ALUMNO//
controller.vistaAlumn = (req, res) => {
    if(req.session.loggedinAlum){
        res.render('alumno/vistauser',{
            loginalum: true,
            data: req.session.data
        });
    } else{
        res.render('alumno/vistauser',{
            loginalum: false,
            name: 'Debes iniciar sesión'
        });
    }
};
controller.editarAlumn = (req, res) => {
    if(req.session.loggedinAlum){
        const { id } = req.params;
        pool.query('SELECT * FROM alumno WHERE id_alum = ?', [id], (err, result) =>{
            res.render('alumno/vistauser_editarusuario',{
                loginalum: true,
                data: req.session.data
            });
        });
    } else{
        res.render('alumno/vistauser_editarusuario',{
            loginalum: false,
            name: 'Debes iniciar sesión'
        });
    }
};
controller.actualizarAlumn = (req, res) => {
    if(req.session.loggedinAlum){
        const { id } = req.params;
        const newInfo = req.body;
        pool.query('UPDATE alumno set ? WHERE id_alum = ?', [newInfo, id], (err, result) =>{
            res.redirect('/VistaAlumn');
        });
    } else{
        res.redirect('/VistaAlumn');
    }
};
controller.editarTutor = (req, res) => {
    if(req.session.loggedinAlum){
        const { id } = req.params;
        pool.query('SELECT * FROM tutor WHERE id_alum = ?', [id], (err, result) =>{
            res.render('alumno/vistauser_editartutor',{
                loginalum: true,
                data: req.session.data
            });
        });
    } else{
        res.render('alumno/vistauser_editartutor',{
            loginalum: false,
            name: 'Debes iniciar sesión'
        });
    }
};

controller.verCuest = (req, res) => {
    if(req.session.loggedinAlum){
        res.render('alumno/cuestionario',{
            loginalum: true,
            data: req.session.data
        });
    } else{
        res.render('alumno/cuestionario',{
            loginalum: false,
            name: 'Debes iniciar sesión'
        });
    }
};

controller.vistaAlumn = (req, res) => {
    if(req.session.loggedinAlum){
        res.render('alumno/vistauser',{
            loginalum: true,
            data: req.session.data
        });
    } else{
        res.render('alumno/vistauser',{
            loginalum: false,
            name: 'Debes iniciar sesión'
        });
    }
};

controller.redirCuest = (req, res) => {
    const dataCuest = req.body.EncBool;
    const { id }  = req.params;
    nochis = 2;
    if (req.session.loggedinAlum) {
        pool.query('INSERT INTO encuesta set ?', {id_alum:id,resultado_enc:dataCuest}, (err, results) => {
            const buenas = JSON.stringify(dataCuest);
            nochis = buenas;
            if (nochis == '"0"') {
                res.render('alumno/showqr', {
                    loginalum: true,
                    data: req.session.data
                });
            } else if (nochis == '"1"') {
                res.render('alumno/redirect', {
                    loginalum: true,
                    data: req.session.data
                });
            } else {
                res.render('alumno/cuestionario', {
                    loginalum: true,
                    data: req.session.data
                });
            }
        })
    } else {
        res.render('alumno/cuestionario', {
            loginalum: false,
            name: 'Debes iniciar sesión'
        });
    }
};
module.exports = controller;