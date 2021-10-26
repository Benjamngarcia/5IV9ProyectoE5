const controller = {};
const pool = require('../database');

controller.open = (req, res) => {
    res.render('index');
}

module.exports = controller;
