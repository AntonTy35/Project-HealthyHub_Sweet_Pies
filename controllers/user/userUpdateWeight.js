const { User } = require("../../models/user");
const ctrlWrapper = require("../../helpers/ctrlWrapper");
const { Weight } = require("../../models/weight");

// міняємо вагу в user *******************
const updateUserWeight = ctrlWrapper(async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const [bearer, token] = authHeader.split(" ", 2);
  const tasks = await User.find({ token }).exec();
  const task = { ...tasks };

  const dataUser = await User.find(task[0]._id).exec();

  const dataUserCurrent = { ...dataUser };

  const userVariableValues = dataUserCurrent[0];
  const renewedUserId = userVariableValues._id;
  const userName = userVariableValues.name;

  const renewedWeight = req.body;

  await User.findByIdAndUpdate(renewedUserId, renewedWeight, {
    new: true,
  });

  console.log("1.1 - це updateUserWeight - оновлено", {
    renewedUserId,
  });

  // ********** додаємо нову вагу в DB

  const tasksWeight = await Weight.find({ owner: renewedUserId }).exec();

  if (tasksWeight.length !== 0) {
    const taskWeight = { ...tasksWeight };
    const renewedWeightId = taskWeight[0]._id;
    // const ownerId = taskWeight[0].owner;
    

    const updatedUser = await Weight.findByIdAndUpdate(renewedWeightId, {
      $push: { list: renewedWeight },
    });
    
console.log(
  "2.0 - це updateUserWeight - існує база овнера - ",
  { updatedUser }
);
    return res.status(201).send("редагування виконано");
  }

  const newTask = {
    weight: renewedWeight,
    owner: renewedUserId,
    name: userName,
  };

  await Weight.create(newTask);

  res.status(201).json(newTask);
  
});

module.exports = {
  updateUserWeight,
};
