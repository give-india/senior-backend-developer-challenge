const mongoose = require("mongoose");
const crypto = require("crypto");

const transactionSchema = new mongoose.Schema({
    transactionId: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    fromAccountId: {
        type: Number,
        ref: 'users.accountId',
        required: true
    },
    toAccountId: {
        type: Number,
        ref: 'users.accountId',
        required: true
    },
    amount: {
        type: Number,
        required: true,
        default: 0
    }
}, {timestamps: true, toJSON: {getters: true}});
module.exports = mongoose.model("transactions", transactionSchema);
