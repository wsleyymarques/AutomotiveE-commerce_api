const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const authMiddleware = require("../../middlewares/authMiddleware");

router.use(authMiddleware);

router.get('/', cartController.listCart.bind(cartController));
router.post('/', cartController.addItem.bind(cartController));
router.put('/:id', cartController.updateItem.bind(cartController));
router.delete('/:id', cartController.removeItem.bind(cartController));

module.exports = router;
