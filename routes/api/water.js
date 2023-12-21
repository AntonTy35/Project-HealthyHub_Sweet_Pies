const express = require("express");
const router = express.Router();

const { validateBody, authenticate } = require("../../middlewares");

const addSchema = require("../../models/water");

const ctrl = require("../../controllers/water");

router.post(
  "/water-intake",
  authenticate,
  validateBody(addSchema),
  ctrl.waterIntake
);

module.exports = router;
