const express = require("express");

const validateBody = require("../../middlewares/validateBody");
const { userSchemas } = require("../../models/user");
const { listUser } = require("../../controllers/user/listUser");
const { updateUser } = require("../../controllers/user/updateUser");
const { updateUserGoal } = require("../../controllers/user/updateUserGoal");
const { updateUserWeight } = require("../../controllers/user/userUpdateWeight");

const jsonParser = express.json();
const router = express.Router();

router.get("/current", listUser);
router.put(
  "/update",
  jsonParser,
  validateBody(userSchemas.userUpdateFiveKeys),
  updateUser
);
router.put(
  "/goal",
  jsonParser,
  validateBody(userSchemas.userUpdateGoal),
  updateUserGoal
);
router.post(
  "/weight",
  jsonParser,
  validateBody(userSchemas.userUpdateWeight),
  updateUserWeight
);


module.exports = router;
