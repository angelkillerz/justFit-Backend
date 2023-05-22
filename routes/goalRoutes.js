const express = require("express");
const goalController = require("../controllers/goalController");
const router = express.Router();

router.post("/api/goal", goalController.createGoal);
router.get("/api/goal", goalController.getGoal);
router.put("/api/goal/:id", goalController.updateStatusGoal);
router.get("/api/goal/:status", goalController.getGoalsByStatus);

module.exports = router;