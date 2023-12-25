const { WaterModel, Calories, Weight } = require("../../models");
const { HttpError, ctrlWrapper } = require("../../helpers");

async function getUserStatistics(req, res, next) {
  try {
    const { _id: owner } = req.user;
    const { period } = req.query;
    const currentDate = new Date(Date.now());

    if (period === "today") {
      const beginDate = new Date(currentDate);
      const endDate = new Date(currentDate);

      beginDate.setHours(0, 0, 0, 0);
      endDate.setHours(23, 59, 59, 999);

      const water = await WaterModel.find(
        { owner, createdAt: { $gte: beginDate, $lte: endDate } },
        "-_id -owner -updatedAt"
      ).exec();
      const weight = await Weight.find(
        { owner, createdAt: { $gte: beginDate, $lte: endDate } },
        "-_id -owner -updatedAt"
      ).exec();
      const calories = await Calories.find(
        { owner, createdAt: { $gte: beginDate, $lte: endDate } },
        "-owner -updatedAt"
      ).exec();

      res.json({ water, weight, calories });
      return;
    }

    if (period === "month") {
      const beginDateMonth = new Date(
        Number(currentDate.getFullYear()),
        Number(currentDate.getMonth()),
        1,
        3
      );
      const endDateMonth = new Date(
        new Date(beginDateMonth).setMonth(
          new Date(beginDateMonth).getMonth() + 1
        )
      );

      const caloriesByDays = await Calories.aggregate([
        {
          $match: {
            owner,
            createdAt: { $gte: beginDateMonth, $lt: endDateMonth },
          },
        },
        {
          $group: {
            _id: { $dateToString: { format: "%d", date: "$createdAt" } },
            amount: { $sum: "$calories" },
          },
        },
        { $sort: { _id: 1 } },
      ]).exec();

      const waterByDays = await WaterModel.aggregate([
        {
          $match: {
            owner,
            createdAt: { $gte: beginDateMonth, $lt: endDateMonth },
          },
        },
        {
          $group: {
            _id: { $dateToString: { format: "%d", date: "$createdAt" } },
            amount: { $sum: "$water" },
          },
        },
        { $sort: { _id: 1 } },
      ]).exec();

      const weightByDays = await Weight.aggregate([
        {
          $match: {
            owner,
            createdAt: { $gte: beginDateMonth, $lt: endDateMonth },
          },
        },
        {
          $group: {
            _id: { $dateToString: { format: "%d", date: "$createdAt" } },
            amount: { $sum: "$weight" },
          },
        },
        { $sort: { _id: 1 } },
      ]).exec();

      res.json({
        water: waterByDays,
        weight: weightByDays,
        calories: caloriesByDays,
      });
      return;
    }

    if (period === "year") {
      const beginDateYear = new Date(
        Number(currentDate.getFullYear() - 1),
        Number(currentDate.getMonth()),
        1,
        3
      );
      const endDateYear = new Date(currentDate);

      const caloriesByMonths = await Calories.aggregate([
        {
          $match: {
            owner,
            createdAt: { $gte: beginDateYear, $lt: endDateYear },
          },
        },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
            amount: { $sum: "$calories" },
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ]).exec();

      const waterByMonths = await WaterModel.aggregate([
        {
          $match: {
            owner,
            createdAt: { $gte: beginDateYear, $lt: endDateYear },
          },
        },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
            amount: { $sum: "$water" },
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ]).exec();

      const weightByMonths = await Weight.aggregate([
        {
          $match: {
            owner,
            createdAt: { $gte: beginDateYear, $lt: endDateYear },
          },
        },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
            amount: { $sum: "$weight" },
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ]).exec();

      res.json({
        water: waterByMonths,
        weight: weightByMonths,
        calories: caloriesByMonths,
      });
      return;
    }

    throw HttpError(400, "Invalid period");
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getUserStatistics: ctrlWrapper(getUserStatistics),
};
