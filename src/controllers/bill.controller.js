const billService = require('../services/bill.service');
const userService = require('../services/user.service')

exports.getAllBills = async (req, res) => {
    try {
        const bills = await billService.getAllBills();

        const billsWithUser = await Promise.all(
            bills.map(async (bill) => {
                const user = await userService.getUserById(bill.created_by);
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

    const employee = await userService.getUserById(bill.created_by);
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
