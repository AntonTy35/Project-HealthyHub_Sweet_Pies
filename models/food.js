const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../helpers");

const foodType = ["breakfast", "lunch", "dinner", "snack"];

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
  carbohydrate: Joi.number()
    .required()
    .messages({ "any.required": "missing required carbohydrate field" }),
  protein: Joi.number()
    .required()
    .messages({ "any.required": "missing required protein field" }),
  fat: Joi.number()
    .required()
    .messages({ "any.required": "missing required fat field" }),
  calories: Joi.number()
    .required()
    .messages({ "any.required": "missing required calories field" }),
});

const updateFoodSchema = Joi.object({
  foodType: Joi.string().valid(...foodType),
  foodName: Joi.string(),
  carbohydrate: Joi.number(),
  protein: Joi.number(),
  fat: Joi.number(),
  calories: Joi.number(),
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
