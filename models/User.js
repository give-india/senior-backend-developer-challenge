const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide name"],
      minlength: 3,
      maxlength: 50,
    },
    accountIds: [mongoose.Schema.ObjectId],
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", UserSchema);
