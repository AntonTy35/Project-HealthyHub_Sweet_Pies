const express = require("express");

const validateBody = require("../../middlewares/validateBody");
const authenticate = require("../../middlewares/authenticate");
const { userSchemas } = require("../../models/user");
const { ctrlWrapper } = require("../../helpers");
const {
  signup,
  signin,
  verify,
  resVerifyEmail,
  signout,
} = require("../../controllers/auth");
const forgotPassword = require("../../controllers/auth/forgot-password");

const router = express.Router();

router.post(
  "/signup",
  validateBody(userSchemas.signupSchema),
  ctrlWrapper(signup)
);
router.get("/verify/:verificationToken", ctrlWrapper(verify));

router.post("/verify", ctrlWrapper(resVerifyEmail));

router.post(
  "/signin",
  validateBody(userSchemas.signinSchema),
  ctrlWrapper(signin)
);
router.post("/signout", authenticate, ctrlWrapper(signout));

router.post("/forgot-password", ctrlWrapper(forgotPassword));

module.exports = router;
