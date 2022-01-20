const ClientError = require('../../exceptions/ClientError');

/* eslint-disable no-underscore-dangle */
class PackingsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postPackingHandler = this.postPackingHandler.bind(this);
    this.getPackingsHandler = this.getPackingsHandler.bind(this);
    this.getPackingsByCaseNumberHandler = this.getPackingsByCaseNumberHandler.bind(this);
    this.getPackingByIdHandler = this.getPackingByIdHandler.bind(this);
    this.putPackingByIdHandler = this.putPackingByIdHandler.bind(this);
    this.deletePackingByIdHandler = this.deletePackingByIdHandler.bind(this);
  }

  async postPackingHandler(request, h) {
    try {
      this._validator.validatePackingPayload(request.payload);
      const { caseNumber, grade, size, prodDate, weight, pcs, shipNo } = request.payload;
      //const { id: credentialId } = request.auth.credentials;

      const packingId = await this._service.addPacking({
        caseNumber, grade, size, prodDate, weight, pcs, shipNo,
      });

      const response = h.response({
        status: 'success',
        message: 'Packing added successfully',
        data: {
          packingId,
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

  async getPackingsHandler(request) {
    //const { id: credentialId } = request.auth.credentials;
    const packings = await this._service.getPackings();
    return {
      status: 'success',
      data: {
        packings,
      },
    };
  }

  async getPackingByIdHandler(request, h) {
    try {
      const { id } = request.params;
      //const { id: credentialId } = request.auth.credentials;

      //await this._service.verifyPackingAccess(id, credentialId);
      const packing = await this._service.getPackingById(id);

      return {
        status: 'success',
        data: {
          packing,
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
  
  async getPackingsByCaseNumberHandler(request, h) {
    try {
      const caseNo = request.params.caseNo || request.query.caseNo || '';
      //const { id: credentialId } = request.auth.credentials;

      //await this._service.verifyPackingsAccess(id, credentialId);
      const packings = await this._service.getPackingsByCaseNumber(caseNo);

      return {
        status: 'success',
        data: {
          packings,
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

  async putPackingByIdHandler(request, h) {
    try {
      this._validator.validatePackingPayload(request.payload);
      const { id } = request.params;
      //const { id: credentialId } = request.auth.credentials;

      //await this._service.verifyPackingAccess(id, credentialId);
      await this._service.editPackingById(id, request.payload);

      return {
        status: 'success',
        message: 'Packing successfully updated',
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

  async deletePackingByIdHandler(request, h) {
    try {
      const { id } = request.params;

      //const { id: credentialId } = request.auth.credentials;

      //await this._service.verifyPackingOwner(id, credentialId);
      await this._service.deletePackingById(id);

      return {
        status: 'success',
        message: 'Packing successfully deleted',
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

module.exports = PackingsHandler;
