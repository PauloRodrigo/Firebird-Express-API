const express = require('express');
const router = express.Router();
const controller = require('../controllers/produtosController');

router.get('/', controller.get);
router.get('/id/:id', controller.getByID);
router.get('/name/:name', controller.getByName);

router.post('/', controller.post);

module.exports = router;