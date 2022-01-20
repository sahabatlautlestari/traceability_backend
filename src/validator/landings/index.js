const InvariantError = require('../../exceptions/InvariantError');
const { LandingPayloadSchema } = require('./schema');

const LandingsValidator = {
  validateCompanyPayload: (payload) => {
    const validationResult = LandingPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = LandingsValidator;
