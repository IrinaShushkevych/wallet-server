const express = require("express");

const { transactions } = require("../../controllers");
const { wrapper, auth, validation } = require('../../middlewares');
const { joiTransactionSchema } = require('../../models')

const router = express.Router();


router.get("/", auth, wrapper(transactions.getTransactions));

router.post("/", auth, validation(joiTransactionSchema), wrapper(transactions.addTransaction));

module.exports = router;
