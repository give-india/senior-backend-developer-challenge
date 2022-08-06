const Transaction = require("./../models/transaction")
const Account = require("./../models/account")

module.exports = async (req, res) => {
    try{
        const {accountId, amount} = req.body;
        if(!accountId) {
            res.status(400).json({
                errorCode: 400,
                errorMessage: "accountId is required for deposit!"
            })
            return;
        }
        if(amount !== 0 && !amount){
            res.status(400).json({
                errorCode: 400,
                errorMessage: "amount is required for deposit!"
            })
            return;
        }
        if(amount <= 0){
            res.status(400).json({
                errorCode: 400,
                errorMessage: "amount should be greater than 0!"
            })
            return;
        }
        const accountData = await Account.findOne({accountId})
        if(accountData !== null){
            const totalBalance = accountData.balance + amount;
            if(accountData.accountType === "BasicSavings" && totalBalance > 50000){
                res.status(400).json({
                    errorCode: 400,
                    errorMessage: "BasicSavings account's balance can't be more than 50000. Transaction aborted!"
                })
                return;
            }
            const updatedAccountInfo = await Account.findOneAndUpdate({accountId}, {balance: totalBalance}, {new: true})
            const transaction = new Transaction({
                fromAccountId: accountId,
                amount,
                mode: "Deposit"
            })
            const result = await transaction.save()

            res.status(200).json({
                accountId: updatedAccountInfo.accountId,
                newBalance: updatedAccountInfo.balance
            })
        } else{
            res.status(404).json({
                errorCode: 404,
                errorMessage: "Account not found!"
            })
            return;
        }
    } catch(err){
        console.log(err.message);
        res.status(400).json({
            errorCode: 400,
            errorMessage: err.message ? err.message : "Something Went Wrong!"
        })
    }
}