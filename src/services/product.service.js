const pool = require('../config/db');

async function createProduct(productData) {
    const { name, price, category_id, unit } = productData;
    const sql = `INSERT INTO product (name, price, category_id, unit) VALUES (?, ?, ?, ?)`;
    const [result] = await pool.execute(sql, [name, price, category_id, unit]);
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

async function updateProduct(id, productData) {
    const { name, price, category_id, unit } = productData;
    const sql = `UPDATE product SET name = ?, price = ?, category_id = ?, unit = ? WHERE id = ?`;
    const [result] = await pool.execute(sql, [name, price, category_id, unit, id]);
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
};
