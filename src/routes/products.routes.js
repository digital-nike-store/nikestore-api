const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products.controller');
const productsMiddleware = require('../middlewares/products');

router.get('/', productsController.getAllProducts);
router.get('/productspromotion', productsController.getProductPromotions);
router.get('/:id', productsMiddleware.validateGetProductId, productsController.getProductById);
router.post('/', productsMiddleware.validateCreateProduct, productsController.createProduct);
router.put('/:id', productsMiddleware.validateUpdateProduct, productsController.updateProduct);
router.delete('/:id', productsMiddleware.validateDeleteProduct, productsController.deleteProduct);

module.exports = router;
