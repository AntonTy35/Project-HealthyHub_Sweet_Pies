const express = require("express");
const ctrl = require("../../controllers/recommendedFood");

const router = express.Router();

router.get("/", ctrl.getRecommendedFood);

module.exports = router;
