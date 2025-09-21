const { body, validationResult } = require("express-validator");
const userService = require("../services/UserService");

class AuthController {
    validateRegister() {
        return [
            body("name").notEmpty().withMessage("Nome é obrigatório"),
            body("email").isEmail().withMessage("Email inválido"),
            body("password").isLength({ min: 6 }).withMessage("Senha mínima de 6 caracteres"),
        ];
    }

    validateLogin() {
        return [
            body("email").isEmail().withMessage("Email inválido"),
            body("password").notEmpty().withMessage("Senha é obrigatória"),
        ];
    }

    async register(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const user = await userService.register(req.body);
            return res.status(201).json({ user });
        } catch (err) {
            return res.status(err.status || 500).json({ error: err.message || "Erro no servidor" });
        }
    }

    async login(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const result = await userService.login(req.body);
            return res.json(result);
        } catch (err) {
            return res.status(err.status || 500).json({ error: err.message || "Erro no servidor" });
        }
    }
}

module.exports = new AuthController();
