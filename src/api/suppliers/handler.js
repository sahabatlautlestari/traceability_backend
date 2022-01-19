const ClientError = require('../../exceptions/ClientError');

/* eslint-disable no-underscore-dangle */
class SuppliersHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postSupplierHandler = this.postSupplierHandler.bind(this);
    this.getSuppliersHandler = this.getSuppliersHandler.bind(this);
    this.getSuppliersBySupplierCodeHandler = this.getSuppliersBySupplierCodeHandler.bind(this);
    this.getSupplierByIdHandler = this.getSupplierByIdHandler.bind(this);
    this.putSupplierByIdHandler = this.putSupplierByIdHandler.bind(this);
    this.deleteSupplierByIdHandler = this.deleteSupplierByIdHandler.bind(this);
  }

  async postSupplierHandler(request, h) {
    try {
      this._validator.validateSupplierPayload(request.payload);
      const { supplierCode, supplierName } = request.payload;
      //const { id: credentialId } = request.auth.credentials;

      const supplierId = await this._service.addSupplier({
        supplierCode, supplierName,
      });

      const response = h.response({
        status: 'success',
        message: 'Fishing Gear added successfully',
        data: {
          supplierId,
        },
      });

      response.code(201);
      return response;
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // SERVER ERROR
      const response = h.response({
        status: 'error',
        message: 'Sorry, there was a failure on our server.',
      });
      response.code(500);
      console.log(error);
      return response;
    }
  }

  async getSuppliersHandler(request) {
    //const { id: credentialId } = request.auth.credentials;
    const suppliers = await this._service.getSuppliers();
    return {
      status: 'success',
      data: {
        suppliers,
      },
    };
  }

  async getSupplierByIdHandler(request, h) {
    try {
      const { id } = request.params;
      //const { id: credentialId } = request.auth.credentials;

      //await this._service.verifySupplierAccess(id, credentialId);
      const supplier = await this._service.getSupplierById(id);

      return {
        status: 'success',
        data: {
          supplier,
        },
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // SERVER ERROR
      const response = h.response({
        status: 'error',
        message: 'Sorry, there was a failure on our server.',
      });
      response.code(500);
      console.log(error);
      return response;
    }
  }
  
  async getSuppliersBySupplierCodeHandler(request, h) {
    try {
      const { supplierCode = '' } = request.params || request.query;
      //const { id: credentialId } = request.auth.credentials;

      //await this._service.verifySuppliersAccess(id, credentialId);
      const suppliers = await this._service.getSuppliersBySupplierCode(supplierCode);

      return {
        status: 'success',
        data: {
          suppliers,
        },
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // SERVER ERROR
      const response = h.response({
        status: 'error',
        message: 'Sorry, there was a failure on our server.',
      });
      response.code(500);
      console.log(error);
      return response;
    }
  }

  async putSupplierByIdHandler(request, h) {
    try {
      this._validator.validateSupplierPayload(request.payload);
      const { id } = request.params;
      //const { id: credentialId } = request.auth.credentials;

      //await this._service.verifySupplierAccess(id, credentialId);
      await this._service.editSupplierById(id, request.payload);

      return {
        status: 'success',
        message: 'Fishing Gear successfully updated',
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // SERVER ERROR
      const response = h.response({
        status: 'error',
        message: 'Sorry, there was a failure on our server.',
      });
      response.code(500);
      console.log(error);
      return response;
    }
  }

  async deleteSupplierByIdHandler(request, h) {
    try {
      const { id } = request.params;

      //const { id: credentialId } = request.auth.credentials;

      //await this._service.verifySupplierOwner(id, credentialId);
      await this._service.deleteSupplierById(id);

      return {
        status: 'success',
        message: 'Fishing Gear successfully deleted',
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // SERVER ERROR
      const response = h.response({
        status: 'error',
        message: 'Sorry, there was a failure on our server.',
      });
      response.code(500);
      console.log(error);
      return response;
    }
  }
}

module.exports = SuppliersHandler;
