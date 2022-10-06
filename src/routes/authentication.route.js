const express = require("express");
const router = express.Router();

const authenticationController = require("../controllers/authentication.controller");

router.post("/login", authenticationController.login);

router.post("/register", authenticationController.register);

router.post("/refresh-token", authenticationController.refreshToken);

router.post("/logout", authenticationController.logout);

module.exports = router;
