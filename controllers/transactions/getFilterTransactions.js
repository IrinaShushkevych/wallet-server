const { BadRequest } = require('http-errors');

const { Transaction } = require('../../models');

module.exports = async (req, res) => {
  const { _id } = req.user;
  const { month, year } = req.query;

  const transactions = await Transaction.find({ owner: _id, month, year }, '')
    .sort({ datetime: -1, createdAt: -1 })
    .populate('owner', 'name email')
    .populate('category', 'name');

  if (!transactions) {
    throw new BadRequest('Bad request');
  }

  res.status(200).json({
    status: 'success',
    transactions,
  });
};
