const { WaterModel } = require("../../models/water");

const deleteWater = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;

    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    const result = await WaterModel.findOneAndDelete({
      owner,
      createdAt: {
        $gte: currentDate,
        $lt: new Date(currentDate.getTime() + 24 * 60 * 60 * 1000),
      },
    });

    if (result) {
      res.status(200).json({
        message: "Water consumption for the current date deleted successfully",
      });
    } else {
      res.status(404).json({
        message: "Water consumption for the current date not found",
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = deleteWater;
