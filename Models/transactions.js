const Sequelize = require("sequelize");
const sequelize = require("../db.js");
const Transactions = sequelize.define("transactions", {
  transactionId: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  },
  fromAcountID: {
    type: Sequelize.BIGINT,
    allowNull: false,
  },
  ToAcountID: {
    type: Sequelize.BIGINT,
    allowNull: false,
  },
  amount: {
    type: Sequelize.BIGINT,
    allowNull: false,
  },
  timestamp: {
    type: Sequelize.BIGINT,
    allowNull: false,
  },
});

module.exports = Transactions;
