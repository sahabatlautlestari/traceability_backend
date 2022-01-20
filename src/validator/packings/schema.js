const Joi = require('joi');

const PackingPayloadSchema = Joi.object({
  caseNumber: Joi.string().required(),
  grade: Joi.string().required(),
  size: Joi.string().required(),
  prodDate: Joi.date(),
  weight: Joi.number(),
  pcs: Joi.number(),
  shipNo: Joi.string(),
});

module.exports = { PackingPayloadSchema };
