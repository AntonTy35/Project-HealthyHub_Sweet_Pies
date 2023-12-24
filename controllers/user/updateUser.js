const { User } = require("../../models/user");
const ctrlWrapper = require("../../helpers/ctrlWrapper");
const bmrRateWaterCalculator = require("../../utils/bmrRateWaterCalculator");

const updateUser = ctrlWrapper(async (req, res, next) => {
  // eslint-disable-next-line dot-notation
  const authHeader = req.headers["authorization"];
  // eslint-disable-next-line no-unused-vars
  const [bearer, token] = authHeader.split(" ", 2);
  const tasks = await User.find({ token }).exec();
  const task = { ...tasks };

  const dataUser = await User.find(task[0]._id).exec();

  const dataUserCurrent = { ...dataUser };

  const renewedUserId = dataUserCurrent[0]._id;

  console.log("1.1 - це contact Controller - updateUser - ", {
    renewedUserId,
  });

  const bmrVariableValues = {
    age: dataUserCurrent[0].age,
    height: dataUserCurrent[0].height,
    weight: dataUserCurrent[0].weight,
    activity: dataUserCurrent[0].activity,
    gender: dataUserCurrent[0].gender,
    goal: dataUserCurrent[0].goal,
  };

  console.log({ bmrVariableValues });

  const renewedTask = req.body;

  function replaceFields(bmrVariableValues, renewedTask) {
    for (const field in renewedTask) {
      bmrVariableValues[field] = renewedTask[field];
    }
    return bmrVariableValues;
  }

  const mergedObject = replaceFields(bmrVariableValues, renewedTask);

  await User.findByIdAndUpdate(renewedUserId, renewedTask, {
    new: true,
  });

  const results = await bmrRateWaterCalculator(mergedObject);
  await User.findByIdAndUpdate(renewedUserId, results, {
    new: true,
  });

  console.log({ results }); // виводимо результати

  console.log("1.3 - це contact Controller - updateUser - оновлено", {
    renewedUserId,
  });

  res.status(200).json(renewedTask);
});

module.exports = {
  updateUser,
};
