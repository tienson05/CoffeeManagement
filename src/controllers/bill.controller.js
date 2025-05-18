const billService = require('../services/bill.service');
const userService = require('../services/user.service')
//Mẫu JSON gửi khi tạo bill
// {
//   "phoneNumberCus": "0123456789",
//   "totalPrice": 250000,
//   "created_at": "2025-05-16T10:30:00",
//   "createdByEmployID": 2,
//   "items": [
//     { "product_id": 1, "quantity": 2, "price": 50000 },
//     { "product_id": 3, "quantity": 3, "price": 50000 }
//   ]
// }

exports.getAllBills = async (req, res) => {
    try {
        const bills = await billService.getAllBills();

        // Giả sử bạn có userService.getUserById(id)
        const billsWithUser = await Promise.all(
            bills.map(async (bill) => {
                const user = await userService.getUserById(bill.createdByEmployID);
                return {
                    ...bill,
                    user,
                };
            })
        );

        res.json(billsWithUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getBillById = async (req, res) => {
    const { id } = req.params;
    const bill = await billService.getBillById(id);
    if (!bill) return res.status(404).json({ message: 'Bill not found' });

    const items = await billService.getOrderItemsByBillId(id);

    const employee = await userService.getUserById(bill.createdByEmployID);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    // Trả về object kết hợp bill, items, và thông tin nhân viên
    res.json({
        ...bill,
        items,
        employee // thông tin nhân viên được đính kèm luôn
    });
};

exports.createBill = async (req, res) => {
    try {
        const billData = req.body;
        const result = await billService.createBill(billData);
        res.status(201).json({ message: 'Bill created', billId: result.id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error creating bill' });
    }
};
