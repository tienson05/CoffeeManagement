// Business logic chính, gọi DB, xử lý dữ liệu
// GET tất cả (không có tham số) → dùng query().
// GET, UPDATE, DELETE với tham số → dùng execute()

const pool = require('../config/db');

// Lấy tất cả người dùng
async function getAllUsers() {
    const sql = 'SELECT * FROM user';
    const [rows] = await pool.query(sql);
    return rows;
}

// Lấy người dùng theo username
async function getUserByUsername(username) {
    const sql = 'SELECT * FROM user WHERE username = ?';
    const [rows] = await pool.execute(sql, [username]);
    return rows[0] || null;
}

// Lấy người dùng theo ID
async function getUserById(id) {
    const sql = 'SELECT * FROM user WHERE id = ?';
    const [rows] = await pool.execute(sql, [id]);
    return rows[0] || null;
}

// Tạo người dùng mới
async function createUser(userData) {
    const { username, password, role_id, name, salary } = userData;
    const sql = `INSERT INTO user (username, password, role_id, name, salary)
                 VALUES (?, ?, ?, ?, ?)`;
    const [result] = await pool.execute(sql, [username, password, role_id, name, salary]);
    return { id: result.insertId, ...userData };
}

// Cập nhật người dùng
async function updateUser(id, userData) {
    const { username, password, role_id, name, salary } = userData;
    const sql = `UPDATE user SET username = ?, password = ?, role_id = ?, name = ?, salary = ?
                 WHERE id = ?`;
    const [result] = await pool.execute(sql, [username, password, role_id, name, salary, id]);
    return result.affectedRows > 0;
}

// Xóa người dùng
async function deleteUser(id) {
    const sql = 'DELETE FROM user WHERE id = ?';
    const [result] = await pool.execute(sql, [id]);
    return result.affectedRows > 0;
}

// Tìm kiếm người dùng theo tên
async function searchUsersByName(name) {
    const sql = 'SELECT * FROM user WHERE name LIKE ?';
    const [rows] = await pool.execute(sql, [`%${name}%`]);
    return rows;
}

module.exports = {
    getAllUsers,
    getUserByUsername,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    searchUsersByName,
};
