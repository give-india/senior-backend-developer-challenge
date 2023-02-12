const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
// const { promisify } = require('util');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');
const db = require("../models");
const Accounts = db.accounts;
//  Protecting Routes
module.exports = catchAsync(async (req, res, next) => {
 try{
    const { fromAccountId, toAccountId, amount } = req.body;

    console.log(fromAccountId, toAccountId, amount);
    

    if (!fromAccountId || !toAccountId || !amount) return next(new AppError(`Plz provide fromAccountId, toAccountId and amount`, 406));

    const {dataValues: fromAccountDetails} = await Accounts.findByPk(fromAccountId) || {};
    const {dataValues: toAccountDetails} = await Accounts.findByPk(toAccountId) || {};

    console.log("fromAccountDetails", fromAccountDetails);
    console.log("toAccountDetails", toAccountDetails);
    if(!fromAccountDetails || !toAccountDetails) return next(new AppError(`Incorrect account information`, 406));
    if(fromAccountDetails.userId === toAccountDetails.userId) return next(new AppError(`Transfer between accounts belonging to the same user is not allowed`, 406));
    if(amount > fromAccountDetails.totalBalance) return next(new AppError(`Insufficient balance!!`, 406));
    if(toAccountDetails.accountTypeId == 3 && (toAccountDetails.totalBalance + amount) > 5000000) return next(new AppError(`Reciver account balance will exceed!`, 406));

    req.body.fromAccountDetails= fromAccountDetails;
    req.body.toAccountDetails= toAccountDetails;
    next();

 }catch(e){
   console.log(e.stack);
   
    return next(new AppError(`Something went wrong!!`, 400));
 }
  
});
