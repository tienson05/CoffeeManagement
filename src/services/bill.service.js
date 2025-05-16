const pool = require('../config/db');

// Lấy tất cả hóa đơn
async function getAllBills() {
    const sql = 'SELECT * FROM bill ORDER BY created_at DESC';
    const [rows] = await pool.query(sql);
    return rows;
}

// Lấy hóa đơn theo ID
async function getBillById(id) {
    const sql = 'SELECT * FROM bill WHERE id = ?';
    const [rows] = await pool.execute(sql, [id]);
    return rows[0];
}

// Lấy danh sách sản phẩm trong 1 hóa đơn
async function getOrderItemsByBillId(invoiceId) {
    const sql = `
        SELECT oi.*, p.name AS product_name
        FROM orderitem oi
        JOIN product p ON oi.product_id = p.id
        WHERE oi.invoice_id = ?
    `;
    const [rows] = await pool.execute(sql, [invoiceId]);
    return rows;
}

// Tạo hóa đơn mới cùng với các sản phẩm
async function createBill(billData) {
    const { phoneNumberCus, totalPrice, created_at, createdByEmployID, items } = billData;

    const conn = await pool.getConnection();
    try {
        await conn.beginTransaction();

        const insertBillSQL = `
            INSERT INTO bill (phoneNumberCus, totalPrice, created_at, createdByEmployID)
            VALUES (?, ?, ?, ?)
        `;
        const [billResult] = await conn.execute(insertBillSQL, [
            phoneNumberCus, totalPrice, created_at, createdByEmployID
        ]);

        const billId = billResult.insertId;

        const insertItemSQL = `
            INSERT INTO orderitem (invoice_id, product_id, quantity, price)
            VALUES (?, ?, ?, ?)
        `;
        for (const item of items) {
            const { product_id, quantity, price } = item;
            await conn.execute(insertItemSQL, [billId, product_id, quantity, price]);
        }

        await conn.commit();
        return { id: billId };
    } catch (error) {
        await conn.rollback();
        throw error;
    } finally {
        conn.release();
    }
}

module.exports = {
    getAllBills,
    getBillById,
    getOrderItemsByBillId,
    createBill,
};
