import { model, Schema, Document } from 'mongoose';
import { Transaction } from '@/interfaces/transactions.interface';

const transactionSchema: Schema = new Schema({
  fromAccount: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  toAccount: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  }
}, {timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});

const transactionModel = model<Transaction & Document>('Transactions', transactionSchema);

export default transactionModel;
