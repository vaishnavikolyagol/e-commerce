const express = require('express');
const router = express.Router();
const {
    addOrderItems,
    getOrderById,
    createRazorpayOrder,
    verifyRazorpayPayment,
    getMyOrders,
    getOrders,
} = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
    .post(protect, addOrderItems)
    .get(protect, admin, getOrders);
router.route('/myorders').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').post(protect, createRazorpayOrder);
router.route('/:id/verify').post(protect, verifyRazorpayPayment);

module.exports = router;
