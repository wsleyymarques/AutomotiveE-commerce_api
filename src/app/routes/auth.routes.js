const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthController");

const {
    validate,
    registerRules,
    loginRules
} = require('../validators/authValidator');

router.post(
    "/register",
    registerRules(),
    validate,
    AuthController.register.bind(AuthController)
);

router.post(
    "/login",
    loginRules(),
    validate,
    AuthController.login.bind(AuthController)
);

module.exports = router;
