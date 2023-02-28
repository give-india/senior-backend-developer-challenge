import { Schema } from "mongoose";

export interface Account {
  _id?: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  accountType: string;
  balance:number;
  created_at?: Date;
  updated_at?: Date;
}
