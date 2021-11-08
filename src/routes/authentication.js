const express = require('express');
const router = express.Router();

const authController = require('../controllers/authenticationController');

router.get('/InicioAlumn', authController.loginalumno);
router.post('/IniciarAlumno', authController.loginalum);
router.post('/RegistroAlumno', authController.registroalum);
router.get('/logout', authController.logout);


module.exports = router;