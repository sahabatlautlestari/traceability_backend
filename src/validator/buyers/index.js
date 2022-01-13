const InvariantError = require('../../exceptions/InvariantError');
const { BuyerPayloadSchema } = require('./schema');

const BuyersValidator = {
  validateBuyerPayload: (payload) => {
    const validationResult = BuyerPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = BuyersValidator;
