const { body, param, validationResult } = require('express-validator');

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    return res.status(400).json({ errors: errors.array() });
};

const createProductRules = () => [
    body('name')
        .trim()
        .notEmpty().withMessage('O nome é obrigatório.'),
    body('code')
        .trim()
        .notEmpty().withMessage('O código é obrigatório.'),
    body('price')
        .isFloat({ gt: 0 }).withMessage('O preço deve ser um número maior que zero.'),
];

const updateProductRules = () => [
    param('id')
        .isInt({ min: 1 }).withMessage('O ID do produto é inválido.'),
    body('name')
        .optional()
        .trim()
        .notEmpty().withMessage('O nome não pode ser vazio.'),
    body('code')
        .optional()
        .trim()
        .notEmpty().withMessage('O código não pode ser vazio.'),
    body('price')
        .optional()
        .isFloat({ gt: 0 }).withMessage('O preço, se fornecido, deve ser maior que zero.'),
];

const validateIdParam = () => [
    param('id')
        .isInt({ min: 1 }).withMessage('O ID do produto na URL é inválido.'),
];

module.exports = {
    validate,
    createProductRules,
    updateProductRules,
    validateIdParam,
};
