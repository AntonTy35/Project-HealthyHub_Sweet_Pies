const express = require("express");

const validateBody = require("../../middlewares/validateBody");
const { userSchemas } = require("../../models/user");
const { ctrlWrapper } = require("../../helpers");
const { signup, signin } = require("../../controllers/auth");

const router = express.Router();

router.post(
  "/signup",
  validateBody(userSchemas.registerSchema),
  ctrlWrapper(signup)
);

router.post(
  "/signin",
  validateBody(userSchemas.registerSchema),
  ctrlWrapper(signin)
);

module.exports = router;
