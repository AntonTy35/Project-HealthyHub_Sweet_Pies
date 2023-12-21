const express = require("express");

const { validateBody, authenticate } = require("../../middlewares");

const { userSchemas } = require("../../models/user");

const ctrl = require("../../controllers/auth");

const router = express.Router();

router.post("/signup", validateBody(userSchemas.signupSchema), ctrl.signup);

router.get("/verify/:verificationToken", ctrl.verify);

router.post("/verify", ctrl.resVerifyEmail);

router.post("/signin", validateBody(userSchemas.signinSchema), ctrl.signin);

router.post("/signout", authenticate, ctrl.signout);

router.post("/forgot-password", ctrl.forgotPassword);

module.exports = router;
