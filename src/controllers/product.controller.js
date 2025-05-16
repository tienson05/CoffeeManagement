const productService = require('../services/product.service');

exports.createProduct = async (req, res, next) => {
    try {
        const productData = req.body;
        const newProduct = await productService.createProduct(productData);
        res.status(201).json(newProduct);
    } catch (error) {
        next(error);
    }
};

exports.getAllProducts = async (req, res, next) => {
    try {
        const products = await productService.getAllProducts();
        res.json(products);
    } catch (error) {
        next(error);
    }
};

exports.getProductById = async (req, res, next) => {
    try {
        const product = await productService.getProductById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        next(error);
    }
};

exports.updateProduct = async (req, res, next) => {
    try {
        const updated = await productService.updateProduct(req.params.id, req.body);
        if (!updated) {
            return res.status(404).json({ message: 'Product not found or not updated' });
        }
        res.json({ message: 'Product updated successfully' });
    } catch (error) {
        next(error);
    }
};

exports.deleteProduct = async (req, res, next) => {
    try {
        const deleted = await productService.deleteProduct(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: 'Product not found or not deleted' });
        }
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        next(error);
    }
};
