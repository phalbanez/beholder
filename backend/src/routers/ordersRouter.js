const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/ordersController');

router.get('/last', ordersController.getLastOrders);

router.get('/reports/:quote', ordersController.getOrdersReport);

router.get('/:orderId/:clientOrderId', ordersController.getOrder);

router.get('/:symbol?', ordersController.getOrders);

router.post('/:id/sync', ordersController.syncOrder);

router.post('/', ordersController.placeOrder);

router.delete('/:symbol/:orderId', ordersController.cancelOrder);

module.exports = router;