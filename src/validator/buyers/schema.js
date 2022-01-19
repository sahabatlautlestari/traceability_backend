const Joi = require('joi');

const BuyerPayloadSchema = Joi.object({
  buyerCode: Joi.string().required(),
  buyerName: Joi.string().required(),
  location: Joi.object().required(),
});

module.exports = { BuyerPayloadSchema };
