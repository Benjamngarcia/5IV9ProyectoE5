const controller = {};
const pool = require('../database');

//VISTA DIRECTOR-------------------------------
//MOSTRAR TABLA ALUMNOS
controller.list = (req, res) => {
    if(req.session.loggedinDirec){
        pool.query('SELECT * FROM alumno', (err, rows) =>{
            if (err){
                res.json(err);
            }
            res.render('director/vistadirector',{
                logindirec: true,
                data: req.session.data,
                info: rows
            });
        });
    } else{
        res.render('director/vistadirector',{
            logindirec: false,
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
    if(req.session.loggedinDirec){
        pool.query('SELECT * FROM alumno where id_alum = ?',[id], (err, rows) =>{
            if (err){
                res.json(err);
            }
            res.render('director/editalum',{
                logindirec: true,
                data: req.session.data,
                info: rows[0]
            });
        });
    } else{
        res.render('director/editalum',{
            logindirec: false,
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

controller.listTut = (req, res) => {
    if(req.session.loggedinDirec){
        pool.query('SELECT * FROM tutor', (err, rows) =>{
            if (err){
                res.json(err);
            }
            res.render('director/listtut',{
                logindirec: true,
                data: req.session.data,
                info: rows
            });
        });
    } else{
        res.render('director/listtut',{
            logindirec: false,
            name: 'Debes iniciar sesión'
        });
    }
};

controller.addTut = (req, res) => {
    const { id } = req.params;
    if(req.session.loggedinDirec){
        pool.query('SELECT * FROM alumno where id_alum = ?',[id], (err, rows) =>{
            if (err){
                res.json(err);
            }
            res.render('director/registrartut',{
                logindirec: true,
                data: req.session.data,
                info: rows[0]
            });
        });
    } else{
        res.render('director/registrartut',{
            logindirec: false,
            name: 'Debes iniciar sesión'
        });
    }
};

// controller.addTutor = (req, res) => {
//     const tutor = req.body;
//     console.log(req.body)
//     const query = pool.query('INSERT INTO tutor set ?', tutor, (err, customer) => {
//         console.log(customer)
//         console.log(err)
//         res.redirect('/');
//       })
//   };

controller.listProf = (req, res) => {
    if(req.session.loggedinDirec){
        pool.query('SELECT * FROM profesor', (err, rows) =>{
            if (err){
                res.json(err);
            }
            res.render('director/listprof',{
                logindirec: true,
                data: req.session.data,
                info: rows
            });
        });
    } else{
        res.render('director/listprof',{
            logindirec: false,
            name: 'Debes iniciar sesión'
        });
    }
};
//VISTA ADMINISTRADOR-------------------------------
controller.showPage = (req, res) => {
    if(req.session.loggedinAdmin){
        pool.query('SELECT * FROM director', (err, rows) =>{
            if (err){
                res.json(err);
            }
            res.render('admin/vistaadmin',{
                loginadmin: true,
                data: req.session.data,
                info: rows
            });
        });
    } else{
        res.render('admin/vistaadmin',{
            loginadmin: false,
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
    if(req.session.loggedinAdmin){
        pool.query('SELECT * FROM director where id_direc = ?',[id], (err, rows) =>{
            if (err){
                res.json(err);
            }
            res.render('admin/editdirec',{
                loginadmin: true,
                data: req.session.data,
                info: rows[0]
            });
        });
    } else{
        res.render('admin/editdirec',{
            loginadmin: false,
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