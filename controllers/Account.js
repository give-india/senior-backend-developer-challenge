const { StatusCodes } = require("http-status-codes");
const mongoose = require("mongoose");
const User = require("../models/User");
const Account = require("../models/Account");
const CustomError = require("../errors");

const transfer = async (req, res, next) => {
  let { fromAccountId, toAccountId, amount } = req.body;
  amount = parseInt(amount);

  // validations
  if (!fromAccountId || !toAccountId || !amount || Number.isNaN(amount)) {
    return next(new CustomError.BadRequestError("Please provide all values"));
  }

  const fromAccount = await Account.findOne({
    accountId: fromAccountId,
  }).lean();
  if (!fromAccount) {
    return next(new CustomError.BadRequestError("Invalid From Account Id"));
  }

  const toAccount = await Account.findOne({
    accountId: toAccountId,
  }).lean();
  if (!toAccount) {
    return next(new CustomError.BadRequestError("Invalid To Account Id"));
  }
  console.log("amount", fromAccount.balance < amount);
  if (fromAccount.balance < amount) {
    console.log("innnnn");
    return next(
      new CustomError.BadRequestError(
        "From Account doesn't have sufficient funds"
      )
    );
  }

  if (fromAccount.userId.toString() === toAccount.userId.toString()) {
    return next(
      new CustomError.BadRequestError(
        "Transfer between accounts belonging to the same user is not allowed"
      )
    );
  }

  if (toAccount.type === "BasicSavings" && toAccount.balance + amount > 50000) {
    return next(
      new CustomError.BadRequestError(
        "The balance in the ‘BasicSavings’ account type should never exceed Rs. 50,000"
      )
    );
  }
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    let fromAccountNewBalance = fromAccount.balance - amount;
    let fromUpdate = await Account.findOneAndUpdate(
      { _id: fromAccount._id },
      { balance: fromAccountNewBalance },
      { new: true }
    ).session(session);
    if (fromUpdate.balance === fromAccountNewBalance) {
      let toAccountNewBalance = toAccount.balance + amount;
      let toUpdate = await Account.findOneAndUpdate(
        { _id: toAccount._id },
        { balance: toAccountNewBalance },
        { new: true }
      ).session(session);
      if (toUpdate.balance === toAccountNewBalance) {
        session.commitTransaction();
        return res.status(StatusCodes.OK).json({
          msg: "Success! Amount successfully transfered",
        });
      } else {
        session.abortTransaction();
        return next(
          new CustomError.InternalServerError(
            "Something went wrong try again later"
          )
        );
      }
    } else {
      session.abortTransaction();
      return next(
        new CustomError.InternalServerError(
          "Something went wrong try again later"
        )
      );
    }
  } catch (err) {
    session.abortTransaction();
    return next(
      new CustomError.InternalServerError(
        "Something went wrong try again later"
      )
    );
  }
};

module.exports = {
  transfer,
};
