const Sequelize = require("sequelize");
const sequelize = require("../db.js");
const User = sequelize.define("user", {
  user_id: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  isactive: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
});

module.exports = User;
