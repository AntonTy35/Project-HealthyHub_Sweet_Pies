const { User } = require("../../models/user");
const ctrlWrapper = require("../../helpers/ctrlWrapper");
const { Weight, weightSchema } = require("../../models/weight");

// міняємо вагу в user *******************
const updateUserWeight = ctrlWrapper(async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const [bearer, token] = authHeader.split(" ", 2);
  const tasks = await User.find({ token }).exec();
  const task = { ...tasks };

  const tasksUserPs = await User.find(task[0]._id).exec();

  const taskUserPs = { ...tasksUserPs };
  const weight = taskUserPs[0];
  const renewedUserId = weight._id;
  const userName = weight.name;

  const renewedWeight = req.body.weight;
  console.log(
    "1.1 - це updateUserWeight - ",
    { userName },
    { renewedUserId },
    { renewedWeight }
  );

  await User.findByIdAndUpdate(renewedUserId, renewedWeight, {
    new: true,
  });

  console.log("1.2 - це updateUserWeight - оновлено", {
    renewedUserId,
  });

  // ********** додаємо нову вагу в DB

  const tasksWeight = await Weight.find().exec();

  console.log("1.1 - додаємо нову вагу в DB ", { tasksWeight });

  if (tasksWeight.length !== 0) {
    return res.status(400).send("дозволено тільки редагування");
  }

  const newTask = {
    weight: renewedWeight,
    owner: renewedUserId,
    name: userName,
  };

  console.log("addContactService 1.2 ", { newTask });

  await Weight.create(newTask);

  res.status(201).json(newTask);

  console.log("1.4 - додаємо нову вагу в DB - ", {
    url: req.originalUrl,
    statusMessage: res.statusMessage,
    statusCode: res.statusCode,
    body: req.body,
  });
});

module.exports = {
  updateUserWeight,
};
