const Transaction = require("./../models/transaction")
const Account = require("./../models/account")

module.exports = async (req, res) => {
    try{
        const {accountId, amount} = req.body
        if(!accountId) {
            res.status(400).json({
                errorCode: 400,
                errorMessage: "accountId is required for withdrawal!"
            })
            return;
        }
        if(amount !== 0 && !amount){
            res.status(400).json({
                errorCode: 400,
                errorMessage: "amount is required for withdrawal!"
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
            if(accountData.balance < amount){
                res.status(400).json({
                    errorCode: 400,
                    errorMessage: "Account doesn't have sufficient balance!"
                })
                return;
            }
            const updatedAccountInfo = await Account.findOneAndUpdate({accountId}, {balance: accountData.balance - amount}, {new: true})

            const transaction = new Transaction({
                fromAccountId: accountId,
                amount,
                mode: "Withdrawal"
            })
            const result = await transaction.save()
            
            res.status(200).json({
                Account: updatedAccountInfo.accountId,
                newBalance: updatedAccountInfo.balance
            })
        } else{
            res.status(404).json({
                errorCode: 404,
                errorMessage: "Account not found!"
            })
            return;
        }
    }catch(err){
        console.log(err);
        res.status(400).json({
            errorCode: 400,
            errorMessage: err.message ? err.message : "Something Went Wrong!"
        })
    }
}