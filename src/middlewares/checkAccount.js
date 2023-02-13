const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const db = require("../models");
const Accounts = db.accounts;
//  CHECKING ACCOUNT INFO MIDDLEWARE
module.exports = catchAsync(async (req, res, next) => {
 try{
    const { fromAccountId, toAccountId, amount } = req.body;

    if (!fromAccountId || !toAccountId || !amount) return next(new AppError(`Plz provide fromAccountId, toAccountId and amount`, 406));

    const {dataValues: fromAccountDetails} = await Accounts.findByPk(fromAccountId) || {};
    const {dataValues: toAccountDetails} = await Accounts.findByPk(toAccountId) || {};
    // CHECK FOR CORRECT ACCOUNT
    if(!fromAccountDetails || !toAccountDetails) return next(new AppError(`Incorrect account information`, 406));

    // CHECK FOR FROM AND TO ACCOUNTS ARE SAME OR NOT
    if(fromAccountDetails.userId === toAccountDetails.userId) return next(new AppError(`Transfer between accounts belonging to the same user is not allowed`, 406));

    // CHECK FOR SENDER ACCOUNT BALANCE
    if(amount > fromAccountDetails.totalBalance) return next(new AppError(`Insufficient balance!!`, 406));

    // CHECK IF RECEIVER ACCOUNT BALANCE WILL EXCEED 5000000
    if(toAccountDetails.accountTypeId == 3 && (toAccountDetails.totalBalance + amount) > 5000000) return next(new AppError(`Reciver account balance will exceed!`, 406));

    req.body.fromAccountDetails= fromAccountDetails;
    req.body.toAccountDetails= toAccountDetails;
    next();

 }catch(e){
    return next(new AppError(`Something went wrong!!`, 400));
 }
  
});
