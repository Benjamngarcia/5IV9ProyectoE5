const express = require('express');
const router = express.Router();

const alumnoController = require('../controllers/alumnoController');

router.get('/', alumnoController.showLP);
router.get('/VistaAlumn', alumnoController.vistaAlumn);
router.get('/EditarAlumn/:id', alumnoController.editarAlumn);
router.post('/EditarAlumn/:id', alumnoController.actualizarAlumn);
router.get('/EditarTutor/:id', alumnoController.editarTutor);
// router.post('/EditarTutor/:id', alumnoController.editarTutor);
router.get('/Cuestionario/:id', alumnoController.verCuest);
router.post('/redir/:id', alumnoController.redirCuest);
module.exports = router;