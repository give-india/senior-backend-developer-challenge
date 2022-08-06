const mongoose = require("mongoose")

const accountSchema = new mongoose.Schema({
    accountId: {
        type: Number,
        unique: true,
        required: true
    },
    balance: {
        type: Number,
        required: true
    },
    userId: {
        type: Number,
        required: true
    },
    accountType: {
        type: String,
        enum: {
            values: ["Savings", "Current", "BasicSavings"],
            message: '{VALUE} is not supported'
        },
        required: true
    }
}, {timestamps: true})

const AccountModel = mongoose.model('Accounts', accountSchema)

module.exports = AccountModel