const express = require('express');
const router = express.Router();
const Order = require('../models/orders');
const checkAuth = require('../middleware/check-auth');
const OrdersController = require('../controllers/orders');

router.get('/', checkAuth, OrdersController.orders_get_all);

router.post('/', checkAuth, OrdersController.order_create);

router.get('/:oid',checkAuth, OrdersController.order_get_with_id);

router.delete('/:oid',checkAuth, OrdersController.order_delete_with_id);

module.exports = router;