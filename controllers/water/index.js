const { ctrlWrapper } = require("../../helpers");
const deleteWater = require("./deleteWater");
const updateWater = require("./updateWater");

module.exports = {
  updateWater: ctrlWrapper(updateWater),
  deleteWater: ctrlWrapper(deleteWater),
};
