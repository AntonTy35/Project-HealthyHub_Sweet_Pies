const signup = require("./signup");
const signin = require("./signin");
const { verify } = require("jsonwebtoken");
const resVerifyEmail = require("./resVerifyEmail");

module.exports = {
  signin,
  signup,
  verify,
  resVerifyEmail,
};
