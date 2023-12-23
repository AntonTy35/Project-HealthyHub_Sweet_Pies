const { WaterModel } = require("../../models/water");
const formattedDate = require("../../utils/formattedDate");

const updateWater = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const body = req.body;
    const currentDate = formattedDate();

    const existingWater = await WaterModel.findOne({
      owner,
      date: currentDate,
    });

    if (!existingWater) {
      const newWater = await WaterModel.create({
        ...body,
        date: currentDate,
        owner,
      });

      res.status(201).json({
        status: "success",
        code: 201,
        data: {
          date: currentDate,
          water: newWater.water,
        },
      });
    } else {
      // Додаємо кількість води до існуючого запису
      existingWater.water = Number(existingWater.water) + Number(body.water);
      await existingWater.save();

      res.status(200).json({
        status: "success",
        code: 200,
        data: {
          date: currentDate,
          water: existingWater.water,
        },
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Some problem with updating water",
    });
  }
};

module.exports = updateWater;
