
        const express = require('express');
        const router = express.Router();
        const productController = require('../controllers/Product');
        router.get('/', productController.getAll);
        router.post('/', productController.create);
        router.get('/:id', productController.getById);
        router.put('/:id', productController.updateById);
        router.patch('/:id', productController.updateById);
        router.patch('/undelete/:id', productController.undeleteById);
        router.delete('/:id', productController.deleteById);
        module.exports = router;
    