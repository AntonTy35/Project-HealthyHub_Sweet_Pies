const { User } = require("../../models/user");
const ctrlWrapper = require("../../helpers/ctrlWrapper");

const listUser = ctrlWrapper(async (req, res, next) => {
  console.log("1.1 - це contact Controller - listUser", req.headers);

  const authHeader = req.headers["authorization"];
  const [bearer, token] = authHeader.split(" ", 2);
  const tasks = await User.find({ token }).exec();
  const task = { ...tasks };
  

  const dataUser = await User.find(task[0]._id).exec();

  const dataUserCurrent = { ...dataUser };

  const userVariableValues = {
    age: dataUserCurrent[0].age,
    height: dataUserCurrent[0].height,
    weight: dataUserCurrent[0].weight,
    activity: dataUserCurrent[0].activity,
    gender: dataUserCurrent[0].gender,
  };

  console.log("1.3 - це contact Controller - listUser", { userVariableValues });

  res.status(200).json(dataUser);

  console.log("це contact Controller - listUser", {
    url: req.originalUrl,
    statusMessage: res.statusMessage,
    statusCode: res.statusCode,
  });
});

module.exports = {
  listUser,
};
