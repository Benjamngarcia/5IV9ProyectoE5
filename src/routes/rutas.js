const router = require('express').Router();
const escuelaController = require('../controllers/escuelaController');

//Abrir landing page
router.get('/', escuelaController.open);
//Botones dropdown
router.get('/LogAlumn', escuelaController.LogAlumn);
router.get('/LogTeacher', escuelaController.LogTeacher);
router.get('/LogDirec', escuelaController.LogDirec);
router.get('/LogAdmin', escuelaController.LogAdmin);
//Ir a vista director
router.get('/VistaDirec', escuelaController.VistaDirec);

module.exports = router;