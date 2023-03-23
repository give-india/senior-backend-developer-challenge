const Account = require("../Models/UserAccountDetail.Model");
const AccountType = require("../Models/AccountType.Model");
const User = require("../Models/User.Model");
// const ErrorHandler = require("../utils/errorHandler");
const ErrorHandler = require("http-errors");
const { trycatchBlock } = require("../utils/trycatchblock");
const { isauthUser } = require("../helper/authHelper");
const { addBalancesValidator } = require("../helper/validationHelper");
const UserAccountDetail = require("../Models/UserAccountDetail.Model");

exports.ctrlBalancetransfer = trycatchBlock(async (req, res, next) => {
  let { fromaccountId, toaccountId, amountTransfer } = req.body;
  if (!fromaccountId || !toaccountId || !amountTransfer) {
    return next(
      ErrorHandler.UnprocessableEntity("Please enter the required data")
    );
  }

  if (amountTransfer <= 99) {
    return next(ErrorHandler.UnprocessableEntity("Amount more than 99 paisa."));
  }

  // Transfer between accounts belonging to the same user is not allowed.

  let fromAccount = await Account.findById(fromaccountId);
  let toAccount = await Account.findById(toaccountId);

  if (!fromAccount)
    return next(
      ErrorHandler.NotFound("Account not belong to this login user.")
    );
  if (!toAccount)
    return next(ErrorHandler.NotFound("No account found for transfer"));

  if (fromAccount.userId.toString() === toAccount.userId.toString()) {
    return next(
      ErrorHandler.UnprocessableEntity(
        "Transfer between accounts belonging to the same user is not allowed"
      )
    );
  }

  // Source account should have the required amount for the transaction to succeed

  if (fromAccount.balance < amountTransfer) {
    return next(ErrorHandler.NotFound("Insufficient balance"));
  }

  // The balance in the ‘BasicSavings’ account type should never exceed Rs. 50,000
  let accountType = await Account.findById(toaccountId);

  let accountTypeName = await AccountType.findById(accountType.accountTypeId);

  if (accountTypeName.accountType === "BasicSavings") {
    if (
      accountType.balance > 5000000 ||
      accountType.balance + amountTransfer > 5000000
    ) {
      return next(
        ErrorHandler.UnprocessableEntity(
          "The balance in the ‘BasicSavings’ account type should never exceed Rs. 50,000"
        )
      );
    }
  }

  fromAccount.balance -= amountTransfer;
  toAccount.balance += amountTransfer;
  let newSrcBalance = await fromAccount.save(); // Update the balance in the source account DB
  let totalDestBalance = await toAccount.save(); // Update the balance in the destination account DB
  res.status(200).send({
    status: "success",
    message: "Transfer successful",
    newSrcBalance: newSrcBalance.balance,
    totalDestBalance: totalDestBalance.balance,
    transferedAt: new Date().toISOString(),
  });
});

exports.ctrlAddBalance = trycatchBlock(async (req, res, next) => {
  let id = await isauthUser(req);
  if (!id) return next(ErrorHandler.UnprocessableEntity("Please login first"));

  // Get the account
  let account = await User.findById(id);
  if (!account) return next(ErrorHandler.NotFound("Account not found"));

  let { error, value } = addBalancesValidator(req.body);
  if (error) return next(ErrorHandler.UnprocessableEntity(error.message));

  if (!value.balance)
    return next(
      ErrorHandler.UnprocessableEntity("Please enter a valid amount")
    );

  // Get account type
  let accountTypeId = await AccountType.findOne({
    accountType: value.accounttype,
  });
  console.log(accountTypeId);

  if (!account.accounttypeId.includes(accountTypeId._id))
    return next(
      ErrorHandler.NotFound(`No ${value.accounttype} account for this user`)
    );

  let accDetails = await UserAccountDetail.findOne({
    accountTypeId: accountTypeId._id,
  });

  if (accDetails) {
    if (accountTypeId.accountType === "BasicSavings") {
      if (
        accDetails.balance > 5000000 ||
        accDetails.balance + value.balance > 5000000
      ) {
        return next(
          ErrorHandler.UnprocessableEntity(
            "The balance in the ‘BasicSavings’ account type should never exceed Rs. 50,000"
          )
        );
      }
    }
  }

  if (value.balance <= 99)
    return next(ErrorHandler.UnprocessableEntity("Amount more than 99 paisa."));

  // account.balance += accountType.balance;
  // await account.save();
  accDetails = new UserAccountDetail({
    userId: id,
    accountTypeId: accountTypeId._id,
    balance: value.balance,
  });
  await accDetails.save();
  res.status(200).send({
    status: true,
    message: "Balance added successfully",
    accDetails,
  });
});
