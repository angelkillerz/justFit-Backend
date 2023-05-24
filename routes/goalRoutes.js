const express = require("express");
const goalController = require("../controllers/goalController");
const router = express.Router();

router.get("/api/goal", goalController.getGoal);
router.get("/api/goal/:status", goalController.getGoalsByStatus);
router.post("/api/goal", goalController.createGoal);
router.put("/api/goal/:id", goalController.updateStatusGoal);

module.exports = router;