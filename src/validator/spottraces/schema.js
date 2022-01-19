const Joi = require('joi');

const SpottracePayloadSchema = Joi.object({
  spotId: Joi.number().required(),
  unixTime: Joi.number().required(),
  ens: Joi.string().required(),
  latitude: Joi.number().required(),
  longitude: Joi.number().required(),
  datetime: Joi.date().required(),
  time: Joi.string().required(),
  batteryState: Joi.string().required(),
  messageType: Joi.string().required(),
  messageContent: Joi.string().required(),
  location: Joi.string().required(),
  localDate: Joi.date().required(),
  localTime: Joi.string().required(),
});

module.exports = { SpottracePayloadSchema };
