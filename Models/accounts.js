const Sequelize = require("sequelize");
const sequelize = require("../db.js");
const Joi = require("joi");

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

function validateAccountTransfer_req(data) {
  const schema = Joi.object({
    fromAccountId: Joi.number().min(1).required(),
    toAccountId: Joi.number().min(1).required(),
    amount: Joi.number().min(1).required(),
  });

  return schema.validate(data);
}

function validateCashTransfer_req(data) {
  const schema = Joi.object({
    toAccountId: Joi.number().min(1).required(),
    amount: Joi.number().min(1).required(),
  });

  return schema.validate(data);
}

module.exports = {
  Account,
  validateAccountTransfer_req,
  validateCashTransfer_req,
};
