const Joi = require('joi');

const CuttingPayloadSchema = Joi.object({
  fishId: Joi.string().required(),
  loinId: Joi.string().required(),
  weight: Joi.number(),
  cutDate: Joi.date().required(),
  grade: Joi.string(),
  caseNumber: Joi.string(),
});

module.exports = { CuttingPayloadSchema };
