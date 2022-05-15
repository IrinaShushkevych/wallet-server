const { constantsStatus } = require("../../libs");

const getCurrent = async (req, res) => {
  const { userName, email } = req.user;
  res.json({
    status: "success",
    code: constantsStatus.HTTP_STATUS_CODE.OK,
    data: {
      user: {
        userName,
        email,
      },
    },
  });
};

module.exports = getCurrent;
