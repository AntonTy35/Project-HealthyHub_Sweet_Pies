const {
  listContactsService,
  addContactService,
  updateContactService,
} = require("../services/userPsIndicatorService");

const controllerWrapper = require("../helpers/controllerWrapper");

const {
  addUserPsIndicatorsSchema,
  updateUserPsIndicatorsSchema,
} = require("../utils/validation/validationUserPsIndicators");

const UserPsIndicator = require("../models/userPsIndicators");

const listContacts = async (req, res, next) => {
  const tasks = await listContactsService(req, res, next);
  res.status(200).json(tasks);

  console.log("це contact Controller - listContacts", {
    url: req.originalUrl,
    statusMessage: res.statusMessage,
    statusCode: res.statusCode,
  });
};

const addUserPsIndicator = controllerWrapper(async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const [bearer, token] = authHeader.split(" ", 2);

  console.log("1.1 - це contact Controller ", { token });

  const tasks = await UserPsIndicator.find().exec();

  // чому в req  нет  _id: new ObjectId

  console.log("1.2 - це contact Controller ", { tasks });

  if (tasks.length !== 0) {
    return res.status(400).send("дозволено тільки редагування");
  }

  console.log("1.3 - це contact Controller ", { tasks });

  const response = addUserPsIndicatorsSchema.validate(req.body, {
    abortEarly: false,
  });

  if (typeof response.error !== "undefined") {
    return res
      .status(400)
      .send(response.error.details.map((err) => err.message).join(", "));
  }

  const newTask = await addContactService(token, req);
  res.status(201).json(newTask);

  console.log("1.4 - це contact Controller - addContact", {
    url: req.originalUrl,
    statusMessage: res.statusMessage,
    statusCode: res.statusCode,
    body: req.body,
  });
});

const updateContact = controllerWrapper(async (req, res, next) => {
  const response = updateUserPsIndicatorsSchema.validate(req.body, {
    abortEarly: false,
  });

  if (typeof response.error !== "undefined") {
    return res
      .status(400)
      .send(response.error.details.map((err) => err.message).join(", "));
  }

  const renewedTask = await updateContactService(req);
  res.status(200).json(renewedTask);

  console.log("це contact Controller - updateContact", {
    url: req.originalUrl,
    statusMessage: res.statusMessage,
    statusCode: res.statusCode,
  });
});

module.exports = {
  listContacts,
  addUserPsIndicator,
  updateContact,
};
