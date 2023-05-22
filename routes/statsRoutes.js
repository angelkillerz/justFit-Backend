const express = require("express");
const statsController = require("../controllers/statsController");
const router = express.Router();

router.get("/api/stats/all", statsController.getTotalsUserActivityStatsAll);

module.exports = router;