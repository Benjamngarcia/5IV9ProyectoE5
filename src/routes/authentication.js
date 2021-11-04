const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const pool = require('../database');

const encriptar = require('../lib/bcrypt');

//REGISTRAR ALUMNO
router.post('/RegistroAlumno', async (req, res) =>{
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
});
//INICIO DE SESIÓN ALUMNO
router.post('/IniciarAlum', async (req, res) =>{
    const matricula_alum = req.body.matricula_alum;
    const pass_alum = req.body.pass_alum;
    const rows = await pool.query('SELECT * FROM alumno WHERE matricula_alum = ?', [matricula_alum]);
    if (rows.length > 0){
        const alumno = rows[0];
        const validPassword = await encriptar.matchPassword(pass_alum, alumno.pass_alum);
        if (validPassword){
            req.session.loggedin = true;
            req.session.nom_alum = rows[0].nom_alum;
            // res.redirect('/escuela/VistaAlumn');
        } else{
            res.render('auth/logalumn',{
                alert: true,
                alertTitle: "Contraseña",
                alertMessage: "La contraseña es incorrecta",
                alertIcon: "error",
                showConfirmButton: true,
                timer: false,
                ruta: 'LogAlumn'
            });
        } 
    } else {
        res.render('auth/logalumn',{
            alert: true,
            alertTitle: "Matrícula",
            alertMessage: "La matrícula es incorrecta",
            alertIcon: "error",
            showConfirmButton: true,
            timer: false,
            ruta: 'LogAlumn'
        });
    }
});

//AUTENTICACIÓN ALUMNO
router.get('/escuela/VistaAlumn', (req, res) =>{
    if(req.session.loggedin){
        res.render('alumno/vistauser',{
            login: true,
            name: req.session.nom_alum
        });
        console.log('Iniciaste sesion');
    } else{
        res.render('index',{
            login: false,
            name: 'Debes iniciar sesión'
        });
        console.log('Pal carajo');
    }
})

module.exports = router;