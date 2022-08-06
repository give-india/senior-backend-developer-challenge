const Transaction = require("./../models/transaction")
const Account = require("./../models/account")

module.exports = async (req, res) => {
    try{
        const {fromAccountId, toAccountId, amount} = req.body
        if(!fromAccountId){
            res.status(400).json({
                errorCode: 400,
                errorMessage: "fromAccountId is required!"
            })
            return;
        }
        if(!toAccountId){
            res.status(400).json({
                errorCode: 400,
                errorMessage: "toAccountId is required!"
            })
            return;
        }
        if(!amount){
            res.status(400).json({
                errorCode: 400,
                errorMessage: "amount is required!"
            })
            return;
        }
        const sourceAccountDetails = await Account.findOne({accountId: fromAccountId})
        if(sourceAccountDetails !== null){
            if(sourceAccountDetails.balance < amount){
                res.status(400).json({
                    errorCode: 400,
                    errorMessage: "Source Account doesn't have sufficient balance!"
                })
                return;
            }
            const destinationAccountDetails = await Account.findOne({accountId: toAccountId})
            if(destinationAccountDetails !== null){
                const totalAmount = destinationAccountDetails.balance + amount;
                if(destinationAccountDetails.accountType === "BasicSavings"){
                    if(totalAmount > 50000){
                        res.status(400).json({
                            errorCode: 400,
                            errorMessage: "BasicSavings Account's balance can't be greater than 50000. Hence transaction aborted!"
                        })
                        return;
                    }
                }
                const sourceAccountBalance = {
                    balance: sourceAccountDetails.balance - amount
                }
                const destinationAccountBalance = {
                    balance: destinationAccountDetails.balance + amount
                }
                
                const updatedSourceResult = await Account.findOneAndUpdate({accountId: fromAccountId}, sourceAccountBalance, {new: true})
                const updatedDestinationResult = await Account.findOneAndUpdate({accountId: toAccountId}, destinationAccountBalance, {new: true})

                const transaction = new Transaction({
                    fromAccountId,
                    toAccountId,
                    amount,
                    mode: 'Transfer'
                })

                const result = await transaction.save()

                res.status(200).json({
                    newSrcBalance: updatedSourceResult.balance,
                    totalDestBalance: updatedDestinationResult.balance,
                    transferedAt: new Date(result.createdAt).toLocaleString()
                })
            } else{
                res.status(400).json({
                    errorCode: 400,
                    errorMessage: "Destination Account Not Found!"
                })
                return;
            }
        } else{
            res.status(400).json({
                errorCode: 400,
                errorMessage: "Source Account Not Found!"
            })
            return;
        }
    } catch(err){
        console.log(err);
        res.status(400).json({
            errorCode: 400,
            errorMessage: err.message ? err.message : "Something Went Wrong!"
        })
    }
}