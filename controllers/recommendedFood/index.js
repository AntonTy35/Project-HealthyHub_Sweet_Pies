const fs = require("node:fs");

const getRecommendedFood = (req, res) => {
  try {
    const data = fs.readFileSync("RecommendedFood.json", {
      encoding: "UTF-8",
    });
    const recommendedFood = JSON.parse(data);

    res.json({ status: "success", code: 200, data: recommendedFood });
  } catch (error) {
    console.error("Error reading of JSON:", error);
    res.status(500).json({ error: "Internal server" });
  }
};

module.exports = { getRecommendedFood };
