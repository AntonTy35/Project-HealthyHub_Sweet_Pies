const { Food } = require("../../models/food");
const { HttpError } = require("../../helpers");

const updateFood = async (req, res) => {
  const { id: foodId } = req.params;

  const updatedFood = await Food.findByIdAndUpdate(foodId, req.body, {
    new: true,
  }).exec();
  console.log(foodId);

  if (!updatedFood) {
    throw HttpError(404, "Not found");
  }

  return res.status(201).json({
    _id: updatedFood._id,
    foodType: updatedFood.foodType,
    foodName: updatedFood.foodName,
    carbohydrate: updatedFood.carbohydrate,
    protein: updatedFood.protein,
    fat: updatedFood.fat,
    calories: updatedFood.calories,
  });
};

module.exports = updateFood;
