const crypto = require("crypto");
const bcrypt = require("bcrypt");
const { User } = require("../../models/user");
const sendNewPasswordByEmail = require("../../utils/sendNewPasswordByEmail");

const updatePasswordAndEmail = async (userId, newPassword) => {
  const hashPassword = await bcrypt.hash(newPassword, 10);

  await User.findByIdAndUpdate(userId, { password: hashPassword });

  const updatedUser = await User.findById(userId);

  return updatedUser.email;
};
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found (email not registered)" });
    }

    const newPassword = crypto.randomBytes(8).toString("hex");

    const updatedEmail = await updatePasswordAndEmail(user._id, newPassword);

    await sendNewPasswordByEmail(updatedEmail, newPassword);

    return res
      .status(200)
      .json({ message: "Password reset email sent successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = forgotPassword;
