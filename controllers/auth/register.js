const { Conflict } = require("http-errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { User } = require("../../models");
const { constantsStatus } = require("../../libs");
const { SECRET_KEY } = process.env;

const register = async (req, res) => {
  const { userName, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`Користувач з ${email} вже існує`);
  }
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const newUser = await User.create({
    userName,
    email,
    password: hashPassword,
  });

  const payload = {
    id: newUser._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "8h" });
  newUser.token = token;
  newUser.save();

  return res.status(constantsStatus.HTTP_STATUS_CODE.CREATED).json({
    status: "success",
    code: constantsStatus.HTTP_STATUS_CODE.CREATED,
    data: {
      token,
      user: { userName, email },
    },
  });
};

module.exports = register;
