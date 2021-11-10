const controller = {};
const pool = require('../database');

//VISTA DIRECTOR-------------------------------
//MOSTRAR TABLA ALUMNOS
controller.list = (req, res) => {
    if(req.session.loggedin){
        pool.query('SELECT * FROM alumno', (err, rows) =>{
            if (err){
                res.json(err);
            }
            res.render('director/vistadirector',{
                login: true,
                data: req.session.data,
                info: rows
            });
        });
    } else{
        res.render('director/vistadirector',{
            login: false,
            name: 'Debes iniciar sesión'
        });
    }
};
controller.deleteAlum = (req, res) =>{
    const { id } = req.params;
    pool.query('DELETE FROM alumno WHERE id_alum = ?', [id]);
    res.redirect('/escuela/VistaDirec');
}
controller.editAlum = (req, res) => {
    const { id } = req.params;
    if(req.session.loggedin){
        pool.query('SELECT * FROM alumno where id_alum = ?',[id], (err, rows) =>{
            if (err){
                res.json(err);
            }
            res.render('director/editalum',{
                login: true,
                data: req.session.data,
                info: rows[0]
            });
        });
    } else{
        res.render('director/editalum',{
            login: false,
            name: 'Debes iniciar sesión'
        });
    }
};

controller.updateAlum = (req, res) =>{
    const { id } = req.params;
    const newInfo = req.body;
    pool.query('UPDATE alumno set ? WHERE id_alum = ?', [newInfo, id]);
    res.redirect('/escuela/VistaDirec');
}
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