const Sequelize = require("sequelize");
const express = require("express");
const { Op } = require("sequelize");
const router = express.Router();
const _ = require("lodash");
const moment = require("moment");
const { Account, Transactions, User } = require("../../Models/Model");

const AccoutData = [
  { user_id: 1, account_type: "Savings", balance: 10010, isactive: true },
  { user_id: 2, account_type: "Current", balance: 10510, isactive: true },
  { user_id: 3, account_type: "Savings", balance: 15420, isactive: true },
  { user_id: 1, account_type: "Current", balance: 154512, isactive: true },
  { user_id: 2, account_type: "BasicSavings", balance: 2312, isactive: true },
  { user_id: 4, account_type: "Savings", balance: 26454, isactive: true },
  { user_id: 1, account_type: "BasicSavings", balance: 10251, isactive: true },
];

//Create random accounts for users
router.post("/createRandomAccounts", async (request, response, next) => {
  const accountsFound = await Account.findAll({});
  const err = 0;
  if (accountsFound.length == 0) {
    for (let i = 0; i < AccoutData.length; i++) {
      const usersData = await User.findOne({
        attributes: ["user_id", "name", "isactive"],
        where: {
          [Op.and]: [{ user_id: AccoutData[i].user_id }, { isactive: true }],
        },
      });
      if (usersData) {
        await Account.create({
          user_id: AccoutData[i].user_id,
          account_type: AccoutData[i].account_type,
          balance: AccoutData[i].balance,
          isactive: AccoutData[i].isactive,
        });
      } else err = 1;
    }
    if (err === 1)
      return response
        .status(200)
        .json({ message: "Some Accounts not Created" });
    return response.status(200).json({ message: "Accounts Created" });
  } else
    return response
      .status(200)
      .json({ errorCode: 204, errorMessage: "Some Accounts already found" });
});

//Get all acounts
router.get("/allacounts", async (request, response, next) => {
  const AcooutsFound = await Account.findAll({
    attributes: [
      "account_id",
      "user_id",
      "account_type",
      "balance",
      "isactive",
    ],
    order: [["account_id", "DESC"]],
  });
  return response.status(200).json(AcooutsFound);
});

//Get all acounts of a user
router.get("/accountsOfUser", async (request, response, next) => {
  const userid = parseInt(request.query.user_id);
  const AcooutsFound = await Account.findAll({
    attributes: [
      "account_id",
      "user_id",
      "account_type",
      "balance",
      "isactive",
    ],
    where: { user_id: userid },
    include: [
      {
        model: User,
        attributes: ["name", "isactive"],
        required: true,
      },
    ],
    order: [["account_id", "DESC"]],
  });
  return response.status(200).json(AcooutsFound);
});

//Transfer money from one account to another
router.put("/tranferMoney", async (request, response, next) => {
  const fromAccountId = parseInt(request.body.fromAccountId);
  const toAccountId = parseInt(request.body.toAccountId);
  const amount = parseInt(request.body.amount);
  let newBalance = 0,
    totalBalanceofUser = 0;

  const FromAccount = await Account.findOne({
    attributes: [
      "account_id",
      "user_id",
      "account_type",
      "balance",
      "isactive",
    ],
    where: { account_id: fromAccountId },
  });

  const ToAccount = await Account.findOne({
    attributes: [
      "account_id",
      "user_id",
      "account_type",
      "balance",
      "isactive",
    ],
    where: { account_id: toAccountId },
  });

  newBalance = parseInt(ToAccount.balance) + amount;
  if (FromAccount.balance < amount)
    return response
      .status(200)
      .json({ errorCode: 204, errorMessage: "No Sufficient balance" });

  if (ToAccount.account_type === "BasicSavings")
    if (newBalance > 5000000)
      return response
        .status(200)
        .json({ errorCode: 204, errorMessage: "Exeeded Balance limit" });

  const timestamp = new Date().getTime();
  FromAccount.balance = parseInt(FromAccount.balance) - amount;
  ToAccount.balance = newBalance;
  await Transactions.create({
    fromAcountID: fromAccountId,
    ToAcountID: toAccountId,
    amount: amount,
    timestamp: timestamp,
  });
  await FromAccount.save();
  await ToAccount.save();

  const AllacountsOfUser = await Account.findAll({
    attributes: [
      "account_id",
      "user_id",
      "account_type",
      "balance",
      "isactive",
    ],
    where: { user_id: ToAccount.user_id },
  });
  for (let i = 0; i < AllacountsOfUser.length; i++) {
    totalBalanceofUser += parseInt(AllacountsOfUser[i].balance);
  }
  return response.status(200).json({
    newSrcBalance: newBalance,
    totalDestBalance: totalBalanceofUser,
    transferedAt: timestamp,
  });
});

//Deposite money to an account
router.put("/deposite", async (request, response, next) => {
  const toAccountId = parseInt(request.body.toAccountId);
  const amount = parseInt(request.body.amount);
  let newBalance = 0;

  const ToAccount = await Account.findOne({
    attributes: [
      "account_id",
      "user_id",
      "account_type",
      "balance",
      "isactive",
    ],
    where: { account_id: toAccountId },
  });

  newBalance = parseInt(ToAccount.balance) + amount;
  if (ToAccount.account_type === "BasicSavings")
    if (newBalance > 5000000)
      return response
        .status(200)
        .json({ errorCode: 204, errorMessage: "Exeeded Balance limit" });

  const timestamp = new Date().getTime();
  ToAccount.balance = newBalance;
  await Transactions.create({
    fromAcountID: 0,
    ToAcountID: toAccountId,
    amount: amount,
    timestamp: timestamp,
  });
  await ToAccount.save();

  return response
    .status(200)
    .json({ newSrcBalance: newBalance, transferedAt: timestamp });
});

//Get all transactions
router.get(
  "/transactions/getallTransactions",
  async (request, response, next) => {
    const transactionsFound = await Transactions.findAll({
      attributes: [
        "transactionId",
        "fromAcountID",
        "ToAcountID",
        "amount",
        "timestamp",
      ],

      order: [["transactionId", "DESC"]],
    });
    return response.status(200).json(transactionsFound);
  }
);

module.exports = router;
