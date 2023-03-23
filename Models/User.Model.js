const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 6,
  },
  accounttypeId: {
    type: [String],
    ref: "AccountType",
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
