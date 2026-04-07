
        const express = require('express');
        const router = express.Router();
        router.get('/', (req, res) => res.json({message: 'Review route mock'}));
        router.post('/', (req, res) => res.json({message: 'Review POST route mock'}));
        module.exports = router;
    