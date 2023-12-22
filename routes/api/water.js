const express = require("express");
const router = express.Router();

const { validateBody, authenticate, isValidId } = require("../../middlewares");

const addSchema = require("../../models/water");

const ctrl = require("../../controllers/water");

router.post(
  "/water-intake",
  authenticate,
  validateBody(addSchema),
  ctrl.waterIntake
);

router.delete("/water-intake", authenticate, isValidId, ctrl.deleteWater);

module.exports = router;
