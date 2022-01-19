const Joi = require('joi');

const PortPayloadSchema = Joi.object({
  portCode: Joi.string().required(),
  portName: Joi.string().required(),
  location: Joi.object().required(),
});

module.exports = { PortPayloadSchema };
