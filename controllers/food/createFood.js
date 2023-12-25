const { Food } = require("../../models");
const formattedDate = require("../../utils/formattedDate");

const createFood = async (req, res, next) => {
  const { _id: owner } = req.user;

  const currentDate = formattedDate();

  const newFood = await Food.create({ ...req.body, owner, date: currentDate });

  res.status(201).json({
    _id: newFood._id,
    foodType: newFood.foodType,
    foodName: newFood.foodName,
    carbohydrate: newFood.carbohydrate,
    protein: newFood.protein,
    fat: newFood.fat,
    calories: newFood.calories,
    date: currentDate,
  });
};

module.exports = createFood;
