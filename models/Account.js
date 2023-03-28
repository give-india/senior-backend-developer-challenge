const mongoose = require("mongoose");

const AccountSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "users",
      required: true,
    },
    accountId: {
      type: Number,
      required: [true, "Please provide account id"],
    },
    type: {
      type: String,
      enum: ["Savings", "Current", "BasicSavings"],
      default: "Savings",
      required: [true, "Please provide account type"],
    },
    balance: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("accounts", AccountSchema);
