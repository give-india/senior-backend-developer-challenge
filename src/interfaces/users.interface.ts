import { Schema } from "mongoose";

export interface User {
  _id?: Schema.Types.ObjectId | string;
  first_name: string;
  last_name: string;
  address: string;
  email: string;
  password?: string;
  created_at?: Date;
  updated_at?: Date;
}
