const userService = require("../services/UserService");

class AuthController {
    async register(req, res, next) {
        try {
            const result = await userService.register(req.body);

            return res.status(201).json({
                status: 'success',
                data: result
            });
        } catch (err) {
            next(err);
        }
    }

    async login(req, res, next) {
        try {
            const result = await userService.login(req.body);

            return res.json({
                status: 'success',
                data: result
            });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new AuthController();
