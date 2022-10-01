import { query } from 'express';
import mongoose, { Schema } from 'mongoose'

const accountSchema = new Schema({
    AccountNo: String,
    AccountType: String,
    ifscCode: String,
    transactionLimit: String,
    userId: {type: Schema.ObjectId, ref:'User'},
    ballance: String
}, { timestamps: true })
const Account = mongoose.model("Account", accountSchema);

const addAccountDataModel = (data) => {    
    return Account.create(data)
}
const getAccountByid = (id) => {    
  return Account.findById(id)
}
const getAccountDetails = (query) => {
    return Account.aggregate(query)
}

const updateAmount = (id, query) => {
    return Account.findByIdAndUpdate(id, query)
}

export {addAccountDataModel, getAccountByid, getAccountDetails, updateAmount}