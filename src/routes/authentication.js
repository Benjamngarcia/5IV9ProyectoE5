const express = require('express');
const router = express.Router();

const authController = require('../controllers/authenticationController');

router.get('/InicioAlumn', authController.loginalumno);
router.post('/IniciarAlumno', authController.loginalum);
router.post('/RegistroAlumno', authController.registroalum);

router.post('/RegistrarDirector', authController.registrodirec);

router.get('/InicioAdmin', authController.loginadmin);
router.post('/IniciarAdmin', authController.loginadm);
router.get('/logout', authController.logout);


module.exports = router;