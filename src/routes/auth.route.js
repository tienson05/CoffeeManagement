// Định nghĩa các route cho user
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// Tạo user mới
router.post('/', authController.login);

module.exports = router;
