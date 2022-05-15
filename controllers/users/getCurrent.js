const { constantsStatus } = require("../../libs");

const getCurrent = async (req, res) => {
  const { name, email } = req.user;
  res.json({
    status: "success",
    code: constantsStatus.HTTP_STATUS_CODE.OK,
    data: {
      user: {
        name,
        email,
      },
    },
  });
};

module.exports = getCurrent;
