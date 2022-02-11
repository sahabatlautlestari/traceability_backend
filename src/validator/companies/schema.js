const Joi = require('joi');

const CompanyPayloadSchema = Joi.object({
  id: Joi.number(),
  companyCode: Joi.string().required(),
  companyName: Joi.string().required(),
  location: Joi.object().required(),
});

module.exports = { CompanyPayloadSchema };
