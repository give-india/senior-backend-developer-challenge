import { Schema, model, Decimal128 } from 'mongoose';
const AccountSchema = new Schema({
    accountId: {
        type: String,
        required: true,
        unique: true,
    },
    customerId: {
        type: String,
        required: true
    },
    accountType: {
        type: String,
        enum: ["Savings", "Current", "BasicSavings"],
        required: true
    },
    balance: {
        type: Number,
        default: 0,
        min: 0,
    },
    isActive: {
        type: Boolean,
        required: true
    }
});
const AccountModel = model('account', AccountSchema);
export default AccountModel;