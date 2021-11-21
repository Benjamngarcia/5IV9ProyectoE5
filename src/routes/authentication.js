const express = require('express');
const router = express.Router();

const authController = require('../controllers/authenticationController');

router.get('/InicioAlumn', authController.loginalumno);
router.post('/IniciarAlumno', authController.loginalum);
router.post('/RegistroAlumno', authController.registroalum);
router.get('/InicioProfesor', authController.loginprofe);
router.post('/IniciarProf', authController.loginprof);
router.post('/RegistroProf', authController.registroprof);

router.get('/InicioDirec', authController.logindirec);
router.post('/IniciarDirec', authController.logindirect);
router.post('/RegistrarDirector', authController.registrodirec);

router.get('/InicioAdmin', authController.loginadmin);
router.post('/IniciarAdmin', authController.loginadm);

router.get('/logout', authController.logout);


module.exports = router;