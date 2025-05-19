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
        FROM order_item oi
        JOIN product p ON oi.product_id = p.id
        WHERE oi.bill_id = ?
    `;
    const [rows] = await pool.execute(sql, [invoiceId]);
    return rows;
}

// Tạo hóa đơn mới cùng với các sản phẩm
async function createBill(billData) {
    const created_at = new Date(); // Dùng dạng Date object (MySQL tự convert)

    const { total_price, created_by, items } = billData;

    const conn = await pool.getConnection();
    try {
        await conn.beginTransaction();

        const insertBillSQL = `
            INSERT INTO bill (total_price, created_at, created_by)
            VALUES (?, ?, ?)
        `;
        const [billResult] = await conn.execute(insertBillSQL, [total_price, created_at, created_by]);

        const billId = billResult.insertId;
        console.log(billId)

        const insertItemSQL = `
            INSERT INTO order_item (bill_id, product_id, quantity, price)
            VALUES (?, ?, ?, ?)
        `;
        for (const item of items) {
            const product_id = item.product_id;
            const quantity = item.quantity;
            const price = parseFloat(item.price); // đảm bảo là số

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
