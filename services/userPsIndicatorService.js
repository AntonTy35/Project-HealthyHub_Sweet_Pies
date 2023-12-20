const UserPsIndicator = require("../models/userPsIndicators");
const { User } = require("../models/user");

const listContactsService = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const [bearer, token] = authHeader.split(" ", 2);
  const tasks = await User.find({ token }).exec();
  const task = { ...tasks };

  try {
    const contacts = await UserPsIndicator.find({ owner: task[0]._id }).exec();

    res.send(contacts);
  } catch (err) {
    next(err);
  }
};

const addContactService = async (token, req) => {
  console.log("addContactService 1.1 - ", token);
  const tasks = await User.find({ token }).exec();
  const task = { ...tasks };

  console.log("addContactService 1.2 - ", task);

  const contact = {
    age: req.body.age,
    height: req.body.height,
    weight: req.body.weight,
    gender: req.body.gender,
    activity: req.body.activity,
    owner: task[0]._id,
    name: task[0].name,
  };

  console.log("addContactService 1.2 ", { contact });

  await UserPsIndicator.create(contact);

  return contact;
};

const updateContactService = async (req) => {
  console.log("1.1 - це Contact Services - updateContact - ",  req.body );

  const authHeader = req.headers["authorization"];
  const [bearer, token] = authHeader.split(" ", 2);
  const tasks = await User.find({ token }).exec();
  const task = { ...tasks };

  const tasksUserPs = await UserPsIndicator.find({ owner: task[0]._id }).exec();

  const taskUserPs = { ...tasksUserPs };
  const { age, height, weight, activity } = taskUserPs[0];
  const idUserPsIndicator = taskUserPs[0]._id;

  console.log(
    "1.2 - це Contact Services - updateContact - ",
    { tasksUserPs },
    { idUserPsIndicator },
    age,
    height,
    weight,
    activity
  );

  const contact = req.body;

  console.log("1.3 - це Contact Services - updateContact - ", { contact });

  await UserPsIndicator.findByIdAndUpdate(idUserPsIndicator, contact, {
    new: true,
  });

  console.log(
    "1.4 - це Contact Services - updateContact - оновлено ",
    idUserPsIndicator
  );

  return idUserPsIndicator;
};

module.exports = {
  listContactsService,
  addContactService,
  updateContactService,
};
