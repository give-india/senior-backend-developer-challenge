import Joi from 'joi';

export const createAccountSchema = Joi.object({
    balance: Joi.number().required(),
    accountType: Joi.string().trim().required(),
    user_id: Joi.string().trim().length(24),
});

export const updateAccountSchema = Joi.object({
     balance: Joi.number().required(),
    accountType: Joi.string().trim().required()
});