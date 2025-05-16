const billService = require('../services/bill.service');

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
    const bills = await billService.getAllBills();
    res.json(bills);
};

exports.getBillById = async (req, res) => {
    const { id } = req.params;
    const bill = await billService.getBillById(id);
    if (!bill) return res.status(404).json({ message: 'Bill not found' });

    const items = await billService.getOrderItemsByBillId(id);
    res.json({ ...bill, items });
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
