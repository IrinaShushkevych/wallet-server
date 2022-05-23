const { constantsStatus } = require("../../libs");
const { User } = require("../../models");

const updateUser = async (req, res) => {
  const { _id } = req.user;
  console.log(req.user);
  console.log(req.body);
  const user = await User.findByIdAndUpdate(_id, req.body, { new: true });
  console.log(user);
  res.json({
    status: "success",
    code: constantsStatus.HTTP_STATUS_CODE.OK,
    data: {
      user: {
        userName: user.userName,
        email: user.email,
        balance: user.userBalance,
      },
    },
  });
};

module.exports = updateUser;
