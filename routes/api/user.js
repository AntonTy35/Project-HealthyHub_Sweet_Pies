const express = require("express");

// const validateBody = require("../../middlewares/validateBody");
// const authenticate = require("../../middlewares/authenticate");
// const { userSchemas } = require("../../models/user");

const {
  listContacts,
  addUserPsIndicator,
  updateContact,
} = require("../../controllers/userPsIndicatorController");

const jsonParser = express.json();
const router = express.Router();

router.get("/", listContacts);

router.post("/current", jsonParser, addUserPsIndicator);

router.put("/update", jsonParser, updateContact);

// router.post("/goal", validateBody(userSchemas.signupSchema), ctrl.goal);

// router.post("/weight", validateBody(userSchemas.signupSchema), ctrl.weight);


module.exports = {userRouter: router};
