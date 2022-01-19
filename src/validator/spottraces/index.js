const InvariantError = require('../../exceptions/InvariantError');
const { SpottracePayloadSchema } = require('./schema');

const SpottracesValidator = {
  validateSpottracePayload: (payload) => {
    const validationResult = SpottracePayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = SpottracesValidator;
