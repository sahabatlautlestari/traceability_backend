const InvariantError = require('../../exceptions/InvariantError');
const { ReceivingPayloadSchema } = require('./schema');

const ReceivingsValidator = {
  validateCompanyPayload: (payload) => {
    const validationResult = ReceivingPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = ReceivingsValidator;
