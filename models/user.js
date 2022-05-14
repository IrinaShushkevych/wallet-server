const { Schema, model } = require("mongoose");
const Joi = require("joi");

const userSchema = Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    token: {
      type: String,
      default: null,
    },
    userBalance: {
      type: Number,
      default: 0,
    },
    userName: {
      type: String,
    },
    repeat_password: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

const joiSchemaLogIn = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

const joiSchemaRegistr = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  password: Joi.string().min(6).required(),
  userName: Joi.string().alphanum().min(3).max(30).required()
});

const User = model("user", userSchema);

module.exports = {
  User,
  joiSchemaRegistr,
  joiSchemaLogIn,
};
