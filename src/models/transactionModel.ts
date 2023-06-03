import mongoose, { Schema, Document } from "mongoose";

export interface ITransaction extends Document {
  fromAccountId: string;
  toAccountId: string;
  amount: number;
  transferedAt: Date;
}

export const TransactionSchema: Schema = new Schema({
  fromAccountId: { type: Schema.Types.ObjectId, required: true },
  toAccountId: { type: Schema.Types.ObjectId, required: true },
  amount: { type: Number, required: true },
  transferedAt: { type: Date, default: Date.now },
});

export const Transaction = mongoose.model<ITransaction>(
  "Transaction",
  TransactionSchema
);
