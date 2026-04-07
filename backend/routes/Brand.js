
        const express = require('express');
        const router = express.Router();
        const brandController = require('../controllers/Brand');
        router.get('/', brandController.getAll);
        router.post('/', brandController.create);
        module.exports = router;
    