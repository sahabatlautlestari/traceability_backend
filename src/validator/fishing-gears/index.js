const InvariantError = require('../../exceptions/InvariantError');
const { FishingGearPayloadSchema } = require('./schema');

const FishingGearsValidator = {
  validateCompanyPayload: (payload) => {
    const validationResult = FishingGearPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = FishingGearsValidator;
