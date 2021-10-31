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

    const salt = await bcrypt.genSalt(10);
    let passwordHaash = await bcrypt.hash(contra, salt);
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

//INICIO DE SESIÓN ALUMNO
router.post('/IniciarAlum', async (req, res) =>{
    const matricula_alum = req.body.matricula_alum;
    const pass_alum = req.body.pass_alum;
    let passwordHaash = await bcrypt.hash(pass_alum, 10);
    if(matricula_alum && pass_alum){
        pool.query('SELECT * FROM alumno WHERE matricula_alum = "?"', [matricula_alum], async (error, results)=>{
            if(results.length == 0 || !(await bcrypt.compare(pass_alum, results[0].pass_alum))){
                res.send('DATOS INCORRECTOS');
            }else{
                res.send('LOGIN CORRECTO');
            }
        });
    };
});

router.get('/DeleteAlum/:id', async(req, res) =>{
    const { id } = req.params;
    await pool.query('DELETE FROM alumno WHERE id_alum = ?', [id]);
    res.redirect('/escuela/VistaDirec');
});

//EDITAR ALUMNO
router.get('/EditAlum/:id', async (req,res) =>{
    const { id } = req.params;
    const alumno = await pool.query('SELECT * FROM alumno WHERE id_alum = ?',[id], (err, rows)=>{
        res.render('editalum', {
            data: rows[0]
        });
    });
});

router.post('/EditAlum/:id', async (req,res) =>{
    const { id } = req.params;
    const newInfo = req.body;
    await pool.query('UPDATE alumno set ? WHERE id_alum = ?', [newInfo, id]);
    res.redirect('/escuela/VistaDirec');
});

// try{
    //     pool.query('SELECT * FROM alumno WHERE matricula_alum = "?"',[matricula_alum], async (error, results) =>{
    //         if(results.length == 0||!(await bcrypt.compare(pass_alum, results[0].pass_alum))){
    //             res.send('DATOS INCORRECTOS');
    //         } else{
    //             res.send('LOGIN CORRECTO');
    //         }
    //     });
        
    // } catch(e){
    //     console.log(e);
    // }

module.exports = router;