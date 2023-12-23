const { ctrlWrapper } = require("../../helpers");

const getAllCalories = require("./getAllCalories");
const dailyGoalCalories = require("./dailyGoalCalories");

module.exports = {
  getAllCalories: ctrlWrapper(getAllCalories),
  dailyGoalCalories: ctrlWrapper(dailyGoalCalories),
};
