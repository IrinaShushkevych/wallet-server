const { Transaction, User } = require("../../models");

module.exports = async (req, res, next) => {
  const { _id } = req.user;
  const { sum, income, datetime } = req.body;

  const user = await User.findById({ _id });

  if (!user) {
    throw new Error("Unauthorized");
  }

  const date = new Date(datetime).getTime();
  const month = new Date(datetime).getMonth();
  const year = new Date(datetime).getFullYear();

  const prevTransactions = await Transaction.find({ owner: _id })
    .where("datetime")
    .lte(date)
    .sort({ datetime: -1, createdAt: -1 });

  const prevBalance = prevTransactions[0]?.balance || 0;
  const currentBalance = income ? prevBalance + sum : prevBalance - sum;

  const newTransaction = await Transaction.create({
    ...req.body,
    datetime: date,
    month,
    year,
    balance: currentBalance,
    owner: _id,
  });

  const transactionsToUpdate = await Transaction.find({ owner: _id })
    .where("datetime")
    .gt(date)
    .sort({ datetime: 1 });

  if (transactionsToUpdate?.length > 0) {
    let newBalance = null;
    for (let i = 0; i < transactionsToUpdate.length; i += 1) {
      const transactionId = transactionsToUpdate[i]._id;
      const previousTransactionBalance = newBalance || currentBalance;

      newBalance = transactionsToUpdate[i].income
        ? previousTransactionBalance + transactionsToUpdate[i].sum
        : previousTransactionBalance - transactionsToUpdate[i].sum;
      console.log("newBalance", newBalance);

      await Transaction.findByIdAndUpdate(transactionId, {
        balance: newBalance,
      });
    }
  }

  res
    .status(201)
    .json({ status: "Created", data: { transaction: newTransaction } });
};
