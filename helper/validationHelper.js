const Joi = require("joi");

exports.singupValidator = (data) => {
  const singupValue = Joi.object({
    username: Joi.string().lowercase().required(),
    password: Joi.string().min(6).lowercase().required(),
    accounttype: Joi.valid("Savings", "Current", "BasicSavings").required(),
  });
  return singupValue.validate(data, { abortEarly: false });
};

exports.loginValidator = (data) => {
  const logingValue = Joi.object({
    username: Joi.string().lowercase().required(),
    password: Joi.string().min(6).lowercase().required(),
  });
  return logingValue.validate(data, { abortEarly: false });
};

exports.addBalancesValidator = (data) => {
  const addBalanceValue = Joi.object({
    accounttype: Joi.valid("Savings", "Current", "BasicSavings").required(),
    balance: Joi.number().required(),
  });
  return addBalanceValue.validate(data, { abortEarly: false });
};
