const { constantsStatus } = require('../../libs');

const getCurrent = async (req, res) => {
  const { userName, email, userBalance } = req.user;
  res.json({
    status: 'success',
    code: constantsStatus.HTTP_STATUS_CODE.OK,
    data: {
      user: {
        userName,
        email,
        balance: userBalance,
      },
    },
  });
};

module.exports = getCurrent;
