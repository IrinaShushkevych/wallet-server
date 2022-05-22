const { Schema, model } = require("mongoose");
const Joi = require("joi");

const categorySchema = Schema(
  {
    income: {
      type: Boolean,
      required: [true, "Type of transaction is required"],
    },
    name: {
      type: String,
      enum: [
        "Продукти",
        "Авто",
        "Розвиток",
        "Діти",
        "Дім",
        "Освіта",
        "Інше",
        "Регулярний дохід",
        "Нерегулярний дохід",
      ],
      default: "Продукти",
      required: [true, "Category is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

const joiCategorySchema = Joi.object({
  income: Joi.boolean().required(),
  name: Joi.string().required(),
});

const Category = model("category", categorySchema);

module.exports = {
  Category,
  joiCategorySchema,
};
