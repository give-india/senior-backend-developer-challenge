import mongoose, { Schema, Document } from "mongoose";

export interface IAccount extends Document {
  userId: string;
  accountType: "Savings" | "Current" | "BasicSavings";
  balance: number;
}

export const AccountSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true },
  accountType: {
    type: String,
    enum: ["Savings", "Current", "BasicSavings"],
    required: true,
  },
  balance: { type: Number, required: true },
});

export const Account = mongoose.model<IAccount>("Account", AccountSchema);
