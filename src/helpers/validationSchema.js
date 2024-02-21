const Joi = require('@hapi/joi')

const accountSchema = Joi.object({
    fromAccountId: Joi.string().required(),
    toAccountId: Joi.string().required(),
    amount: Joi.number().required(),
})

module.exports = accountSchema;