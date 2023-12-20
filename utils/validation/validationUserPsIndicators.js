const Joi = require("joi");

const addUserPsIndicatorsSchema = Joi.object({
  age: Joi.number().min(1).max(100).required(),
  height: Joi.number().min(110).max(210).required(),
  weight: Joi.number().min(40).max(210).required(),
  gender: Joi.string().valid("male", "female").required(),
  activity: Joi.string().valid("1", "2", "3", "4", "5").required(),
});

const updateUserPsIndicatorsSchema = Joi.object()
  .keys({
    age: addUserPsIndicatorsSchema.extract("age").optional(),
    height: addUserPsIndicatorsSchema.extract("height").optional(),
    weight: addUserPsIndicatorsSchema.extract("weight").optional(),
    gender: addUserPsIndicatorsSchema.extract("gender").optional(),
    activity: addUserPsIndicatorsSchema.extract("activity").optional(),
  })
  .or("age", "height", "weight", "gender", "activity");

module.exports = {
  addUserPsIndicatorsSchema,
  updateUserPsIndicatorsSchema,
};
