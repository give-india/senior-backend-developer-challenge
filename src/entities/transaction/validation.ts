import Joi from 'joi';

export const createTransactionSchema = Joi.object({
    from: Joi.string().trim().length(24),
    to: Joi.string().trim().length(24),
    amount: Joi.number().required(),
});

export const updateTransactionSchema = Joi.object({
    status:Joi.string().required()
});