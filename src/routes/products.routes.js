const express = require('express');
const router = express.Router();

router.get('/products', (req, res) => {
    res.send('Lista de produtos');
    console.log('rota de produtos funcionando');
});

module.exports = router;