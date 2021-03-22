const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    return res.send({message: 'Get is working!'});
});

router.post('/', (req, res) => {
    return res.send({message: 'Post is working!'});
});

module.exports = router;