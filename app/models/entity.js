// Schema for Account and Transaction
const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;
// User
const User = require('../models/user').User;
// Schema: Account
const AccountSchema = new Schema({
    id: {type: Number, trim: true, required: true, unique: true},
    type: {type: String, required: true, enum: ['Savings', 'Current', 'BasicSavings'], default: 'BasicSavings'},
    balance: {type: Number, required: true, default: 0},
    // User
    user: {type: ObjectId, ref: 'User'}
}, {timestamps: true});
AccountSchema.index({user: 1, createdAt: -1});
// Schema: Transaction
const TransactionSchema = new Schema({
    id: {type: String, trim: true, required: true, unique: true},
    fromAccountId: {type: Number, ref: 'Account.id', required: true},
    toAccountId: {type: Number, ref: 'Account.id', required: true},
    amount: {type: Number, required: true}
}, {timestamps: true});
// Create the model and expose it to app
module.exports.Account = mongoose.model('Account', AccountSchema);
module.exports.Transaction = mongoose.model('Transaction', TransactionSchema);
