const { BadRequest, Unauthorized } = require('http-errors');

const { Transaction } = require('../../models');

module.exports = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 5 } = req.query;
  const skip = (page - 1) * limit;

  if (!_id) {
    throw new Unauthorized('Unauthorized');
  }

  const transactions = await Transaction.find({ owner: _id }, '', {
    skip,
    limit: Number(limit),
  })
    .sort({ datetime: -1, createdAt: -1 })
    .populate('owner', 'name email')
    .populate('category', 'name');

  if (!transactions) {
    throw new BadRequest(`Bad request`);
  }

  const currentBalance = transactions[0]?.balance || 0;

  res.status(200).json({
    status: 'success',
    data: {
      transactions,
      user_balance: currentBalance,
    },
  });
};
