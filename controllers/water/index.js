const { ctrlWrapper } = require("../../helpers");
const deleteWater = require("./waterDelete");
const waterIntake = require("./waterIntake");

module.exports = {
  waterIntake: ctrlWrapper(waterIntake),
  deleteWater: ctrlWrapper(deleteWater),
};
