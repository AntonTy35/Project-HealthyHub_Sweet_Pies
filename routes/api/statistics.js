const express = require("express");

const ctrl = require("../../controllers/statistics");
const { authenticate } = require("../../middlewares");

const router = express.Router();

router.get("/statistics", authenticate, ctrl.getUserStatistics);

module.exports = router;
