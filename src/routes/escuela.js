const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/VistaDirec', (req, res) => {
    pool.getConnection((err, conn) =>{
        pool.query('SELECT * FROM alumno', (err, result) =>{
            //pool.query('SELECT * FROM alumno, encuesta WHERE alumno.id_alum = encuesta.id_alum;', (err, result) =>{ SUSTITUIR CUANDO HAYA RESULTADOS DE ENCUESTA
            if(err){
                res.json(err);
            };
            res.render('vistadirector',{
                data: result
            });
        });
    });
});





// router.post('/add', async (req, res) => {
//     const { title, url, description } = req.body;
//     const newLink = {
//         title,
//         url,
//         description
//     };
//     await pool.query('INSERT INTO links set ?', [newLink]);
//     req.flash('success','link guardado correctamente');
//     res.redirect('/links');
// });

// router.get('/', async (req, res) =>{
//     const links = await pool.query('SELECT * FROM links');
//     res.render('links/list', {links});
// });

// router.get('/delete/:id', async(req, res) =>{
//     const { id } = req.params;
//     await pool.query('DELETE FROM links WHERE ID = ?', [id]);
//     res.redirect('/links');
// });

// router.get('/edit/:id', async (req,res) =>{
//     const { id } = req.params;
//     const links = await pool.query('SELECT * FROM links WHERE id = ?',[id]);
//     res.render('links/edit',{link: links[0]});
// });

// router.post('/edit/:id', async (req,res) =>{
//     const { id } = req.params;
//     const { title, description, url } = req.body;
//     const newLink = {
//         title,
//         description,
//         url
//     };
//     await pool.query('UPDATE links set ? WHERE id= ?', [newLink, id]);
//     res.redirect('/links');
// });

module.exports = router;