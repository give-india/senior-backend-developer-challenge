
import {addUserDataModel} from '../model/user.js'
import {addAccountDataModel, getAccountDetails, updateAmount} from '../model/account.js'
const addUserData = async (req, res)=> {
    const data = { ...req.body }
    await addUserDataModel(data)
   return res.send({message: 'user added'})
}

const addAccountData = async (req, res)=> {
    const data = { ...req.body }
    await addAccountDataModel(data)
    return res.send({message: 'account added'})
}

const transferAmount = async (req, res)=> {
    const { fromAccountNo, toAccountNo, ammount } = req.body
    const fromAccountQuery = [
        {
            $lookup: {
                from: 'users',
                localField: 'userId',
                foreignField: '_id',
                as: 'userData'
              }
        },
        {
            $unwind: {
                path:'$userData',
                preserveNullAndEmptyArrays: false
              }
        },
        {
            $match: {
                AccountNo: fromAccountNo
              }
        }
    ]
    const toAccountQuery = [
        {
            $lookup: {
                from: 'users',
                localField: 'userId',
                foreignField: '_id',
                as: 'userData'
              }
        },
        {
            $unwind: {
                path:'$userData',
                preserveNullAndEmptyArrays: false
              }
        },
        {
            $match: {
                AccountNo: toAccountNo
              }
        }
    ]
    const fromAccountData = await getAccountDetails(fromAccountQuery)
    const toAccountData = await getAccountDetails(toAccountQuery)
    if (!fromAccountData.length) return res.status(404).send({errorMessage:'from account not found'})
    if (!toAccountData.length) return res.status(404).send({errorMessage:'to account not found'})
    const {_id: fromDraftId, userData: { _id: fromUserId }, ballance: fromBallance } = JSON.parse(JSON.stringify(fromAccountData[0]));
    const {_id: toDraftId, userData : { _id: toUserId }, ballance: toBallance, AccountType } = JSON.parse(JSON.stringify(toAccountData[0]));
    if (fromUserId === toUserId) return res.status(400).send({errorMessage:'Transfer between accounts belonging to the same user is not allowed.'})
    if (parseInt(fromBallance) < parseInt(ammount) ) return res.status(400).send({errorMessage:'Source account should have the required amount for the transaction to succeed'})
    if (parseInt(toBallance) + parseInt(ammount) > 50000 && AccountType === 'BasicSavings' ) return res.status(400).send({errorMessage:'Source account should have the required amount for the transaction to succeed'})
    const toUpdatedBalance = parseInt(toBallance) + parseInt(ammount)
    const fromUpdateBalance  = parseInt(fromBallance) - parseInt(ammount)
    const updateBalancefrom = {
        ballance: fromUpdateBalance
    }
    const updateBalanceTo = {
        ballance: toUpdatedBalance
    }
    await updateAmount(fromDraftId, updateBalancefrom) // update from balance
    await updateAmount(toDraftId, updateBalanceTo) // update to balance

    return res.send({message: 'money transfered', newSrcBalance: fromUpdateBalance, totalDestBalance: toUpdatedBalance, transferedAt: new Date()})
}

export {addUserData, addAccountData, transferAmount }
