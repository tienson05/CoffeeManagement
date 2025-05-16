const userService = require('../services/user.service');

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;  // Lấy từ body

        // Lấy user theo username
        const user = await userService.getUserByUsername(username);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // So sánh mật khẩu (nếu chưa mã hóa thì tạm so sánh trực tiếp)
        const passwordMatch = user.password === password;
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const u = {
            id: user.id,
            username: user.username,
            role_id: user.role_id,
            name: user.name
        };

        res.json(u);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
