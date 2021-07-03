const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const checkAuth = require('../middleware/check-auth');
const productController = require('../controllers/products');

router.get('/', productController.products_get_all);

router.post('/', checkAuth, productController.product_create);

router.get('/:pid', productController.product_get_with_id);

router.patch('/:pid', checkAuth, productController.product_update_details);

router.delete('/:pid',checkAuth, productController.product_delete);

module.exports = router;