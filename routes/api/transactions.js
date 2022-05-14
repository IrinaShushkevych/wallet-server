const express = require("express");

const { transactions } = require("../../controllers");
const { wrapper, authMiddleware, validation } = require('../../middlewares');
const { Transaction } = require('../../models')

const router = express.Router();


router.get("/", /*authMiddleware,*/ wrapper(transactions.getTransactions));

router.post("/", /*authMiddleware,*/ validation(Transaction.joiTransactionSchema), wrapper(transactions.addTransaction));

module.exports = router;
