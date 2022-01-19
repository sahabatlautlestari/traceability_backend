const Joi = require('joi');

const SupplierPayloadSchema = Joi.object({
  supplierCode: Joi.string().required(),
  supplierName: Joi.string().required(),
});

module.exports = { SupplierPayloadSchema };
