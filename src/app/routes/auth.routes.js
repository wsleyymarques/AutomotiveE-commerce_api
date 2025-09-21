const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthController");

router.post(
    "/register",
    AuthController.validateRegister(),
    (req, res) => AuthController.register(req, res)
);

router.post(
    "/login",
    AuthController.validateLogin(),
    (req, res) => AuthController.login(req, res)
);

module.exports = router;
