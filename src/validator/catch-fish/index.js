const InvariantError = require('../../exceptions/InvariantError');
const { CatchFishPayloadSchema } = require('./schema');

const CatchFishValidator = {
  validateCatchFishPayload: (payload) => {
    const validationResult = CatchFishPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = CatchFishValidator;
