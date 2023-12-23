const { Schema, model } = require("mongoose");
const Joi = require("joi");

const caloriesSchema = Schema(
  {
    calories: {
      type: Number,
      default: 0,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    date: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

const addCaloriesSchema = Joi.object({
  calories: Joi.number().required(),
  date: Joi.string(),
});

const Calories = model("calories", caloriesSchema);

module.exports = { Calories, addCaloriesSchema };
