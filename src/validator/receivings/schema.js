const Joi = require('joi');

const ReceivingPayloadSchema = Joi.object({
  companyCode: Joi.string().required(),
  fishId: Joi.string().required(),
  grade: Joi.string().required(),
  weight: Joi.number(),
  supplierCode: Joi.string().required(),
  rcvDatetime: Joi.date(),
});

module.exports = { ReceivingPayloadSchema };
