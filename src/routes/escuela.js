const express = require('express');
const router = express.Router();

const escuelaController = require('../controllers/escuelaController');

router.get('/VistaDirec', escuelaController.list);

module.exports = router;