const router = require('express').Router();
const escuelaController = require('../controllers/escuelaController');

router.get('/', escuelaController.open);

module.exports = router;