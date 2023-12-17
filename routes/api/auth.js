const express = require("express");

const validateBody = require("../../middlewares/validateBody");
const { userSchemas } = require("../../models/user");
const { ctrlWrapper } = require("../../helpers");
const {
  signup,
  signin,
  verify,
  resVerifyEmail,
} = require("../../controllers/auth");

const router = express.Router();

router.post(
  "/signup",
  validateBody(userSchemas.registerSchema),
  ctrlWrapper(signup)
);
router.get("/verify/:verificationToken", ctrlWrapper(verify));

router.post("/verify", ctrlWrapper(resVerifyEmail));

router.post(
  "/signin",
  validateBody(userSchemas.loginSchema),
  ctrlWrapper(signin)
);

module.exports = router;
