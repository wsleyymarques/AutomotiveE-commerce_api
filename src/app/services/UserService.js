const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRepository = require("../repositories/UserRepository");

class UserService {
    async register({ name, email, password }) {
        const existingUser = await userRepository.findByEmail(email);
        if (existingUser) {
            const err = new Error("Email já cadastrado");
            err.status = 400;
            throw err;
        }

        const password_hash = await bcrypt.hash(password, 10);

        const user = await userRepository.create({
            name,
            email,
            password_hash,
        });

        return {
            id: user.id,
            name: user.name,
            email: user.email,
        };
    }

    async login({ email, password }) {
        const user = await userRepository.findByEmail(email);
        if (!user) {
            const err = new Error("Usuário não encontrado");
            err.status = 404;
            throw err;
        }

        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            const err = new Error("Senha inválida");
            err.status = 401;
            throw err;
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        return {
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        };
    }
}

module.exports = new UserService();
