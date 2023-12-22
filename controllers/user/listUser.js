const { User } = require("../../models/user");
const ctrlWrapper = require("../../helpers/ctrlWrapper");

const listUser = ctrlWrapper(async (req, res, next) => {
  console.log("1.1 - це contact Controller - listUser", req.body.email);

  const userEmail = req.body.email;
  const dataUser = await User.find({ email: userEmail }).exec();
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
