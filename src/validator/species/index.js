const InvariantError = require('../../exceptions/InvariantError');
const { SpeciesPayloadSchema } = require('./schema');

const SpeciesValidator = {
  validateCompanyPayload: (payload) => {
    const validationResult = SpeciesPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = SpeciesValidator;
