const Joi = require('joi');

const SpeciesPayloadSchema = Joi.object({
  speciesCode: Joi.string().required(),
  speciesName: Joi.string().required(),
});

module.exports = { SpeciesPayloadSchema };
