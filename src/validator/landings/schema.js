const Joi = require('joi');

const LandingPayloadSchema = Joi.object({
  catchId: Joi.string().required(),
  fishId: Joi.string().required(),
  portCode: Joi.string().required(),
  datetime: Joi.date(),
  supplierCode: Joi.string().required,
  weight: Joi.number(),
  fishLength: Joi.number(),
});

module.exports = { LandingPayloadSchema };
