const { body, param, validationResult } = require('express-validator');

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    return res.status(400).json({ errors: errors.array() });
};

const addItemRules = () => [
    body('productId')
        .isInt({ min: 1 }).withMessage('O ID do produto é inválido.'),
    body('quantity')
        .isInt({ min: 1 }).withMessage('A quantidade deve ser um número inteiro maior que zero.'),
];

const updateItemRules = () => [
    param('id')
        .isInt({ min: 1 }).withMessage('O ID do item no carrinho é inválido.'),
    body('quantity')
        .isInt({ min: 1 }).withMessage('A quantidade deve ser um número inteiro maior que zero.'),
];

const removeItemRules = () => [
    param('id')
        .isInt({ min: 1 }).withMessage('O ID do item no carrinho é inválido.'),
];

module.exports = {
    validate,
    addItemRules,
    updateItemRules,
    removeItemRules,
};
