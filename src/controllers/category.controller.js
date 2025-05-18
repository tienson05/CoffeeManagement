const categoryService = require('../services/category.service');
const productService = require('../services/product.service')
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await categoryService.getAllCategories();

        // Duyệt từng category để lấy products theo từng categoryId
        const results = await Promise.all(categories.map(async (category) => {
            const products = await productService.getProductsByCategory(category.id);
            return {
                ...category,
                products: products,
            };
        }));

        res.json(results);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Lỗi khi lấy danh mục và sản phẩm' });
    }
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
