const express = require("express");
const router = express.Router();
const controller = require('../controllers/saveUser')

router.post("/save-user", controller.saveUser);
router.get("/main", controller.getUser);

router.get('/:id', controller.deleteUser);
module.exports = router;