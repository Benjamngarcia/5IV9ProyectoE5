const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const pool = require('../database');

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/LogAlumn', (req, res) => {
    res.render('auth/logalumn');
});

router.get('/LogTeacher', (req, res) => {
    res.render('auth/logteacher');
});
router.get('/LogDirec', (req, res) => {
    res.render('auth/logdirec');
});
router.get('/LogAdmin', (req, res) => {
    res.render('auth/logadmin');
});

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

    let passwordHaash = await bcrypt.hash(contra, 8);
    console.log(passwordHaash);
    pool.query('INSERT INTO alumno SET ?', {nom_alum:nombre, appat_alum:appat, apmat_alum:apmat, correo_alum:email, cumple_alum:cumple, telefono_alum:telefono, grupo_alum:grupo,
    fecha_ins:ins, matricula_alum:matricula, pass_alum:passwordHaash}, async(error,results)=>{
        if(error){
            console.log(error);
        }else{
            res.redirect('/escuela/VistaDirec');
        }
    });
});

module.exports = router;