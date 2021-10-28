const controller = {};
const pool = require('../database');

//Abrir página inicial
controller.open = (req, res) => {
    res.render('index');
}
//Links del dropdown menu
controller.LogAlumn = (req, res) => {
    res.render('logalumn');
}
controller.LogTeacher = (req, res) => {
    res.render('logteacher');
}
controller.LogDirec = (req, res) => {
    res.render('logdirec');
}
controller.LogAdmin = (req, res) => {
    res.render('logadmin');
}
//Ir a vista director
controller.VistaDirec = (req, res) => {
    res.render('vistadirector');
}

module.exports = controller;
