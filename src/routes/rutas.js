const router = require('express').Router();
const escuelaController = require('../controllers/escuelaController');

router.get('/', escuelaController.open);
router.get('/LogAlumn', escuelaController.LogAlumn);
router.get('/LogTeacher', escuelaController.LogTeacher);
router.get('/LogDirec', escuelaController.LogDirec);
router.get('/LogAdmin', escuelaController.LogAdmin);

module.exports = router;