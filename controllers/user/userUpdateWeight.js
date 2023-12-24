const { User } = require("../../models/user");
const ctrlWrapper = require("../../helpers/ctrlWrapper");
const { Weight } = require("../../models/weight");
const bmrRateWaterCalculator = require("../../utils/bmrRateWaterCalculator");

// міняємо вагу в user *******************
const updateUserWeight = ctrlWrapper(async (req, res, next) => {
  // eslint-disable-next-line dot-notation
  const authHeader = req.headers["authorization"];
  // eslint-disable-next-line no-unused-vars
  const [bearer, token] = authHeader.split(" ", 2);
  const tasks = await User.find({ token }).exec();
  const task = { ...tasks };

  const dataUser = await User.find(task[0]._id).exec();

  const dataUserCurrent = { ...dataUser };

  // const userVariableValues = dataUserCurrent[0];
  const renewedUserId = dataUserCurrent[0]._id;
  const userName = dataUserCurrent[0].name;

  const bmrVariableValues = {
    age: dataUserCurrent[0].age,
    height: dataUserCurrent[0].height,
    weight: req.body.weight,
    activity: dataUserCurrent[0].activity,
    gender: dataUserCurrent[0].gender,
    goal: dataUserCurrent[0].goal,
  };

  const renewedWeight = req.body;

  console.log({ bmrVariableValues });

  await User.findByIdAndUpdate(renewedUserId, renewedWeight, {
    new: true,
  });

  const results = await bmrRateWaterCalculator(bmrVariableValues);
  await User.findByIdAndUpdate(renewedUserId, results, {
    new: true,
  });

  console.log({ results }); // виводимо результати

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
      "2.0 - це updateUserWeight - існує база  - ",
      updatedUser._id,
      "owner: ",
      updatedUser.owner
    );

    return res.status(201).send(updatedUser.list);
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
