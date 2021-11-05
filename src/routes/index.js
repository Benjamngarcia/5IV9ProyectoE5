const express = require('express');
const router = express.Router();
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
//---------ACCIONES ALUMNO DESDE VISTA DIRECTOR-------------
//ELIMINAR ALUMNO
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

module.exports = router;