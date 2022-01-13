const Joi = require('joi');

const BuyerPayloadSchema = Joi.object({
  idbuyer: Joi.string().required(),
  buyername: Joi.string().required(),
  location: Joi.object().required(),
});

module.exports = { BuyerPayloadSchema };
