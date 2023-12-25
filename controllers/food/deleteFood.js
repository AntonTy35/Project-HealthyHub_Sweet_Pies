const { Food } = require("../../models");
const formattedDate = require("../../utils/formattedDate");

const deleteFood = async (req, res, next) => {
  const { _id: owner } = req.user;

  const currentDate = formattedDate();
  try {
    const result = await Food.findOneAndDelete({
      owner,
      date: currentDate,
    }).exec();

    if (result) {
      res.status(200).json({
        status: "success",
        code: 200,
        message: "Food consumption for the current date deleted successfully",
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: "Food consumption for the current date not found",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Some problem with deleting food consumption",
    });
  }
};

module.exports = deleteFood;
