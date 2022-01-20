const ClientError = require('../../exceptions/ClientError');

/* eslint-disable no-underscore-dangle */
class ShippingsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postShippingHandler = this.postShippingHandler.bind(this);
    this.getShippingsHandler = this.getShippingsHandler.bind(this);
    this.getShippingByShipNumberHandler = this.getShippingByShipNumberHandler.bind(this);
    this.getShippingByIdHandler = this.getShippingByIdHandler.bind(this);
    this.putShippingByIdHandler = this.putShippingByIdHandler.bind(this);
    this.deleteShippingByIdHandler = this.deleteShippingByIdHandler.bind(this);
  }

  async postShippingHandler(request, h) {
    try {
      this._validator.validateShippingPayload(request.payload);
      const { shipNo, shipDate, buyerCode, voyageNo, containerNo } = request.payload;
      //const { id: credentialId } = request.auth.credentials;

      const shippingId = await this._service.addShipping({
        shipNo, shipDate, buyerCode, voyageNo, containerNo,
      });

      const response = h.response({
        status: 'success',
        message: 'Shipping added successfully',
        data: {
          shippingId,
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

  async getShippingsHandler(request) {
    //const { id: credentialId } = request.auth.credentials;
    const shippings = await this._service.getShippings();
    return {
      status: 'success',
      data: {
        shippings,
      },
    };
  }

  async getShippingByIdHandler(request, h) {
    try {
      const { id } = request.params;
      //const { id: credentialId } = request.auth.credentials;

      //await this._service.verifyShippingAccess(id, credentialId);
      const shipping = await this._service.getShippingById(id);

      return {
        status: 'success',
        data: {
          shipping,
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
  
  async getShippingByShipNumberHandler(request, h) {
    try {
      const shipNo = request.params.shipNo || request.query.shipNo || '';
      //const { id: credentialId } = request.auth.credentials;

      //await this._service.verifyShippingsAccess(id, credentialId);
      const shipping = await this._service.getShippingByShipNo(shipNo);

      return {
        status: 'success',
        data: {
          shipping,
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

  async putShippingByIdHandler(request, h) {
    try {
      this._validator.validateShippingPayload(request.payload);
      const { id } = request.params;
      //const { id: credentialId } = request.auth.credentials;

      //await this._service.verifyShippingAccess(id, credentialId);
      await this._service.editShippingById(id, request.payload);

      return {
        status: 'success',
        message: 'Shipping successfully updated',
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

  async deleteShippingByIdHandler(request, h) {
    try {
      const { id } = request.params;

      //const { id: credentialId } = request.auth.credentials;

      //await this._service.verifyShippingOwner(id, credentialId);
      await this._service.deleteShippingById(id);

      return {
        status: 'success',
        message: 'Shipping successfully deleted',
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

module.exports = ShippingsHandler;
