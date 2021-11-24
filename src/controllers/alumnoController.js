const controller = {};
const pool = require('../database');
const qrcode = require('qrcode');
const moment = require('moment'); 
const tz = require('moment-timezone');
require('moment/locale/es');

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
        const { id } = req.params;
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
        const { id } = req.params;
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
        const { id } = req.params;
        pool.query('SELECT * FROM tutor WHERE id_alum = ?', [id], (err, result) => {
            res.render('alumno/vistauser_editartutor', {
                loginalum: true,
                data: req.session.data,
                info: result
            });
            console.log(result)
        });
    } else {
        res.render('alumno/vistauser_editartutor', {
            loginalum: false,
            name: 'Debes iniciar sesión'
        });
    }
};

controller.actualizarTutor = (req, res) => {
    if (req.session.loggedinAlum) {
        const { id } = req.params;
        const newInfo = req.body;
        pool.query('UPDATE tutor set ? WHERE id_alum = ?', [newInfo, id], (err, result) => {
            res.redirect('/VistaAlumn');
        });
    } else {
        res.redirect('/VistaAlumn');
    }
};

controller.verCuest = (req, res) => {
    if (req.session.loggedinAlum) {
        res.render('alumno/cuestionario', {
            loginalum: true,
            data: req.session.data
        });
    } else {
        res.render('alumno/cuestionario', {
            loginalum: false,
            name: 'Debes iniciar sesión'
        });
    }
};
controller.verRest = (req, res) => {
    if (req.session.loggedinAlum) {
        const { matricula } = req.params;
        pool.query('SELECT MAX(id_enc) FROM encuesta INNER JOIN alumno ON encuesta.id_alum = alumno.id_alum WHERE matricula_alum = ?', [matricula], (err, result) => {
            res.render('alumno/resultadosenc', {
                loginalum: true,
                data: req.session.data,
                info: result
            });
        });
    } else {
        res.render('alumno/resultadosenc', {
            loginalum: true,
            data: req.session.data,
            info: result
        });
    }
};
function formatDate(date) {    
    return moment(date).tz('America/Mexico_City').calendar();
}

controller.verRest = (req, res) => {
    const { matricula } = req.params;
    console.log(req.params);
    pool.query('SELECT * FROM encuesta c INNER JOIN (SELECT id_alum, MAX(id_enc) max_time FROM encuesta GROUP BY id_alum) AS t ON c.id_enc=t.max_time AND c.id_alum=t.id_alum INNER JOIN alumno a ON c.id_alum = a.id_alum WHERE matricula_alum = ?', [matricula], (err, result) => {
        result = result.map(resul => ({
            ...resul,
            fecha_enc: formatDate(resul.fecha_enc)
        })); 
        if (req.session.loggedinAlum) {
            if (err) {
                res.json(err);
            }
            console.log(result.fecha_enc);
            res.render('alumno/resultadosenc', {
                loginalum: true,
                data: req.session.data,
                info: result
            });
            console.log(result);
        } else {
            console.log(result.fecha_enc);
            res.render('alumno/resultadosenc', {
                loginalum: true,
                data: req.session.data,
                info: result
            });
        }
        console.log(result);
    });
};

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

controller.redirCuest = (req, res) => {
    const dataCuest = req.body.EncBool;
    const { id } = req.params;
    const linkCuest = req.body.link;
    if (req.session.loggedinAlum) {
        pool.query('INSERT INTO encuesta set ?', {
            id_alum: id,
            resultado_enc: dataCuest
        }, (err, results) => {
            if (JSON.stringify(dataCuest) == '"0"') {
                qrcode.toDataURL(linkCuest, (error, src) => {
                    if (error) res.send('Algo mal');
                    res.render('alumno/showqr', {
                        loginalum: true,
                        data: req.session.data,
                        qr_code: src,
                        link: src
                    });
                })
            } else if (JSON.stringify(dataCuest) == '"1"') {
                res.render('alumno/redirect', {
                    loginalum: true,
                    data: req.session.data
                });
            } else {
                res.render('alumno/cuestionario', {
                    loginalum: true,
                    data: req.session.data,
                    alert: true,
                    alertTitle: "Error",
                    alertMessage: "Lo sentimos, ocurrió un error mientras guardábamos tu respuesta.",
                    alertIcon: "error",
                    showConfirmButton: true,
                    timer: 2000,
                    ruta: 'VistaAlumn'
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