const jwt = require("jsonwebtoken");
const AccountType = require("../Models/AccountType.Model");
const User = require("../Models/User.Model");
const { trycatchBlock } = require("../utils/trycatchblock");
const ErrorHandler = require("http-errors");
const { isauthUser } = require("../helper/authHelper");

exports.ctrladdAccount = trycatchBlock(async (req, res, next) => {
  let id = await isauthUser(req);
  if (!id) return next(ErrorHandler.UnprocessableEntity("Please login first"));
  // update Account type

  let user = await User.findById(id);
  if (!user) next(ErrorHandler.NotFound("User not found"));
  let { accountType } = req.body;
  let AccName = await AccountType.findOne({ accountType });
  if (!AccName)
    next(
      ErrorHandler.NotFound(
        "Account type not found, Try only with [Savings, Current, BasicSavings]"
      )
    );
  // console.log(AccName._id.toString());
  if (user.accounttypeId.includes(AccName._id.toString())) {
    return next(
      ErrorHandler.Conflict("Already have an account with same Type")
    );
  }
  user.accounttypeId.push(AccName._id.toString());
  await user.save();

  res.status(200).send({
    status: true,
    message: "New Account Type successfully Updated",
  });
  // console.log("user", user);
});

exports.ctrlUserDetail = trycatchBlock(async (req, res, next) => {
  let id = await isauthUser(req);
  if (!id) return next(ErrorHandler.UnprocessableEntity("Please login first"));
  let user = await User.findById(id);

  if (!user) return next(ErrorHandler.NotFound("User not found"));

  let accounttype = await AccountType.find({
    _id: { $in: user.accounttypeId },
  });

  if (!accounttype)
    return next(ErrorHandler.NotFound("Account type not found"));

  let accountTypeArr = [];
  await accounttype.forEach((accounttype) => {
    accountTypeArr.push(accounttype.accountType);
    // console.log(accounttype.accountType);
  });
  let userObj = {
    username: user.username,
    accountType: accountTypeArr,
  };
  res.status(200).send({
    status: true,
    user: userObj,
  });
});
