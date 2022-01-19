const InvariantError = require('../../exceptions/InvariantError');
const { PortPayloadSchema } = require('./schema');

const PortsValidator = {
  validatePortPayload: (payload) => {
    const validationResult = PortPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = PortsValidator;
