const { HttpError } = require("../../helpers");
const { User } = require("../../models/user");
const sendEmail = require("../../utils/sendEmail");

const resVerifyEmail = async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    throw HttpError(400, "Missing required field email");
  }

  const { verificationToken } = await User.findOne({ email });

  if (!verificationToken) {
    throw HttpError(400, "Verification has already been passed");
  }
  const verificationEmail = {
    to: email,
    subject: "Verification email",
    html: `<b>To confirm your registration please click on the <a href="http://localhost:8080/auth/verify/${verificationToken} ">link</a>`,
    text: `<b>To confirm your registration please open the link http://localhost:8080/auth/verify/${verificationToken} `,
  };

  await sendEmail(verificationEmail);
  res.json({ message: "Verification email sent" });
};

module.exports = resVerifyEmail;
