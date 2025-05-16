const express = require('express');
const router = express.Router();
const billController = require('../controllers/bill.controller');

// Tạo bill mới
router.post('/', billController.createBill);

// Lấy tất cả bill
router.get('/', billController.getAllBills);

// Lấy bill theo ID (kèm sản phẩm trong bill)
router.get('/:id', billController.getBillById);

module.exports = router;
