const signup = require("./signup");
const signin = require("./signin");
const { verify } = require("./verify");
const resVerifyEmail = require("./resVerifyEmail");
const signout = require("./signout");
const forgotPassword = require("./forgot-password");

module.exports = {
  signin,
  signup,
  verify,
  resVerifyEmail,
  signout,
  forgotPassword,
};
