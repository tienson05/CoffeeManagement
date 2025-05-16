const pool = require('../config/db');

// Lấy tất cả category
async function getAllCategories() {
    const sql = 'SELECT * FROM category';
    const [rows] = await pool.query(sql);
    return rows;
}

// Lấy category theo ID
async function getCategoryById(id) {
    const sql = 'SELECT * FROM category WHERE id = ?';
    const [rows] = await pool.execute(sql, [id]);
    return rows[0];
}

// Tạo category mới
async function createCategory(data) {
    const { name } = data;
    const sql = 'INSERT INTO category (name) VALUES (?)';
    const [result] = await pool.execute(sql, [name]);
    return { id: result.insertId, name };
}

// Cập nhật category theo ID
async function updateCategory(id, data) {
    const { name } = data;
    const sql = 'UPDATE category SET name = ? WHERE id = ?';
    const [result] = await pool.execute(sql, [name, id]);
    return result.affectedRows > 0;
}

// Xóa category theo ID
async function deleteCategory(id) {
    const sql = 'DELETE FROM category WHERE id = ?';
    const [result] = await pool.execute(sql, [id]);
    return result.affectedRows > 0;
}

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
};
