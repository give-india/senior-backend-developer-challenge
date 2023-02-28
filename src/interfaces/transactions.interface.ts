import { Schema } from "mongoose";

export interface Transaction {
  _id?: Schema.Types.ObjectId;
  fromAccount: Schema.Types.ObjectId;
  toAccount: Schema.Types.ObjectId;
  amount: number;
  created_at?: Date;
  updated_at?: Date;
}
