
        const express = require('express');
        const router = express.Router();
        router.get('/', (req, res) => res.json({message: 'Address route mock'}));
        router.post('/', (req, res) => res.json({message: 'Address POST route mock'}));
        module.exports = router;
    