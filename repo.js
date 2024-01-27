
const mongoSmooth = require('mongosmooth');
const mongoose = require('mongoose');

const mongoRepo = new mongoSmooth({
    db: { 
        name: null, // default to "test"
        host: "mongodb://127.0.0.1:27017/", // default to "mongodb://localhost:27017/"
        options: null // default to {}
    },
    plugin: {transformOutput: true},
    collections: {
        user: {
            first_name: String,
            last_name: String,
            dob: Date,
            email: String,
            username: String,
            address: String,
            created: { type: Date, default: Date.now },
            updated: { type: Date, default: Date.now },
            status: { type: String, enum: ['active', 'disabled', 'blocked'] }
        },
        account_type: {
            type_name: { type: String, enum: ['Savings', 'Current', 'BasicSavings'] },
            balance_limit: { type: Number, default: -1 }/* ,
            allowed_services: [{ type: mongoose.Schema.Types.ObjectId, ref: 'service' }] */
        },
        account: {
            account_type_id: { type: mongoose.Schema.Types.ObjectId, ref: 'account_type' },
            user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            balance: Number
        },
        transaction: {
            from_account_id: { type: mongoose.Schema.Types.ObjectId, ref: 'account' },
            to_account_id: { type: mongoose.Schema.Types.ObjectId, ref: 'account' },
            amount: Number,
            transfered_at: { type: Date, default: Date.now },
            status: { type: String, enum: ['ok', 'ko'] },
            status_code: Number,
            messages: String
        },
        service: {
            service_name: String
        }
    }
});
console.log("Repo Object Created.");
module.exports = mongoRepo;
