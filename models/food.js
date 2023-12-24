const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../helpers");

const foodType = ["Breakfast", "Lunch", "Dinner", "Snack"];

const foodSchema = new Schema(
  {
    foodType: {
      type: String,
      required: [true, "Meal type is required"],
      enum: foodType,
    },
    foodName: {
      type: String,
      required: [true, "Meal name is required"],
    },
    carbohydrate: {
      type: Number,
      default: 0,
      required: [true, "Carbohydrate is required"],
    },
    protein: {
      type: Number,
      default: 0,
      required: [true, "Protein is required"],
    },
    fat: {
      type: Number,
      default: 0,
      required: [true, "Fat is required"],
    },
    calories: {
      type: Number,
      default: 0,
      required: [true, "Calories is required"],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    date: {
      type: String,
      required: [true, "Date is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

foodSchema.post("save", handleMongooseError);

const createFoodSchema = Joi.object({
  foodType: Joi.string()
    .required()
    .valid(...foodType)
    .messages({ "any.required": "missing required foodType field" }),
  foodName: Joi.string()
    .required()
    .messages({ "any.required": "missing required foodName field" }),
  carbohydrate: Joi.string()
    .required()
    .messages({ "any.required": "missing required carbohydrate field" }),
  protein: Joi.string()
    .required()
    .messages({ "any.required": "missing required protein field" }),
  fat: Joi.string()
    .required()
    .messages({ "any.required": "missing required fat field" }),
  calories: Joi.string()
    .required()
    .messages({ "any.required": "missing required calories field" }),
});

const updateFoodSchema = Joi.object({
  foodType: Joi.string().valid(...foodType),
  foodName: Joi.string(),
  carbohydrate: Joi.string(),
  protein: Joi.string(),
  fat: Joi.string(),
  calories: Joi.string(),
});

const foodSchemas = {
  createFoodSchema,
  updateFoodSchema,
};

const Food = model("food", foodSchema);

module.exports = {
  Food,
  foodSchemas,
};
