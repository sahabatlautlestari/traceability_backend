const InvariantError = require('../../exceptions/InvariantError');
const { VesselPayloadSchema } = require('./schema');

const VesselsValidator = {
  validateCompanyPayload: (payload) => {
    const validationResult = VesselPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = VesselsValidator;
