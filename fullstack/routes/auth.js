const express = require("express");
const router = express.Router();
const controller = require('../controllers/authentication')

router.post("/login", controller.loginUser);
router.post("/register", controller.registerUser);
module.exports = router;