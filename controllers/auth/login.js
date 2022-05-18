const { Unauthorized } = require("http-errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { User } = require("../../models");
const { constantsStatus } = require("../../libs");
const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  const passCompare = bcrypt.compareSync(password, user.password);

  if (!user || !passCompare) {
    throw new Unauthorized(`Email or password is wrong`);
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "8h" });
  user.token = token;
  user.save();

  res.json({
    status: "success",
    code: constantsStatus.HTTP_STATUS_CODE.OK,
    data: {
      token,
      user: {
        userName: user.userName,
        email,
      },
    },
  });
};

module.exports = login;
