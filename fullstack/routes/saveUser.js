const express = require("express");
const router = express.Router();
const controller = require('../controllers/saveUser')

router.post("/save-user", controller.saveUser);

module.exports = router;