const bcrypt = require('bcrypt');
const jwtService = require('../services/jwt/jwt.service');
const userService = require('../services/user.service');

class UserAuthController {
    static async signUp(req, res) {
        try {
            const data = req.body;
            const user = await userService.createUser(data);
            const token = jwtService.createToken(user);
            res.status(201).json({ token, user });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    static async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await userService.getUserByEmail(email);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }
            const token = jwtService.createToken(user);
            res.status(200).json({ token, user });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = UserAuthController;