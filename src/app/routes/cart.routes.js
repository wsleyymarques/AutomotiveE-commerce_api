const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const authMiddleware = require("../middlewares/authMiddleware");
const {
    validate,
    addItemRules,
    updateItemRules,
    removeItemRules,
} = require('../validators/cartValidator');

router.use(authMiddleware);

router.get('/', cartController.listCart.bind(cartController));

router.post('/',
    addItemRules(),
    validate,
    cartController.addItem.bind(cartController)
);

router.put('/:id',
    updateItemRules(),
    validate,
    cartController.updateItem.bind(cartController)
);

router.delete('/:id',
    removeItemRules(),
    validate,
    cartController.removeItem.bind(cartController)
);

module.exports = router;
