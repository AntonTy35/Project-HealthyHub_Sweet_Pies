const express = require("express");

const ctrl = require("../../controllers/recommendedFood");

const router = express.Router();

router.get("/recommended-food", ctrl.getRecommendedFood);

module.exports = router;
