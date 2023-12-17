require("dotenv").config();
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");

const { User } = require("../../models/user");
const { HttpError, ctrlWrapper } = require("../../helpers");
const sendEmail = require("../../utils/sendEmail");
const { JWT_SECRET } = process.env;

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email already in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = crypto.randomUUID();

  const verificationEmail = {
    to: email,
    subject: "Verification email",
    html: `<b>To confirm your registration please click on the <a href="http://localhost:3000/users/verify/${verificationToken} ">link</a>`,
    text: `<b>To confirm your registration please open the link http://localhost:3000/users/verify/${verificationToken} `,
  };

  await sendEmail(verificationEmail);

  const newUser = await User.create({
    ...req.body,
    verificationToken,
    avatarURL,
    password: hashPassword,
  });

  const payload = {
    id: newUser._id,
  };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "3h" });
  newUser.token = token;
  await newUser.save();

  res.status(201).json({
    user: {
      email: newUser.email,
      name: newUser.name,
      goal: newUser.goal,
      gender: newUser.gender,
      age: newUser.age,
      height: newUser.height,
      weight: newUser.weight,
      activity: newUser.activity,
      avatarURL: newUser.avatarURL,
    },
  });
};
module.exports = { signup: ctrlWrapper(signup) };