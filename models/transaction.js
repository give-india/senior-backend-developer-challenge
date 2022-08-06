const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    fromAccountId: {
        type: Number,
        required: true
    },
    toAccountId: {
        type: Number,
        default: null
    },
    amount: {
        type: Number,
        required: true
    },
    mode:{
        type: String,
        enum: {
            values: ["Transfer", "Deposit", "Withdrawal"],
            message: '{VALUE} is not supported'
        },
        required: true
    }
}, {timestamps: true})

const transactionModel = mongoose.model("Transactions", schema)

module.exports = transactionModel