const Joi = require('joi');

const FishingGearPayloadSchema = Joi.object({
  fishingGearCode: Joi.string().required(),
  fishingGearName: Joi.string().required(),
});

module.exports = { FishingGearPayloadSchema };
