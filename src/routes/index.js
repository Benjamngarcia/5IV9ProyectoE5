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