const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

router.get("/api/user", userController.getUser);
router.post("/api/user", userController.createUser);
router.put("/api/user/:id", userController.updateUser);
router.delete("/api/user/:id", userController.deleteUser);

module.exports = router;