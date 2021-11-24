const express = require('express');
const router = express.Router();

const alumnoController = require('../controllers/alumnoController');

router.get('/', alumnoController.showLP);
router.post('/EnviarCorreo', alumnoController.enviarCorreo);
router.get('/VistaAlumn', alumnoController.vistaAlumn);
router.get('/EditarAlumn/:id', alumnoController.editarAlumn);
router.post('/EditarAlumn/:id', alumnoController.actualizarAlumn);
router.get('/EditarTutor/:id', alumnoController.editarTutor);
router.post('/EditarTutor/:id', alumnoController.actualizarTutor);
router.get('/Cuestionario/:id', alumnoController.verCuest);
router.get('/Cuestionario/Resultados/:matricula', alumnoController.verRest);
router.post('/redir/:id', alumnoController.redirCuest);
// router.get('/Cuestionario/Resultados/:id')
module.exports = router;
