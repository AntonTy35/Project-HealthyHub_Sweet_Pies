const mongoose = require("mongoose");

const UserPsIndicatorSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    name: {
      type: String,
    },
    age: {
      type: Number,
      required: [true, "Age is required"],
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: [true, "Gender is required"],
    },
    height: {
      type: Number,
      required: [true, "Height is required"],
    },
    weight: {
      type: Number,
      required: [true, "Weight is required"],
    },
    activity: {
      type: String,
      enum: ["1", "2", "3", "4", "5"],
      required: [true, "Activity is required"],
      default: "1",
    },
    only_changes: {
      type: Boolean,
      default: "false",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("UserPsIndicator", UserPsIndicatorSchema);
