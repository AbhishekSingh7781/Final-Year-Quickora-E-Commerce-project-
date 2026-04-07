
        const express = require('express');
        const router = express.Router();
        router.get('/', (req, res) => res.json({message: 'User route mock'}));
        router.post('/', (req, res) => res.json({message: 'User POST route mock'}));
        module.exports = router;
    