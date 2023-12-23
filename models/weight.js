const mongoose = require("mongoose");

const weightSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    list: [
      {
        weight: {
          type: Number,
          required: true,
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Weight = mongoose.model("weight", weightSchema);

module.exports = { Weight };
