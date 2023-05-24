const express = require("express");
const statsController = require("../controllers/statsController");
const router = express.Router();

router.get("/api/stats/all", statsController.getTotalsUserActivityStatsAll);
router.get("/api/stats/month", statsController.getTotalsUserActivityStatsByMonth);
router.get("/api/stats/week", statsController.getTotalsUserActivityStatsByWeek);
router.get("/api/stats/day", statsController.getTotalsUserActivityStatsByDay);

module.exports = router;