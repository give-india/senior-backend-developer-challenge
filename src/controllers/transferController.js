
var moment = require('moment'); 
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const Transaction = require('./../utils/transactionClass');

exports.sendMoney = catchAsync(async (req, res, next) => {
    try{
        const { fromAccountId, toAccountId, amount, fromAccountDetails, toAccountDetails } = req.body || {};

        // CREATE TRANSDACTION INSTANCE AND DO THE TRANSACTION
        const transactionInstance = new Transaction(fromAccountId, toAccountId, amount, toAccountDetails.userId, fromAccountDetails.userId);

        const  { refNo, createdAt } = await transactionInstance.innitiateTransaction() || {};

        const debit = await transactionInstance.debitFrom();

        const credit = await transactionInstance.creditTo();

        const totalDestBalance = await transactionInstance.totalDestBalanceFunc();

        const newSrcBalance = await transactionInstance.newSrcBalanceFunc();

        // SEND RESPONSE
        res.status(200).json({
            status: 'success',
            data: {
                refNo,
                totalDestBalance,
                newSrcBalance,
                transferedAt: moment(createdAt).format("DD-MM-YYYY hh:mm:ss")
            },
        });
    }catch(e){
        return next(new AppError(`Something went wrong!`, 400));
        
    }
  
});


