const express = require('express');
const router = express.Router();
const pool = require('../database');
//VISTA ALUMNO--------------------------------

//VISTA DIRECTOR-------------------------------
//MOSTRAR TABLA ALUMNOS
router.get('/VistaDirec', (req, res) => {
    pool.getConnection(async(err, conn) =>{
        await pool.query('SELECT * FROM alumno', (err, result) =>{
            //pool.query('SELECT * FROM alumno, encuesta WHERE alumno.id_alum = encuesta.id_alum;', (err, result) =>{ 
                //SUSTITUIR CUANDO HAYA RESULTADOS DE ENCUESTA 
            if(err){
                res.json(err);
            };
            res.render('vistadirector',{
                data: result
            });
        });
    });
});
//VISTA ADMINISTRADOR-------------------------------
router.get('/VistaAdmin', (req, res) => {
    res.render('vistaadmin');
});

module.exports = router;