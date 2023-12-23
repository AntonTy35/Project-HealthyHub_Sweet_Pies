const { WaterModel } = require("../../models/water");
const formattedDate = require("../../utils/formattedDate");

const deleteWater = async (req, res, next) => {
  const { _id: owner } = req.user;

  const currentDate = formattedDate();
  try {
    const result = await WaterModel.findOneAndDelete({
      owner,
      date: currentDate,
    }).exec();

    if (result) {
      res.status(200).json({
        status: "success",
        code: 200,
        message: "Water consumption for the current date deleted successfully",
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: "Water consumption for the current date not found",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Some problem with deleting water consumption",
    });
  }
};

module.exports = deleteWater;
