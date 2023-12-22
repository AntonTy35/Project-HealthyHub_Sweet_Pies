const { User } = require("../../models/user");
const ctrlWrapper = require("../../helpers/ctrlWrapper");

const updateUserGoal = ctrlWrapper(async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const [bearer, token] = authHeader.split(" ", 2);
  const tasks = await User.find({ token }).exec();
  const task = { ...tasks };

  const tasksUserPs = await User.find(task[0]._id).exec();

  const taskUserPs = { ...tasksUserPs };
  const { goal } = taskUserPs[0];
  const renewedUserId = taskUserPs[0]._id;

  const renewedTask = req.body;
  console.log(
    "1.3 - це Contact Services - updateContact - ",
    { goal },
    { renewedTask }
  );

  await User.findByIdAndUpdate(renewedUserId, renewedTask, {
    new: true,
  });

  console.log("1.3 - це contact Controller - updateUserGoal - оновлено", {
    renewedUserId,
  });

  res.status(200).json(renewedTask);
});

module.exports = {
  updateUserGoal,
};
