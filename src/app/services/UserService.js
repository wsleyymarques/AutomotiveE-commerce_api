const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRepository = require("../repositories/UserRepository");

class UserService {
    async register({ name, email, password }) {
        const existing = await userRepository.findByEmail(email);
        if (existing) {
            throw { status: 400, message: "Email já cadastrado" };
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await userRepository.create({
            name,
            email,
            password: hashedPassword,
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
            throw { status: 401, message: "Credenciais inválidas" };
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw { status: 401, message: "Credenciais inválidas" };
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        return { token };
    }
}

module.exports = new UserService();
