const { Schema, model } = require("mongoose");

const categorySchema = Schema(
  {
    income: {
      type: Boolean,
      required: [true, "Type of transaction is required"],
    },
    name: {
      type: String,
      enum: [
        "Еда",
        "Авто",
        "Развитие",
        "Дети",
        "Дом",
        "Образование",
        "Остальные",
      ],
      default: "Еда",
      required: [true, "Category is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

const Category = model("category", categorySchema);

module.exports = {
  Category,
};
