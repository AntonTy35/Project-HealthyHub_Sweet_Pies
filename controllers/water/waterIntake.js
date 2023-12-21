const { WaterModel } = require("../../models/water");

const waterIntake = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { water } = req.body;

    // Перевірка наявності коректних даних
    if (!owner || !water) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    const currentDate = Date.now();
    const beginDate = new Date(currentDate);
    const endDate = new Date(currentDate);

    beginDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 999);

    const existsWater = await WaterModel.findOne({
      owner,
      createdAt: { $gte: beginDate, $lte: endDate },
    }).exec();

    if (existsWater) {
      const { _id: id, water: waterIntake } = existsWater;

      const updateWater = await WaterModel.findByIdAndUpdate(
        id,
        { water: water + waterIntake },
        { new: true }
      ).exec();

      return res.status(200).json({
        createdAt: updateWater.updatedAt,
        water: updateWater.water,
      });
    } else {
      const newWater = await WaterModel.create({ water, owner });

      return res.status(201).json({
        createdAt: newWater.createdAt,
        water: newWater.water,
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = waterIntake;
