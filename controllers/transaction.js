const Transaction = require("./../models/transaction")

// Function will be return all the transaction
const getAllTransaction =  async (req, res) => {
    try{
        const transactions = await Transaction.find({})
        if(transactions.length > 0){
            res.status(200).json(transactions);
        } else{
            res.status(404).json({
                errorCode: 404,
                errorMessage: "No transaction found!"
            })
        }
    }catch(err){
        console.log(err);
        res.status(400).json({
            errorCode: 400,
            errorMessage: err.message ? err.message : "Something Went Wrong!"
        })
    }
}

// Function will be return all the transaction of an account based on mode(transfer, deposit, withdrawal)
const getTransactionOfAccount = async (req, res) => {
    try{
        const {accountId, transfer, deposit, withdrawal} = req.body
        if(!accountId){
            res.status(400).json({
                errorCode: 400,
                errorMessage: "accountId is required for deposit!"
            })
            return;
        }
        const mode = []
        if(transfer){
            mode.push("Transfer")
        }
        if(deposit){
            mode.push("Deposit")
        }
        if(withdrawal){
            mode.push("Withdrawal")
        }
        const transactions = await Transaction.find({mode: {$in: mode}, accountId })
        if(transactions.length > 0){
            res.status(200).json(transactions);
        } else{
            res.status(404).json({
                errorCode: 404,
                errorMessage: "No transaction found!"
            })
        }
    }catch(err){
        console.log(err);
        res.status(400).json({
            errorCode: 400,
            errorMessage: err.message ? err.message : "Something Went Wrong!"
        })
    }
}

module.exports = {
    getAllTransaction,
    getTransactionOfAccount
}