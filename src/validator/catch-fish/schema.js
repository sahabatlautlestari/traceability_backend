const Joi = require('joi');

const CatchFishPayloadSchema = Joi.object({
  fishId: Joi.string().required(),
  location: Joi.object().required(),
  datetime: Joi.date().required(),
  vesselCode: Joi.string().required(),
  fishingGearCode: Joi.string().required(),
  speciesCode: Joi.string().required(),
});

module.exports = { CatchFishPayloadSchema };
