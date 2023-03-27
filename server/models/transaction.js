import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  fromaccid: {
    type: Number,
    required: true,
  },
  toaccid: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  newsrcbal: {
    type: Number,
    required: true,
  },
  totaldestbal: {
    type: Number,
    required: true,
  },
  transferedat: {
    type: Number,
    required: true,
  },
});

const transactionModel = mongoose.model("transactions", transactionSchema);
export default transactionModel;
