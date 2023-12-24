const express = require("express");

const { validateBody, authenticate } = require("../../middlewares");
const { foodSchemas } = require("../../models");
const ctrl = require("../../controllers/food");

const router = express.Router();

router.post(
  "/food-intake",
  authenticate,
  validateBody(foodSchemas.createFoodSchema),
  ctrl.createFood
);

router.put(
  "/food-intake/:id",
  authenticate,
  validateBody(foodSchemas.updateFoodSchema),
  ctrl.updateFood
);

router.delete("/food-intake", authenticate, ctrl.deleteFood);

module.exports = router;
