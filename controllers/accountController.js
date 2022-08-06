const Counter = require("./../models/userCounter")
const Account = require("./../models/account")

const createAccount = async (req, res) => {
    try{
        let counter = await Counter.find({id: "autoIncrement"})
        const {balance, userId, accountType} = req.body
        if(userId === 0 || userId === 1){
            res.status(400).json({
                errorCode: 400,
                errorMessage: "userId can't be 0 or 1"
            })
            return;
        }
        
        let accountData = await Account.findOne({userId, accountType})
        let counterResult, accountsResult;
        
        if(accountData !== null){
            res.status(400).json({
                errorCode: 400,
                errorMessage: "Account already exists for this user!"
            })
            return;
        } else if(counter.length > 0){
            if(accountType === "BasicSavings" && balance > 50000){
                res.status(400).json({
                    errorCode: 400,
                    errorMessage: "BasicSavings account can't have more than 50000 paisa!"
                })
            }
            const accountInfo = {
                accountId: 50213597 + counter[0].num,
                balance,
                userId,
                accountType
            }
            const updateCounter = {
                num: counter[0].num + 1
            }
            const account = new Account(accountInfo)
            accountsResult = await account.save()
            counterResult = await Counter.findOneAndUpdate({id: "autoIncrement"}, updateCounter, {new: true})
        } else{
            const accountInfo = {
                accountId: 50213597,
                balance,
                userId,
                accountType
            }
            const counter = new Counter({
                id: "autoIncrement",
                num: 1,
                isSampleDataCreated: false
            })
            const account = new Account(accountInfo)

            counterResult = await counter.save()
            accountsResult = await account.save()
        }
        res.status(201).json({accountInfo: accountsResult})
    }catch(err){
        console.log(err.message);
        res.status(400).json({
            errorCode: 400,
            errorMessage: err.message ? err.message : "Something Went Wrong!"
        })
    }
}

const getAccountOfIndividual = async (req, res) => {
    try{
        const {userId} = req.body
        if(userId !== 0 && !userId){
            res.status(400).json({
                errorCode: 400,
                errorMessage: "userId is required!"
            })
            return;
        }
        const accountsData = await Account.find({userId})
        if(accountsData.length > 0){
            res.status(200).json({
                accountsData
            })
        } else{
            res.status(404).json({
                errorCode: 404,
                errorMessage: "No account found for this user!"
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

module.exports = {createAccount, getAccountOfIndividual}