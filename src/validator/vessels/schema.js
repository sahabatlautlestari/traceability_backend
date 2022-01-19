const Joi = require('joi');

const VesselPayloadSchema = Joi.object({
  vesselCode: Joi.string().required(),
  vesselName: Joi.string().required(),
  vesselSize: Joi.string().required(),
  fisherman: Joi.string().required(),
});

module.exports = { VesselPayloadSchema };
