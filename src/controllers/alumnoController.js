const controller = {};
const pool = require('../database');

//CARGAR PÁGINA EN LANDING PAGE
controller.showLP = (req, res) => {
    res.render('index');
};
//REDIRECCIONAR A VISTAS DE ALUMNO//
controller.vistaAlumn = (req, res) => {
    if(req.session.loggedin){
        res.render('alumno/vistauser',{
            login: true,
            data: req.session.data
        });
    } else{
        res.render('alumno/vistauser',{
            login: false,
            name: 'Debes iniciar sesión'
        });
    }
};
controller.editarAlumn = (req, res) => {
    if(req.session.loggedin){
        const { id } = req.params;
        pool.query('SELECT * FROM alumno WHERE id_alum = ?', [id], (err, result) =>{
            res.render('alumno/vistauser_editarusuario',{
                login: true,
                data: req.session.data
            });
        });
    } else{
        res.render('alumno/vistauser_editarusuario',{
            login: false,
            name: 'Debes iniciar sesión'
        });
    }
};
controller.actualizarAlumn = (req, res) => {
    if(req.session.loggedin){
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
    if(req.session.loggedin){
        const { id } = req.params;
        pool.query('SELECT * FROM tutor WHERE id_alum = ?', [id], (err, result) =>{
            res.render('alumno/vistauser_editartutor',{
                login: true,
                data: req.session.data
            });
        });
    } else{
        res.render('alumno/vistauser_editartutor',{
            login: false,
            name: 'Debes iniciar sesión'
        });
    }
};

controller.verCuest = (req, res) => {
    if(req.session.loggedin){
        res.render('alumno/cuestionario',{
            login: true,
            data: req.session.data
        });
    } else{
        res.render('alumno/cuestionario',{
            login: false,
            name: 'Debes iniciar sesión'
        });
    }
};
module.exports = controller;