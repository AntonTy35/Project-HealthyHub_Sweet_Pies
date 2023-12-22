const { addContactService } = require("../../services/userPsIndicatorService");

const controllerWrapper = require("../../helpers/controllerWrapper");

const {
  addUserPsIndicatorsSchema,
} = require("../../utils/validation/validationUserPsIndicators");

const UserPsIndicator = require("../../models/userPsIndicators");

const addUserPsIndicator = controllerWrapper(async (req, res, next) => {
  console.log("1.1 - це contact Controller ");

  const tasks = await UserPsIndicator.find({ owner: req.user.id }).exec();

  if (tasks.length !== 0) {
    return res.status(400).send("дозволено тільки редагування");
  }

  const response = addUserPsIndicatorsSchema.validate(req.body, {
    abortEarly: false,
  });

  if (typeof response.error !== "undefined") {
    return res
      .status(400)
      .send(response.error.details.map((err) => err.message).join(", "));
  }

  const newTask = await addContactService(req);
  res.status(201).json(newTask);

  console.log("1.4 - це contact Controller - addContact", {
    url: req.originalUrl,
    statusMessage: res.statusMessage,
    statusCode: res.statusCode,
    body: req.body,
  });
});

module.exports = {
  addUserPsIndicator,
};
