const { User, userSchemas } = require("./user");
const { Weight } = require("./weight");
const { Calories, addCaloriesSchema } = require("./calories");
const { Food, foodSchemas } = require("./food");
const { WaterModel, addSchema } = require("./water");
const { RecommendedFood } = require("./recommendedFood");

module.exports = {
  User,
  userSchemas,
  Weight,
  Calories,
  addCaloriesSchema,
  Food,
  foodSchemas,
  WaterModel,
  addSchema,
  RecommendedFood,
};
