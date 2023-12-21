const { HttpError } = require("../../helpers");
const { User } = require("../../models/user");

const verify = async (req, res, next) => {
  const { token } = req.params;
  try {
    const user = await User.findOne({ verificationToken: token }).exec();

    if (!user) {
      throw HttpError(404);
    }
    await User.findByIdAndUpdate(user._id, {
      verify: true,
      verificationToken: null,
    });

    res.json({ message: "Verification successful" });
  } catch (error) {
    next(error);
  }
};

module.exports = verify;
