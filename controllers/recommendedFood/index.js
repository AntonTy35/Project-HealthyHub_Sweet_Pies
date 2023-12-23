const { RecommendedFood } = require("../../models/recommendedFood");
const { ctrlWrapper, HttpError } = require("../../helpers");

const getRecommendedFood = async (req, res, next) => {
  const recommendedFood = await RecommendedFood.find({}).exec();

  if (!recommendedFood) {
    throw HttpError(404);
  }

  res.status(200).json(recommendedFood);
};

module.exports = {
  getRecommendedFood: ctrlWrapper(getRecommendedFood),
};
