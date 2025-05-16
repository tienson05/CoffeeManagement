// Xử lý logic khi nhận request (gọi service)
// Nhận request, gọi service, trả response. Không nên xử lý logic phức tạp tại đây.
const userService = require('../services/user.service');

exports.getUsers = async (req, res) => {
    console.log("Da vao controller")
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.createUser = async (req, res) => {
    try {
        const userData = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            address: req.body.address,
            phone: req.body.phone,
        };
        const newUser = await userService.createUser(userData);
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error creating user:', err);
        res.status(500).json({ error: 'Something went wrong' });
    }
}

// Lấy user theo ID
exports.getUserById = async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User không tồn tại' });
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi khi lấy user' });
    }
};
// Cập nhật user
exports.updateUser = async (req, res) => {
    try {
        const result = await userService.updateUser(req.params.id, req.body);
        if (result.affectedRows === 0)
            return res.status(404).json({ message: 'User không tồn tại' });
        res.json({ message: 'Cập nhật user thành công' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi khi cập nhật user' });
    }
};

// Xoá user
exports.deleteUser = async (req, res) => {
    try {
        const result = await userService.deleteUser(req.params.id);
        if (result.affectedRows === 0)
            return res.status(404).json({ message: 'User không tồn tại' });
        res.json({ message: 'Xoá user thành công' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi khi xoá user' });
    }
};

// Tìm kiếm user theo tên (query param ?name=xxx)
exports.searchUsersByName = async (req, res) => {
    try {
        const { name } = req.query;
        if (!name) return res.status(400).json({ message: 'Name query parameter is required' });
        const users = await userService.searchUsersByName(name);
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to search users' });
    }
};