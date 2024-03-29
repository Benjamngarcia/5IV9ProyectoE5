const controller = {};
const pool = require('../database');
const moment = require('moment');
const tz = require('moment-timezone');
const nodemailer = require('nodemailer');

//VISTA DIRECTOR-------------------------------
//MOSTRAR TABLA ALUMNOS
controller.list = (req, res) => {
    if(req.session.loggedinDirec){
            pool.query('SELECT * FROM encuesta c INNER JOIN (SELECT id_alum, MAX(id_enc) max_time FROM encuesta GROUP BY id_alum) AS t ON c.id_enc=t.max_time AND c.id_alum=t.id_alum RIGHT JOIN alumno a ON c.id_alum = a.id_alum', (err, rows) =>{
            let riesgo = 'Riesgoso';
            let sano = 'Sin riesgo';
            for( var i = 0; i < rows.length; i++){
                if(rows[i].resultado_enc === 0){
                    rows[i].resultado_enc = sano
                } else if (rows[i].resultado_enc === 1){
                    rows[i].resultado_enc = riesgo
                } else {
                    rows[i].resultado_enc = ''
                }
            }
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

function formatDate(date) {
    return moment(date).tz('America/Mexico_City').format('DD-MM-YYYY');
}

controller.mostrarInfo = async(req, res) => {
    let { matricula }  = req.params;
    if (req.session.loggedinDirec){
            await pool.query('SELECT * FROM alumno INNER JOIN tutor ON alumno.id_alum = tutor.id_alum INNER JOIN direccionAlum ON direccionAlum.id_alum = alumno.id_alum WHERE matricula_alum = ?',[matricula], (err, rows) =>{
                rows = rows.map(row => ({
                    ...row,
                    fecha_ins: formatDate(row.fecha_ins),
                    cumple_alum: formatDate(row.cumple_alum)
                }));        
            if (err){
                res.json(err);
            }
        pool.query('SELECT * FROM alumno INNER JOIN encuesta ON alumno.id_alum = encuesta.id_alum  WHERE matricula_alum = ?;',[matricula], (error, datos) =>{
            let riesgo = 'Riesgoso';
            let sano = 'Sin riesgo';
            for( var i = 0; i < datos.length; i++){
                if(datos[i].resultado_enc === 0){
                    datos[i].resultado_enc = sano
                } else{
                    datos[i].resultado_enc = riesgo
                }
            }
            datos = datos.map(dato => ({
                ...dato,
                fecha_enc: formatDate(dato.fecha_enc)
            }));   
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

controller.editProf = (req, res) => {
    const { id } = req.params;
    if(req.session.loggedinDirec){
        pool.query('SELECT * FROM profesor where id_prof = ?',[id], (err, rows) =>{
            if (err){
                res.json(err);
            }
            res.render('director/editprof',{
                logindirec: true,
                data: req.session.data,
                info: rows[0]
            });
        });
    } else{
        res.render('director/editprof',{
            logindirec: false,
            name: 'Debes iniciar sesión'
        });
    }
};

controller.updateTutor = (req, res) =>{
    const { id } = req.params;
    const newInfo = req.body;
    pool.query('UPDATE profesor set ? WHERE id_prof = ?', [newInfo, id]);
    res.redirect('/escuela/VistaDirec');
};

controller.enviarcorreo = (req, res) =>{
    pool.query('SELECT correo_alum FROM alumno', (err, rows) =>{
        var correos = rows.map(function(a){
            return a.correo_alum;
        });
        var transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: "centroeducativogandhi1@gmail.com",
                pass: "mhwmsesnhfxunpaq",
            }
        });
        var mailOptions = {
            from: '"Centro Educativo Gandhi" <centroeducativogandhi1@gmail.com>',
            to: correos,
            subject: "Aviso Salud Gandhi",
            text: "Detectamos que hay un posible caso de covid dentro de nuestra institución; recomendamos extremar precauciones en caso de enviar a tu hijo al plantel."
        }
        console.log(correos);
        transporter.sendMail(mailOptions, (error, inf)=>{
            if(error){
                res.status(500).send(error.message);
            } else {
                console.log("Email enviado correctamente")
                res.redirect("/escuela/VistaDirec")
            }
        })
    }); 
};

//VISTA PROFESOR-------------------------------

controller.viewProf = (req, res) => {
    if(req.session.loggedinProf){
        pool.query('SELECT * FROM encuesta c INNER JOIN (SELECT id_alum, MAX(id_enc) max_time FROM encuesta GROUP BY id_alum) AS t ON c.id_enc=t.max_time AND c.id_alum=t.id_alum RIGHT JOIN alumno a ON c.id_alum = a.id_alum', (err, rows) =>{
            let riesgo = 'Riesgoso';
            let sano = 'Sin riesgo';
            for( var i = 0; i < rows.length; i++){
                if(rows[i].resultado_enc === 0){
                    rows[i].resultado_enc = sano
                } else if (rows[i].resultado_enc === 1){
                    rows[i].resultado_enc = riesgo
                } else {
                    rows[i].resultado_enc = ''
                }
            }
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

controller.verInfo = async(req, res) => {
    let { matricula }  = req.params;
    if (req.session.loggedinProf){
            await pool.query('SELECT * FROM alumno INNER JOIN tutor ON alumno.id_alum = tutor.id_alum INNER JOIN direccionAlum ON direccionAlum.id_alum = alumno.id_alum WHERE matricula_alum = ?',[matricula], (err, rows) =>{
                rows = rows.map(row => ({
                    ...row,
                    fecha_ins: formatDate(row.fecha_ins),
                    cumple_alum: formatDate(row.cumple_alum)
                }));        
            if (err){
                res.json(err);
            }
        pool.query('SELECT * FROM alumno INNER JOIN encuesta ON alumno.id_alum = encuesta.id_alum  WHERE matricula_alum = ?;',[matricula], (error, datos) =>{
            let riesgo = 'Riesgoso';
            let sano = 'Sin riesgo';
            for( var i = 0; i < datos.length; i++){
                if(datos[i].resultado_enc === 0){
                    datos[i].resultado_enc = sano
                } else{
                    datos[i].resultado_enc = riesgo
                }
            }
            datos = datos.map(dato => ({
                ...dato,
                fecha_enc: formatDate(dato.fecha_enc)
            }));   
            if (error){
                res.json(error);
            }
            res.render('profesor/mostrarinfo',{
                loginprof: true,
                data: req.session.data,
                info: rows,
                historial: datos
        });
            });
        });
    } else{
        res.render('profesor/mostrarinfo',{
            loginprof: false,
            name: 'Debes iniciar sesión'
        });
    }
};

//VISTA ADMINISTRADOR-------------------------------
controller.showPage = async(req, res) => {
    if (req.session.loggedinAdmin){
        await pool.query('SELECT * FROM director', (err, rows) =>{   
        if (err){
            res.json(err);
        }
    pool.query('SELECT resultado_enc FROM encuesta', (error, datos) =>{
        var datosenc = datos.map(function(a){
            return a.resultado_enc;
        });
        var arrayRes = datosenc;
        var repetidos = [];
        arrayRes.forEach(function(numero){
            repetidos[numero]=(repetidos[numero]||0)+1;
        });
        res.render('admin/vistaadmin',{
            loginadmin: true,
            data: req.session.data,
            info: rows,
            encuesta: repetidos
    });
    console.log(repetidos);
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