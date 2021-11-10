const express = require('express');
const router = express.Router();

const escuelaController = require('../controllers/escuelaController');

router.get('/VistaDirec', escuelaController.list);
router.get('/VistaAdmin', escuelaController.showPage);
router.get('/DeleteDirec/:id', escuelaController.deleteDirec);
router.get('/EditDirec/:id', escuelaController.showEdit);
router.post('/EditDirec/:id', escuelaController.editDirec);
router.get('/DeleteAlum/:id', escuelaController.deleteAlum);
router.get('/EditAlum/:id', escuelaController.editAlum);
router.post('/EditAlum/:id', escuelaController.updateAlum);
module.exports = router;