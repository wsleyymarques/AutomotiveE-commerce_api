const { body, validationResult } = require('express-validator');

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    return res.status(400).json({ errors: errors.array() });
};

const registerRules = () => [
    body('name')
        .trim()
        .notEmpty().withMessage('O nome é obrigatório.'),
    body('email')
        .isEmail().withMessage('O e-mail fornecido é inválido.')
        .normalizeEmail(),
    body('password')
        .isLength({ min: 6 }).withMessage('A senha deve ter no mínimo 6 caracteres.'),
];

const loginRules = () => [
    body('email')
        .isEmail().withMessage('O e-mail fornecido é inválido.')
        .normalizeEmail(),
    body('password')
        .notEmpty().withMessage('A senha é obrigatória.'),
];

module.exports = {
    validate,
    registerRules,
    loginRules,
};
