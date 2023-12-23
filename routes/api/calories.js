const express = require("express");
const { authenticate } = require("../../middlewares");
const ctrl = require("../../controllers/calories");

const router = express.Router();

router.get("/calories/:ownerId", authenticate, ctrl.getAllCalories);

router.get("/daily-goal-calories", authenticate, ctrl.dailyGoalCalories);

module.exports = router;
