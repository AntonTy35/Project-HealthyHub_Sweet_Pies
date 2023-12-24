const addNumbers = (bmrVariableValues) => {
  let proteinPercentage = 0;
  let fatPercentage = 0;
  let carbsPercentage = 0;
  const calories = 2000;

  console.log("це функція - ");

  const { age, height, weight, activity, gender, goal } = bmrVariableValues;

  switch (goal) {
    case "1":
      proteinPercentage = 0.25;
      fatPercentage = 0.2;
      break;
    case "2":
      proteinPercentage = 0.3;
      fatPercentage = 0.2;
      break;
    case "3":
      proteinPercentage = 0.2;
      fatPercentage = 0.25;
      break;
    default:
      proteinPercentage = 0.25;
      fatPercentage = 0.2;
  }

  carbsPercentage = 1 - proteinPercentage - fatPercentage;
  console.log({ proteinPercentage }, { fatPercentage }, { carbsPercentage });

  const protein = Math.round((proteinPercentage * calories) / 4);
  const fat = Math.round((fatPercentage * calories) / 9);
  const carbs = Math.round((carbsPercentage * calories) / 4);

  function addBmrMale(age, height, weight, activity) {
    const BMR1 =
      Math.floor(88.362 + 13.397 * weight + 4.799 * height - 5.677 * age) *
      activity;

    return BMR1;
  }

  function addBmrFemale(age, height, weight, activity) {
    const BMR2 =
      Math.floor(447.593 + 9.247 * weight + 3.098 * height - 4.33 * age) *
      activity;

    return BMR2;
  }

  function calculateIndicators(gender, age, height, weight, activity) {
    let result = null;
    switch (gender) {
      case "male":
        result = addBmrMale(age, height, weight, activity);
        break;

      case "female":
        result = addBmrFemale(age, height, weight, activity);
        break;
      default:
        throw new Error("Невідома стать");
    }
    return result;
  }

  const BMR = calculateIndicators(gender, age, height, weight, activity);

  function calculateRateWater(weight, activity) {
    let result = null;
    switch (activity) {
      case 1:
        result = weight * 0.03;
        break;

      case 2:
        result = weight * 0.03 + 0.35;
        break;

      case 3:
        result = weight * 0.03 + 0.45;
        break;

      case 4:
        result = weight * 0.03 + 0.6;
        break;

      case 5:
        result = weight * 0.03 + 0.7;
        break;

      default:
        throw new Error("Невідома активність");
    }
    return result;
  }

  const rateWaterResult = calculateRateWater(weight, activity);
  const rateWater = rateWaterResult.toFixed(2);

  const results = { protein, fat, carbs, BMR, rateWater };

  return results;
};

module.exports = addNumbers;
