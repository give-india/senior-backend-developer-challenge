const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserAccountDetailSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  accountTypeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AccountType",
  },
  balance: {
    type: Number,
    default: 0,
  },
});

const UserAccountDetail = mongoose.model(
  "UserAccountDetail",
  UserAccountDetailSchema
);

module.exports = UserAccountDetail;
