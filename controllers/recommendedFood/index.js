const { RecommendedFood } = require("../../models/recommendedFood");
const { ctrlWrapper } = require("../../helpers");

const getRecommendedFood = async (req, res) => {
  const recommendedFood = await RecommendedFood.find({}, { _id: 0 }).exec();

  //   if (!recommendedFood) {
  //     throw HttpError(404);
  //   }

  res.status(200).json(recommendedFood);
};

module.exports = {
  getRecommendedFood: ctrlWrapper(getRecommendedFood),
};
