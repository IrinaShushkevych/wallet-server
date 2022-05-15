const { User } = require("../../models");
const { constantsStatus } = require("../../libs");

const logout = async (req, res) => {
  const { _id } = req.user;
  console.log(req.user);
  await User.findByIdAndUpdate(_id, { token: null });

  return res.status(constantsStatus.HTTP_STATUS_CODE.NO_CONTENT).json({
    status: "success",
    code: constantsStatus.HTTP_STATUS_CODE.UNAUTHORIZED,
    message: `No content`,
  });
};

module.exports = logout;
