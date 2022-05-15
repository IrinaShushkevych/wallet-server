const { User } = require("../../models");
const { constantsStatus } = require("../../libs");

const logout = async (req, res) => {
  const { _id } = req.user;

  await User.findByIdAndUpdate(_id, { token: null });

  return res.status(constantsStatus.HTTP_STATUS_CODE.NO_CONTENT).json();
};

module.exports = logout;
