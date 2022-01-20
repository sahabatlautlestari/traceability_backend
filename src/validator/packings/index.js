const InvariantError = require('../../exceptions/InvariantError');
const { PackingPayloadSchema } = require('./schema');

const PackingsValidator = {
  validateCompanyPayload: (payload) => {
    const validationResult = PackingPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = PackingsValidator;
