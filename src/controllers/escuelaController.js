const controller = {};
const pool = require('../database');

//VISTA DIRECTOR-------------------------------
//MOSTRAR TABLA ALUMNOS
controller.list = (req, res) => {
    if(req.session.loggedinDirec){
        // pool.query('SELECT * FROM alumno', (err, rows) =>{
            pool.query('SELECT * FROM alumno INNER JOIN encuesta ON alumno.id_alum = encuesta.id_alum', (err, rows) =>{
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
        pool.query('SELECT * FROM alumno INNER JOIN tutor ON alumno.id_alum = tutor.id_alum', (err, rows) =>{
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

controller.addTutor = (req, res) => {
    let { id } = req.params;
    const nombre = req.body.nom_tutor;
    const appat = req.body.appat_tutor;
    const apmat = req.body.apmat_tutor;
    const paren = req.body.parentezco;

    const calle = req.body.calle;
    const colonia = req.body.colonia;
    const codigop = req.body.codigop;
    const alcaldia = req.body.alcaldia;
    console.log(req.body)
        pool.query('INSERT INTO tutor set ?',{id_alum: id, nom_tutor:nombre, appat_tutor: appat, apmat_tutor: apmat, parentezco: paren} , (err, succ) => {
        if (err){
            console.log(err)
        } else{
            console.log(succ)
        }
        pool.query('INSERT INTO direccionAlum set ?', {id_alum: id, calle: calle, colonia: colonia, codigop: codigop, alcaldia: alcaldia}, (error, exito) =>{
            if (error){
                console.log(error)
            } else{
                console.log(exito)
            }  
            res.redirect('/escuela/VistaDirec');
        })
    })
};

controller.editTutor = (req, res) => {
    const { id } = req.params;
    if(req.session.loggedinDirec){
        pool.query('SELECT * FROM tutor where id_tutor = ?',[id], (err, rows) =>{
            if (err){
                res.json(err);
            }
            res.render('director/edittut',{
                logindirec: true,
                data: req.session.data,
                info: rows[0]
            });
        });
    } else{
        res.render('director/edittut',{
            logindirec: false,
            name: 'Debes iniciar sesión'
        });
    }
};

controller.updateTutor = (req, res) =>{
    const { id } = req.params;
    const newInfo = req.body;
    pool.query('UPDATE tutor set ? WHERE id_tutor = ?', [newInfo, id]);
    res.redirect('/escuela/VistaDirec');
};

controller.mostrarInfo = async(req, res) => {
    let { matricula }  = req.params;
    if (req.session.loggedinDirec){
            await pool.query('SELECT * FROM alumno INNER JOIN tutor ON alumno.id_alum = tutor.id_alum INNER JOIN direccionAlum ON direccionAlum.id_alum = alumno.id_alum WHERE matricula_alum = ?',[matricula], (err, rows) =>{
            if (err){
                res.json(err);
            }
        pool.query('SELECT * FROM alumno INNER JOIN encuesta ON alumno.id_alum = encuesta.id_alum  WHERE matricula_alum = ?;',[matricula], (error, datos) =>{
            if (error){
                res.json(error);
            }
            res.render('director/mostrarinfo',{
                logindirec: true,
                data: req.session.data,
                info: rows,
                historial: datos
        });
            });
            // console.log(rows); objeto dentro de array
            // console.log(req.session.data) objeto
        });
    } else{
        res.render('director/mostrarinfo',{
            logindirec: false,
            name: 'Debes iniciar sesión'
        });
    }
};
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
controller.deleteProf = (req, res) =>{
    const { id } = req.params;
    pool.query('DELETE FROM profesor WHERE id_prof = ?', [id]);
    res.redirect('/escuela/VistaDirec');
}

//VISTA PROFESOR-------------------------------

controller.viewProf = (req, res) => {
    if(req.session.loggedinProf){
        pool.query('SELECT * FROM alumno INNER JOIN encuesta ON alumno.id_alum = encuesta.id_alum', (err, rows) =>{
            if (err){
                res.json(err);
            }
            res.render('profesor/vistaprofe',{
                loginprof: true,
                data: req.session.data,
                info: rows
            });
        });
    } else{
        res.render('profesor/vistaprofe',{
            loginprof: false,
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