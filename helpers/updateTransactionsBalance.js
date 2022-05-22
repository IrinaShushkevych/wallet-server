const { Transaction } = require('../models');


module.exports = async function(transactions, prevBalance) {
  let newBalance = null;
    for (let i = 0; i < transactions.length; i += 1) {
      const transactionId = transactions[i]._id;
      const previousTransactionBalance = newBalance || prevBalance;

      newBalance = transactions[i].income
        ? previousTransactionBalance + transactions[i].sum
        : previousTransactionBalance - transactions[i].sum;

      await Transaction.findByIdAndUpdate(transactionId, {
        balance: newBalance,
      });
    }
}