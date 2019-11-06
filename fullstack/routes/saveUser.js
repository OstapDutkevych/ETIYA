const express = require("express");
const router = express.Router();
const controller = require('../controllers/saveUser')

router.post("/save-user", controller.saveUser);
router.get("/main", controller.getUser);

router.get('/delete/:id', controller.deleteUser);

router.put('/update/:id', controller.updateUser);
router.put('/add-address/:id', controller.addAddress);
module.exports = router;