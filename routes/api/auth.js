const express = require("express");
const ctrl = require("../../controllers/auth/signup");

const validateBody = require("../../middlewares/validateBody");
const { userSchemas } = require("../../models/user");
// const { ctrlWrapper } = require("../../helpers");

const router = express.Router();

router.post("/signup", validateBody(userSchemas.registerSchema), ctrl.signup);

// signin

module.exports = router;
