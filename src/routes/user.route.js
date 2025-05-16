// Định nghĩa các route cho user
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// Tạo user mới
router.post('/', userController.createUser);

// Lấy tất cả user
router.get('/', userController.getUsers);

// Lấy 1 user theo ID
router.get('/:id', userController.getUserById);

// Cập nhật user theo ID
router.put('/:id', userController.updateUser);

// Xóa user theo ID
router.delete('/:id', userController.deleteUser);

// Tìm kiếm user theo tên (ví dụ query param ?name=xxx)
router.get('/search', userController.searchUsersByName);

module.exports = router;
