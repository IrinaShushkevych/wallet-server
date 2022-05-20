const { BadRequest } = require('http-errors');

const { Transaction } = require('../../models');

module.exports = async (req, res) => {
  const { _id } = req.user;
  const { month, year } = req.query;

  const transactionsIncome = await Transaction.aggregate([
    {
      $lookup: {
        from: 'categories',
        localField: 'category',
        foreignField: '_id',
        as: 'category',
      },
    },
    {
      $match: {
        owner: _id,
        income: true,
        year: Number(year),
        month: Number(month),
      },
    },
    {
      $group: {
        _id: '$category',
        totalSum: { $sum: '$sum' },
      },
    },
    {
      $project: { '_id.name': 1, '_id.income': 1, totalSum: 1 },
    },
  ]);

  const transactionsExpense = await Transaction.aggregate([
    {
      $lookup: {
        from: 'categories',
        localField: 'category',
        foreignField: '_id',
        as: 'category',
      },
    },
    {
      $match: {
        owner: _id,
        income: false,
        year: Number(year),
        month: Number(month),
      },
    },
    {
      $group: {
        _id: '$category',
        totalSum: { $sum: '$sum' },
      },
    },
    {
      $project: { '_id.name': 1, '_id.income': 1, totalSum: 1 },
    },
  ]);

  let allIncome = 0;
  transactionsIncome.forEach((trs) => (allIncome += trs.totalSum));

  let allExpense = 0;
  transactionsExpense.forEach((trs) => (allExpense += trs.totalSum));

  if (!transactionsIncome && !transactionsExpense) {
    throw new BadRequest('Bad request');
  }

  res.status(200).json({
    status: 'success',
    transactions: {
      transactionsIncome,
      transactionsExpense,
      allIncome,
      allExpense,
    },
  });
};
