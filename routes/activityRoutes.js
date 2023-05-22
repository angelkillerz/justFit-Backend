const express = require("express");
const activityController = require("../controllers/activitycontroller");
const router = express.Router();

router.post("/api/activity", activityController.createActivity);
router.put("/api/activity/:id", activityController.updateActivity);
router.get("/api/activity", activityController.getActivity);
router.delete("/api/activity/:id", activityController.deleteActivity);

module.exports = router;