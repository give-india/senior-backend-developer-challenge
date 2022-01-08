const sequelize = require("../db");
const User = require("./users");
const { Account } = require("./accounts");
const Transactions = require("./transactions");

User.hasMany(Account, {
  foreignKey: "user_id",
  sourceKey: "user_id",
});

Account.belongsTo(User, {
  foreignKey: "user_id",
  sourceKey: "user_id",
});

try {
  sequelize.authenticate();
  sequelize.sync().then(console.log("database sync"));
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

module.exports = {
  User,
  Account,
  Transactions,
};
