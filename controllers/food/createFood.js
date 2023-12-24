const { Food } = require("../../models");

const createFood = async (req, res, next) => {
  const { _id: owner } = req.user;

  const newFood = await Food.create({ ...req.body, owner });

  res.status(201).json({
    _id: newFood._id,
    foodType: newFood.foodType,
    foodName: newFood.foodName,
    carbohydrate: newFood.carbohydrate,
    protein: newFood.protein,
    fat: newFood.fat,
    calories: newFood.calories,
    createdAt: newFood.createdAt,
  });
};

module.exports = createFood;
