const Sequelize = require("sequelize");
const sequelize = require("../db.js");
const Account = sequelize.define("accounts", {
  account_id: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  },
  user_id: {
    type: Sequelize.BIGINT,
    allowNull: false,
  },
  account_type: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  balance: {
    type: Sequelize.BIGINT,
    allowNull: false,
  },
  isactive: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
});

module.exports = Account;
