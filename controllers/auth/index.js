const signup = require("./signup");
const signin = require("./signin");
const verify = require("./verify");
const resVerifyEmail = require("./resVerifyEmail");
const signout = require("./signout");
const forgotPassword = require("./forgot-password");
const { ctrlWrapper } = require("../../helpers");

module.exports = {
  signin: ctrlWrapper(signin),
  signup: ctrlWrapper(signup),
  verify: ctrlWrapper(verify),
  resVerifyEmail: ctrlWrapper(resVerifyEmail),
  signout: ctrlWrapper(signout),
  forgotPassword: ctrlWrapper(forgotPassword),
};
