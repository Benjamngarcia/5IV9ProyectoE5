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

//MOSTRAR FORMULARIO DE LOGIN DE DIRECTOR
controller.logindirec = (req, res) =>{
    res.render('auth/logdirec')
};

//PROCESO DE AUTENTICACIÓN DEL LOGIN DE DIRECTOR
controller.logindirect = async (req, res) => {
    const correo_direc = req.body.correo_direc;
    const pass_direc = req.body.pass_direc;
    const rows = await pool.query('SELECT * FROM director WHERE correo_direc = ?', [correo_direc]);
    if (rows.length > 0){
        const director = rows[0];
        const validPassword = await encriptar.matchPassword(pass_direc, director.pass_direc);
        if (validPassword){
            req.session.loggedin = true;
            req.session.data = rows[0];
            res.redirect('/escuela/VistaDirec');
        } else{
            res.render('auth/logdirec',{
                alert: true,
                alertTitle: "Contraseña",
                alertMessage: "La contraseña es incorrecta",
                alertIcon: "error",
                showConfirmButton: true,
                timer: 2000,
                ruta: 'InicioDirec'
            });
        } 
    } else {
        res.render('auth/logalumn',{
            alert: true,
            alertTitle: "Correo",
            alertMessage: "El correo es incorrecto",
            alertIcon: "error",
            showConfirmButton: true,
            timer: 2000,
            ruta: 'InicioDirec'
        });
    }
};

//REGISTRAR DIRECTOR
controller.registrodirec = async (req, res) => {
    const nombre = req.body.nom_direc;
    const appat = req.body.appat_direc;
    const apmat = req.body.apmat_direc;
    const email = req.body.correo_direc;
    const contra = req.body.pass_direc;
    const telefono = req.body.telefono_direc;
    const rfc = req.body.rfc_direc;
    const nss = req.body.nss_direc;
    const calle = req.body.calle_direc;
    const colonia = req.body.colonia_direc;
    const codigop = req.body.codigop_direc;
    const alcaldia = req.body.alcaldia_direc;

    let passwordHaash = await encriptar.encryptPassword(contra);
    pool.query('INSERT INTO director SET ?', {nom_direc:nombre, appat_direc:appat, apmat_direc:apmat, correo_direc:email, telefono_direc:telefono, 
        rfc_direc:rfc, nss_direc:nss, calle_direc:calle,colonia_direc:colonia,codigop_direc:codigop,alcaldia_direc:alcaldia, pass_direc:passwordHaash}, async(error,results)=>{
        if(error){
            console.log(error);
        }else{
            res.redirect('/escuela/VistaAdmin');
        }
    });
};

//MOSTRAR FORMULARIO DE LOGIN DE ADMIN
controller.loginadmin = (req, res) =>{
    res.render('auth/logadmin')
};
//PROCESO DE AUTENTICACIÓN DEL LOGIN DE ADMIN
controller.loginadm = async (req, res) => {
    const correo = req.body.correo_admin;
    const pass = req.body.pass_admin;
    const rows = await pool.query('SELECT * FROM admini WHERE correo_admin = ?', [correo]);
    if (rows.length > 0){
        const admin = rows[0];
        const validPassword = await encriptar.matchPassword(pass, admin.pass_admin);
        if (validPassword){
            req.session.loggedin = true;
            req.session.data = rows[0];
            res.redirect('/escuela/VistaAdmin');
        } else{
            res.render('auth/logadmin',{
                alert: true,
                alertTitle: "Contraseña",
                alertMessage: "La contraseña es incorrecta",
                alertIcon: "error",
                showConfirmButton: true,
                timer: 2000,
                ruta: 'InicioAdmin'
            });
        } 
    } else {
        res.render('auth/logadmin',{
            alert: true,
            alertTitle: "Correo",
            alertMessage: "El correo es incorrecto",
            alertIcon: "error",
            showConfirmButton: true,
            timer: 2000,
            ruta: 'InicioAdmin'
        });
    }
};

//CERRAR SESIÓN
controller.logout = (req, res) =>{
    req.session.destroy(()=>{
        res.redirect('/');
    })
};

module.exports = controller;