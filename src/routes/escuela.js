const express = require('express');
const router = express.Router();

const escuelaController = require('../controllers/escuelaController');

router.get('/VistaDirec', escuelaController.list);
router.get('/VistaAdmin', escuelaController.showPage);
router.get('/DeleteDirec/:id', escuelaController.deleteDirec);
router.get('/EditDirec/:id', escuelaController.showEdit);
router.post('/EditDirec/:id', escuelaController.editDirec);
module.exports = router;