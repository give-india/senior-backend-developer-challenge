const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AccountTypeSchema = new Schema({
  accountType: {
    type: String,
  },
});

const AccountType = mongoose.model("AccountType", AccountTypeSchema);

module.exports = AccountType;
