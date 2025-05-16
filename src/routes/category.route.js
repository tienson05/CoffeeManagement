const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');

// Tạo category mới
router.post('/', categoryController.createCategory);

// Lấy tất cả category
router.get('/', categoryController.getAllCategories);

// Lấy 1 category theo ID
router.get('/:id', categoryController.getCategoryById);

// Cập nhật category theo ID
router.put('/:id', categoryController.updateCategory);

// Xóa category theo ID
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;
