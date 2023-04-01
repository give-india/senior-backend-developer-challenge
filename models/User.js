const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    accountId: {
        type: Number,
        trim: true,
        required: true,
        unique: true
    },
    name: {
        type: String,
        trim: true,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['Savings', 'Current', 'BasicSavings']
    },
    documentId: {
        type: Number,
        required: true
    },
    balance: {
        type: Number,
        required: true,
        default: 0
    }
}, {timestamps: true, toJSON: {getters: true}});
module.exports = mongoose.model("users", userSchema);
