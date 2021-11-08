const controller = {};
const bcrypt = require('bcryptjs');
const pool = require('../database');

const encriptar = require('../lib/bcrypt');

//MOSTRAR FORMULARIO DE LOGIN DE ALUMNO
controller.loginalumno = (req, res) =>{
    res.render('auth/logalumn')
};
//PROCESO DE AUTENTICACIÓN DEL LOGIN DE ALUMNO
controller.loginalum = async (req, res) => {
    const matricula_alum = req.body.matricula_alum;
    const pass_alum = req.body.pass_alum;
    const rows = await pool.query('SELECT * FROM alumno WHERE matricula_alum = ?', [matricula_alum]);
    if (rows.length > 0){
        const alumno = rows[0];
        const validPassword = await encriptar.matchPassword(pass_alum, alumno.pass_alum);
        if (validPassword){
            req.session.loggedin = true;
            req.session.data = rows[0];
            res.redirect('/VistaAlumn');
        } else{
            res.render('auth/logalumn',{
                alert: true,
                alertTitle: "Contraseña",
                alertMessage: "La contraseña es incorrecta",
                alertIcon: "error",
                showConfirmButton: true,
                timer: 2000,
                ruta: 'InicioAlumn'
            });
        } 
    } else {
        res.render('auth/logalumn',{
            alert: true,
            alertTitle: "Matrícula",
            alertMessage: "La matrícula es incorrecta",
            alertIcon: "error",
            showConfirmButton: true,
            timer: 2000,
            ruta: 'InicioAlumn'
        });
    }
};

//REGISTRAR ALUMNO
controller.registroalum = async (req, res) => {
    const nombre = req.body.nom_alum;
    const appat = req.body.appat_alum;
    const apmat = req.body.apmat_alum;
    const email = req.body.correo_alum;
    const cumple = req.body.cumple_alum;
    const telefono = req.body.telefono_alum;
    const grupo = req.body.grupo_alum;
    const ins = req.body.fecha_ins;
    const matricula = req.body.matricula_alum;
    const contra = req.body.pass_alum;

    let passwordHaash = await encriptar.encryptPassword(contra);
    pool.query('INSERT INTO alumno SET ?', {nom_alum:nombre, appat_alum:appat, apmat_alum:apmat, correo_alum:email, cumple_alum:cumple, telefono_alum:telefono, grupo_alum:grupo,
        fecha_ins:ins, matricula_alum:matricula, pass_alum:passwordHaash}, async(error,results)=>{
        if(error){
            console.log(error);
        }else{
            res.redirect('/escuela/VistaDirec');
        }
    });
};

//CERRAR SESIÓN
controller.logout = (req, res) =>{
    req.session.destroy(()=>{
        res.redirect('/');
    })
};

module.exports = controller;