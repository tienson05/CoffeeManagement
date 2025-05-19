const pool = require('../config/db');

async function createProduct(productData) {
    const { name, unit, price, category_id, description, image_url } = productData;
    const sql = `INSERT INTO product (name, price, category_id, unit, description, image_url) VALUES (?, ?, ?, ?, ?, ?)`;
    const [result] = await pool.execute(sql, [name, price, category_id, unit, description, image_url]);
    return { id: result.insertId, ...productData };
}

async function getAllProducts() {
    const sql = 'SELECT * FROM product';
    const [rows] = await pool.query(sql);
    return rows;
}

async function getProductById(id) {
    const sql = 'SELECT * FROM product WHERE id = ?';
    const [rows] = await pool.execute(sql, [id]);
    return rows[0] || null;
}

async function getProductsByCategory(categoryId) {
    const [rows] = await pool.execute(
        'SELECT * FROM product WHERE category_id = ?',
        [categoryId]
    );
    return rows;
}

async function updateProduct(id, productData) {
    console.log(id, productData)
    const { name, price, image_url } = productData;
    const sql = `UPDATE product SET name = ?, price = ?, image_url = ? WHERE id = ?`;
    const [result] = await pool.execute(sql, [name, price, image_url, id]);
    return result.affectedRows > 0;
}

async function deleteProduct(id) {
    const sql = 'DELETE FROM product WHERE id = ?';
    const [result] = await pool.execute(sql, [id]);
    return result.affectedRows > 0;
}

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    getProductsByCategory,
};
