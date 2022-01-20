const InvariantError = require('../../exceptions/InvariantError');
const { CuttingPayloadSchema } = require('./schema');

const CuttingsValidator = {
  validateCompanyPayload: (payload) => {
    const validationResult = CuttingPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = CuttingsValidator;
