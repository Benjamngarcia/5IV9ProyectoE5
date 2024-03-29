const express = require('express');
const router = express.Router();

const escuelaController = require('../controllers/escuelaController');
//DIREC
router.get('/VistaDirec', escuelaController.list);
router.get('/DeleteAlum/:id', escuelaController.deleteAlum);
router.get('/EditAlum/:id', escuelaController.editAlum);
router.post('/EditAlum/:id', escuelaController.updateAlum);
router.get('/VerTutores', escuelaController.listTut);
router.get('/VerProf', escuelaController.listProf);
router.get('/EditProf/:id', escuelaController.editProf);
router.get('/RegistrarTutor/:id', escuelaController.addTut);
router.post('/RegistrarTutor/:id', escuelaController.addTutor);
router.get('/EditTut/:id', escuelaController.editTutor);
router.get('/EditTut/:id', escuelaController.updateTutor);
router.post('/EditTut/:id', escuelaController.updateTutor);
router.get('/VerInfo/:matricula', escuelaController.mostrarInfo);
router.get('/DeleteProf/:id', escuelaController.deleteProf);
router.post('/EnviarCorreo', escuelaController.enviarcorreo);

//PROFESOR
router.get('/VistaProfesor', escuelaController.viewProf);
router.get('/MostrarInfo/:matricula', escuelaController.verInfo);
//ADMIN
router.get('/VistaAdmin', escuelaController.showPage);
router.get('/DeleteDirec/:id', escuelaController.deleteDirec);
router.get('/EditDirec/:id', escuelaController.showEdit);
router.post('/EditDirec/:id', escuelaController.editDirec);

module.exports = router;
