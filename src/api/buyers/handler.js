const ClientError = require('../../exceptions/ClientError');

/* eslint-disable no-underscore-dangle */
class BuyersHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postBuyerHandler = this.postBuyerHandler.bind(this);
    this.getBuyersHandler = this.getBuyersHandler.bind(this);
    this.getBuyersByBuyerCodeHandler = this.getBuyersByBuyerCodeHandler.bind(this);
    this.getBuyerByIdHandler = this.getBuyerByIdHandler.bind(this);
    this.putBuyerByIdHandler = this.putBuyerByIdHandler.bind(this);
    this.deleteBuyerByIdHandler = this.deleteBuyerByIdHandler.bind(this);
  }

  async postBuyerHandler(request, h) {
    try {
      this._validator.validateBuyerPayload(request.payload);
      const { buyerCode, buyerName, location } = request.payload;
      //const { id: credentialId } = request.auth.credentials;

      const buyerId = await this._service.addBuyer({
        buyerCode, buyerName, location,
      });

      const response = h.response({
        status: 'success',
        message: 'Buyer added successfully',
        data: {
          buyerId,
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

  async getBuyersHandler(request) {
    //const { id: credentialId } = request.auth.credentials;
    const buyers = await this._service.getBuyers();
    return {
      status: 'success',
      data: {
        buyers,
      },
    };
  }

  async getBuyerByIdHandler(request, h) {
    try {
      const { id } = request.params;
      //const { id: credentialId } = request.auth.credentials;

      //await this._service.verifyBuyerAccess(id, credentialId);
      const buyer = await this._service.getBuyerById(id);

      return {
        status: 'success',
        data: {
          buyer,
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
  
  async getBuyersByBuyerCodeHandler(request, h) {
    try {
      const buyerCode = request.params.buyerCode || request.query.buyerCode || '';
      //const { id: credentialId } = request.auth.credentials;

      //await this._service.verifyBuyersAccess(id, credentialId);
      const buyers = await this._service.getBuyersByBuyerCode(buyerCode);

      return {
        status: 'success',
        data: {
          buyers,
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

  async putBuyerByIdHandler(request, h) {
    try {
      this._validator.validateBuyerPayload(request.payload);
      const { id } = request.params;
      //const { id: credentialId } = request.auth.credentials;

      //await this._service.verifyBuyerAccess(id, credentialId);
      await this._service.editBuyerById(id, request.payload);

      return {
        status: 'success',
        message: 'Buyer successfully updated',
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

  async deleteBuyerByIdHandler(request, h) {
    try {
      const { id } = request.params;

      //const { id: credentialId } = request.auth.credentials;

      //await this._service.verifyBuyerOwner(id, credentialId);
      await this._service.deleteBuyerById(id);

      return {
        status: 'success',
        message: 'Buyer successfully deleted',
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

module.exports = BuyersHandler;
