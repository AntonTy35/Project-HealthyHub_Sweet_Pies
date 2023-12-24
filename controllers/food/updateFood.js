const { Food } = require("../../models/food");
const { HttpError } = require("../../helpers");

const updateFood = async (req, res, next) => {
  const { id: foodId } = req.params;

  const updatedFood = await Food.findByIdAndUpdate(foodId, req.body, {
    new: true,
  }).exec();

  if (!updatedFood) {
    throw HttpError(404, "Not found");
  }

  return res.json({
    _id: updatedFood._id,
    foodType: updatedFood.foodType,
    foodName: updatedFood.foodName,
    carbohydrate: updatedFood.carbohydrate,
    protein: updatedFood.protein,
    fat: updatedFood.fat,
    calories: updatedFood.calories,
    createdAt: updatedFood.createdAt,
  });
};

module.exports = updateFood;
