const { WaterModel } = require("../../models/water");
const formattedDate = require("../../utils/formattedDate");

const createNewWaterEntry = async (owner, body) => {
  const currentDate = formattedDate();
  const newWater = await WaterModel.create({
    ...body,
    date: currentDate,
    owner,
  });

  return {
    date: currentDate,
    water: newWater.water,
  };
};

const updateExistingWaterEntry = async (existingWater, body) => {
  existingWater.water += Number(body.water);
  await existingWater.save();

  return {
    date: existingWater.date,
    water: existingWater.water,
  };
};

const updateWater = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const body = req.body;
    const currentDate = formattedDate();

    const existingWater = await WaterModel.findOne({
      owner,
      date: currentDate,
    });

    let responseData;

    if (!existingWater) {
      responseData = await createNewWaterEntry(owner, body);
      res
        .status(201)
        .json({ status: "success", code: 201, data: responseData });
    } else {
      responseData = await updateExistingWaterEntry(existingWater, body);
      res
        .status(200)
        .json({ status: "success", code: 200, data: responseData });
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
