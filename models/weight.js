const { model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");
// const { ObjectId } = require("mongodb");

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
    },
    weight: {
      type: Array,
      one: {
        type: Array,
        two: {
          type: Array,
          tre: {
            type: Object,
            foo: { type: Number },
            weight: { type: Number },
          },
        },
      },
      default: null,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

weightSchema.post("save", handleMongooseError);

const userUpdateWeight = Joi.object({
  weight: Joi.number(),
  foo: Joi.number(),
});

const weightSchemas = {  
  userUpdateWeight,
};

const Weight = model("weight", weightSchema);

module.exports = { Weight, weightSchemas };
