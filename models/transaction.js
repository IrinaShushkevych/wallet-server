const { Schema, model } = require("mongoose");
const Joi = require("joi");

const transactionSchema = Schema(
  {
    income: {
      type: Boolean,
      required: [true, "Type of transaction is required"],
    },
    sum: {
      type: Number,
      min: 0,
      required: [true, "Sum is required"],
    },
    comment: {
      type: String,
    },
    balance: {
      type: Number,
    },
    datetime: {
      type: String,
      required: [true, "Datetime is required"],
    },
    month: {
      type: String,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "category",
      required: [true, "Category is required"],
    },
    year: {
      type: Number,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

const joiTransactionSchema = Joi.object({
  income: Joi.boolean().required(),
  sum: Joi.number().required(),
  comment: Joi.string(),
  balance: Joi.number().min(0),
  datetime: Joi.number().required(),
});
const Transaction = model("transaction", transactionSchema);

module.exports = {
  Transaction,
  joiTransactionSchema,
};
