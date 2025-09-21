const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products.controller');
const productsMiddleware = require('../middlewares/products');

router.get('/products', productsController.getAllProducts);
router.get('/productspromotion', productsController.getProductPromotions);
router.get('/products/:id', productsMiddleware.validateGetProductId, productsController.getProductById);
router.post('/products', productsMiddleware.validateCreateProduct, productsController.createProduct);
router.put('/products/:id', productsMiddleware.validateUpdateProduct, productsController.updateProduct);
router.delete('/products/:id', productsMiddleware.validateDeleteProduct, productsController.deleteProduct);

module.exports = router;
