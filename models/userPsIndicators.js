const mongoose = require("mongoose");

const userPsIndicatorsSchema = new mongoose.Schema(
  {
    owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },    
    age: {
      type: Number,
      required: [true, "Age is required"],
      unique: true,
        },
    gender: {
      type: Boolean,
      required: [true, "Gender is required"],
      unique: true,
        },
    height: {
      type: Number,
      required: [true, "Height is required"],
      unique: true,
        },
    weight: {
      type: Number,
      required: [true, "Weight is required"],
      unique: true,
        },    
    activity: {
      type: String, 
        enum: ["1", "2", "3", "4", "5"],
        required: [true, "Activity is required"],
        unique: true,
        default: "1",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("userPsIndicators", userPsIndicatorsSchema);