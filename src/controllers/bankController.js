const accountSchema = require("../helpers/validationSchema");
const User = require("../models/users.model");
const httpStatus = require('http-status');

const transferMoneyFunc = async (req, res) => {
    try {
        // VALIDATE REQUEST
        const validateResponse = await accountSchema.validateAsync(req.body);

        const { fromAccountId, toAccountId, amount } = req.body;

        const fromAccount = await User.find({ "accounts.number": fromAccountId });
        const toAccount = await User.find({ "accounts.number": toAccountId });

        if (!fromAccount.length || !toAccount.length) {
            throw { errorCode: httpStatus.NOT_FOUND, errorMessage: 'Account number does not exits' };
        }
        // CHECK FOR SELF TRANSFER
        if (fromAccount[0].id && fromAccount[0].id === toAccount[0].id) {
            throw { errorCode: httpStatus.BAD_REQUEST, errorMessage: 'Self Transfer Not Allowed' };
        }

        let sourceAccount = fromAccount[0].accounts.find(account => account.number === fromAccountId);
        let depositAccount = toAccount[0].accounts.find(account => account.number === toAccountId);

        // CHECK IF REQ AMOUNT IS PRESENT IN SOURCE ACC
        if (sourceAccount.balance < amount) {
            throw { errorCode: httpStatus.FORBIDDEN, errorMessage: 'Insufficient balance in source account' };
        }

        // IF ACC TYPE -> BASICSAVING -> CHECK LIMIT OF 50,000
        if (depositAccount.type === 'BasicSavings' && depositAccount.balance + amount > 50000) {
            throw { errorCode: httpStatus.BAD_REQUEST, errorMessage: 'Limit exceeded for basic saving account, reduce amount in request' };
        }

        // TRANSFER AMOUNT 
        const updateSourceBalance = await User.findOneAndUpdate(
            { "accounts.number": fromAccountId },
            { $set: { "accounts.$.balance": sourceAccount.balance - amount } },
            { new: true }
        );
        const updateDepositBalance = await User.findOneAndUpdate(
            { "accounts.number": toAccountId },
            { $set: { "accounts.$.balance": depositAccount.balance + amount } },
            { new: true }
        );

        let totalDestinationBalance = updateDepositBalance.accounts.reduce((accumulator, account) => accumulator + account.balance, 0)


        let updatedSourceAcc = updateSourceBalance.accounts.find(account => account.number === fromAccountId);
        res.status(httpStatus.OK).send({
            newSrcBalance: updatedSourceAcc.balance,
            totalDestBalance: totalDestinationBalance,
            transferedAt: new Date()
        })

    } catch (error) {
        if (error.isJoi == true) res.status(httpStatus.UNPROCESSABLE_ENTITY).send(error.details)
        else {
            res.send(error)
        }
    }
}

module.exports = {
    transferMoneyFunc
}