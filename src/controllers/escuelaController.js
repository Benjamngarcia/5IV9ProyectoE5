const controller = {};
const pool = require('../database');

//VISTA DIRECTOR-------------------------------
//MOSTRAR TABLA ALUMNOS
controller.list = (req, res) => {
    pool.getConnection((err, conn) => {
        pool.query('SELECT * FROM alumno', (err, result) => {
            if (err) {
                res.json(err);
            }
            res.render('director/vistadirector', {
                data: result
            });
        });
    });
};
//VISTA ADMINISTRADOR-------------------------------
controller.showPage = (req, res) => {
    if(req.session.loggedin){
        pool.query('SELECT * FROM director', (err, rows) =>{
            if (err){
                res.json(err);
            }
            res.render('admin/vistaadmin',{
                login: true,
                data: req.session.data,
                info: rows
            });
        });
    } else{
        res.render('admin/vistaadmin',{
            login: false,
            name: 'Debes iniciar sesión'
        });
    }
};

controller.deleteDirec = (req, res) =>{
    const { id } = req.params;
    pool.query('DELETE FROM director WHERE id_direc = ?', [id]);
    res.redirect('/escuela/VistaAdmin');
}

controller.showEdit = (req, res) => {
    const { id } = req.params;
    if(req.session.loggedin){
        pool.query('SELECT * FROM director where id_direc = ?',[id], (err, rows) =>{
            if (err){
                res.json(err);
            }
            res.render('admin/editdirec',{
                login: true,
                data: req.session.data,
                info: rows[0]
            });
        });
    } else{
        res.render('admin/editdirec',{
            login: false,
            name: 'Debes iniciar sesión'
        });
    }
};

controller.editDirec = (req, res) =>{
    const { id } = req.params;
    const newInfo = req.body;
    pool.query('UPDATE director set ? WHERE id_direc = ?', [newInfo, id]);
    res.redirect('/escuela/VistaAdmin');
}
module.exports = controller;