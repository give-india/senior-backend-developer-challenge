import { Schema, model } from 'mongoose';

import { TransactionEntity } from './interface';


const TransactionSchema = new Schema<TransactionEntity>({
    from: {
        type: Schema.Types.ObjectId,
        ref: 'Account',
    },
    to: {
        type: Schema.Types.ObjectId,
        ref: 'Account',
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: 'started',
        required: true
    },

}, { timestamps: true });




export const TransactionModel = model<TransactionEntity>('Transaction', TransactionSchema);
