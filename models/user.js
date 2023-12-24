const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name for user"],
    },
    email: {
      type: String,
      match: emailRegex,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    goal: {
      type: String,
      enum: ["1", "2", "3"],
      default: "1",
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      default: null,
    },
    age: {
      type: Number,
      default: null,
    },
    height: {
      type: Number,
      default: null,
    },
    weight: {
      type: Number,
      default: null,
    },
    token: {
      type: String,
      default: null,
    },
    activity: {
      type: Number,
      enum: [1, 2, 3, 4, 5],
      default: 1,
    },
    BMR: {
      type: Number,
      default: 2000,
    },
    rateWater: {
      type: Number,
      default: 1500,
    },
    protein: {
      type: Number,
      default: 120,
    },
    fat: {
      type: Number,
      default: 40,
    },
    carbs: {
      type: Number,
      default: 270,
    },
    avatarURL: {
      type: String,
      default: null,
    },
    verify: {
      type: Boolean,
      default: true,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
      default: null,
    },
    confirmationOfVerification: {
      type: Number,
      default: 0,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.post("save", handleMongooseError);

const signupSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().min(6).max(16).required(),
  goal: Joi.string().valid("1", "2", "3"),
  gender: Joi.string().valid("male", "female"),
  age: Joi.number(),
  height: Joi.number(),
  weight: Joi.number(),
  activity: Joi.number().valid(1, 2, 3, 4, 5),
});

const signinSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().min(6).required(),
});

const userUpdate = Joi.object({
  height: Joi.number().required(),
  weight: Joi.number().required(),
  age: Joi.number().required(),
});

const userUpdateFive = Joi.object({
  height: Joi.number().required(),
  weight: Joi.number().required(),
  age: Joi.number().required(),
  gender: Joi.string().valid("male", "female"),
  activity: Joi.number().valid(1, 2, 3, 4, 5),
  goal: Joi.string().valid("1", "2", "3"),
});

const userUpdateFiveKeys = Joi.object()
  .keys({
    age: userUpdateFive.extract("age").optional(),
    height: userUpdateFive.extract("height").optional(),
    weight: userUpdateFive.extract("weight").optional(),
    gender: userUpdateFive.extract("gender").optional(),
    activity: userUpdateFive.extract("activity").optional(),
    goal: userUpdateFive.extract("goal").optional(),
  })
  .or("age", "height", "weight", "gender", "activity", "goal");

const userUpdateGoal = Joi.object({
  goal: Joi.string().valid("1", "2", "3"),
});

const userUpdateWeight = Joi.object({
  weight: Joi.number().required(),
});

const userSchemas = {
  signinSchema,
  signupSchema,
  userUpdate,
  userUpdateFive,
  userUpdateFiveKeys,
  userUpdateGoal,
  userUpdateWeight,
};

const User = model("user", userSchema);

module.exports = { User, userSchemas };
