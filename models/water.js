const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const waterSchema = new Schema(
  {
    water: {
      type: Number,
      required: [true, "Water is required"],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    date: {
      type: String,
      require: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

waterSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
  water: Joi.number().required(),
  date: Joi.string(),
});

const WaterModel = model("water", waterSchema);

module.exports = { WaterModel, addSchema };
