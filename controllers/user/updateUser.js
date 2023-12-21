const { User } = require("../../models/user");
const ctrlWrapper = require("../../helpers/ctrlWrapper");
// const {
//   updateUserPsIndicatorsSchema,
// } = require("../utils/validation/validationUserPsIndicators");

const updateUser = ctrlWrapper(async (req, res, next) => {
  console.log("1.1 - це contact Controller - updateUser", req);

  const authHeader = req.headers["authorization"];
  const [bearer, token] = authHeader.split(" ", 2);
  const tasks = await User.find({ token }).exec();
  const task = { ...tasks };

  const tasksUserPs = await User.find(task[0]._id).exec();

  const taskUserPs = { ...tasksUserPs };
  const { age, height, weight, activity, gender } = taskUserPs[0];
  const renewedUserId = taskUserPs[0]._id;

  console.log(
    "1.2 - це Contact Services - updateContact - ",
    { tasksUserPs },
    { renewedUserId },
    { age },
    { height },
    { weight },
    { activity },
    { gender }
  );

  const renewedTask = req.body;
  console.log("1.3 - це Contact Services - updateContact - ", { renewedTask });

  await User.findByIdAndUpdate(renewedUserId, renewedTask, {
    new: true,
  });

  console.log("1.3 - це contact Controller - updateUser - оновлено", {
    renewedUserId,
  });

  res.status(200).json(renewedTask);

  console.log("це contact Controller - updateUser", {
    url: req.originalUrl,
    statusMessage: res.statusMessage,
    statusCode: res.statusCode,
  });
});

module.exports = {
  updateUser,
};
