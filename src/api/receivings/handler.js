const ClientError = require('../../exceptions/ClientError');

/* eslint-disable no-underscore-dangle */
class ReceivingsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postReceivingHandler = this.postReceivingHandler.bind(this);
    this.getReceivingsHandler = this.getReceivingsHandler.bind(this);
    this.getReceivingsByFishIdHandler = this.getReceivingsByFishIdHandler.bind(this);
    this.getReceivingByIdHandler = this.getReceivingByIdHandler.bind(this);
    this.putReceivingByIdHandler = this.putReceivingByIdHandler.bind(this);
    this.deleteReceivingByIdHandler = this.deleteReceivingByIdHandler.bind(this);
  }

  async postReceivingHandler(request, h) {
    try {
      this._validator.validateReceivingPayload(request.payload);
      const { companyCode, fishId, grade, weight, supplierId, rcvDatetime } = request.payload;
      //const { id: credentialId } = request.auth.credentials;

      const receivingId = await this._service.addReceiving({
        companyCode, fishId, grade, weight, supplierId, rcvDatetime,
      });

      const response = h.response({
        status: 'success',
        message: 'Receiving added successfully',
        data: {
          receivingId,
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

  async getReceivingsHandler(request) {
    //const { id: credentialId } = request.auth.credentials;
    const receivings = await this._service.getReceivings();
    return {
      status: 'success',
      data: {
        receivings,
      },
    };
  }

  async getReceivingByIdHandler(request, h) {
    try {
      const { id } = request.params;
      //const { id: credentialId } = request.auth.credentials;

      //await this._service.verifyReceivingAccess(id, credentialId);
      const receiving = await this._service.getReceivingById(id);

      return {
        status: 'success',
        data: {
          receiving,
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
  
  async getReceivingsByFishIdHandler(request, h) {
    try {
      const fishId = request.params.fishId || request.query.fishId || '';
      //const { id: credentialId } = request.auth.credentials;

      //await this._service.verifyReceivingsAccess(id, credentialId);
      const receiving = await this._service.getReceivingByFishId(fishId);

      return {
        status: 'success',
        data: {
          receiving,
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

  async putReceivingByIdHandler(request, h) {
    try {
      this._validator.validateReceivingPayload(request.payload);
      const { id } = request.params;
      //const { id: credentialId } = request.auth.credentials;

      //await this._service.verifyReceivingAccess(id, credentialId);
      await this._service.editReceivingById(id, request.payload);

      return {
        status: 'success',
        message: 'Receiving successfully updated',
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

  async deleteReceivingByIdHandler(request, h) {
    try {
      const { id } = request.params;

      //const { id: credentialId } = request.auth.credentials;

      //await this._service.verifyReceivingOwner(id, credentialId);
      await this._service.deleteReceivingById(id);

      return {
        status: 'success',
        message: 'Receiving successfully deleted',
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

module.exports = ReceivingsHandler;
