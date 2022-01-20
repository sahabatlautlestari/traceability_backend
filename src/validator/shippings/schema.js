const Joi = require('joi');

const ShippingPayloadSchema = Joi.object({
  shipNo: Joi.string().required(),
  shipDate: Joi.date(),
  buyerCode: Joi.string().required(),
  voyageNo: Joi.string().required(),
  containerNo: Joi.string().required(),
});

module.exports = { ShippingPayloadSchema };
