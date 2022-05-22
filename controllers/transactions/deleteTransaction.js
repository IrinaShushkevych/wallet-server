const { NotFound, Unauthorized } = require("http-errors");

const { Transaction, User } = require("../../models");
const { updateTransactionsBalance } = require('../../helpers');

module.exports = async (req, res, next) => {
  const { _id: ownerId } = req.user;
  const { transactionId } = req.params;

  if (!transactionId) {
    throw new BadRequest(`Transaction id is required.`);
  }

  const user = await User.findById({ _id: ownerId });

  if (!user) {
    throw new Unauthorized("Unauthorized");
  }

  const deletedTransaction = await Transaction.findOneAndRemove({
    _id: transactionId,
    owner: ownerId,
  });

  if (!deletedTransaction) {
    throw new NotFound(`Transaction with id ${transactionId} is not found.`);
  }

  const prevTransactions = await Transaction.find({ owner: ownerId })
    .where("datetime")
    .lte(deletedTransaction.datetime)
    .sort({ datetime: -1, createdAt: -1 });

    const filteredTransactions = prevTransactions.filter(
    (transaction) =>
      transaction.datetime < deletedTransaction.datetime ||
      transaction.createdAt < deletedTransaction.createdAt
  );

  const prevBalance = filteredTransactions[0]?.balance || 0;

  const nextTransactions = await Transaction.find({ owner: ownerId })
    .where("datetime")
    .gte(deletedTransaction.datetime)
    .sort({ datetime: 1, createdAt: 1 });

    const transactionsToUpdate = nextTransactions.filter(
      (transaction) =>
        transaction.datetime > deletedTransaction.datetime ||
        transaction.createdAt > deletedTransaction.createdAt
    );

  if (transactionsToUpdate?.length > 0) {
    updateTransactionsBalance(transactionsToUpdate, prevBalance)
  }

  res
    .status(200)
    .json({
      status: "Success",
      message: `Transaction with id ${transactionId} is deleted.`,
    });
};
