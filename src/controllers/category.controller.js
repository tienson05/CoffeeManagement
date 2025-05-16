const categoryService = require('../services/category.service');

exports.getAllCategories = async (req, res) => {
    const categories = await categoryService.getAllCategories();
    res.json(categories);
};

exports.getCategoryById = async (req, res) => {
    const { id } = req.params;
    const category = await categoryService.getCategoryById(id);
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.json(category);
};

exports.createCategory = async (req, res) => {
    const data = req.body;
    const newCategory = await categoryService.createCategory(data);
    res.status(201).json(newCategory);
};

exports.updateCategory = async (req, res) => {
    const { id } = req.params;
    const updated = await categoryService.updateCategory(id, req.body);
    if (!updated) return res.status(404).json({ message: 'Category not found' });
    res.json({ message: 'Category updated successfully' });
};

exports.deleteCategory = async (req, res) => {
    const { id } = req.params;
    const deleted = await categoryService.deleteCategory(id);
    if (!deleted) return res.status(404).json({ message: 'Category not found' });
    res.json({ message: 'Category deleted successfully' });
};
