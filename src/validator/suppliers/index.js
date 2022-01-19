const InvariantError = require('../../exceptions/InvariantError');
const { SupplierPayloadSchema } = require('./schema');

const SuppliersValidator = {
  validateCompanyPayload: (payload) => {
    const validationResult = SupplierPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = SuppliersValidator;
