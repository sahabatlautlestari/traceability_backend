const ClientError = require('../../exceptions/ClientError');

/* eslint-disable no-underscore-dangle */
class CuttingsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postCuttingHandler = this.postCuttingHandler.bind(this);
    this.getCuttingsHandler = this.getCuttingsHandler.bind(this);
    this.getCuttingsByFishIdHandler = this.getCuttingsByFishIdHandler.bind(this);
    this.getCuttingByIdHandler = this.getCuttingByIdHandler.bind(this);
    this.putCuttingByIdHandler = this.putCuttingByIdHandler.bind(this);
    this.deleteCuttingByIdHandler = this.deleteCuttingByIdHandler.bind(this);
  }

  async postCuttingHandler(request, h) {
    try {
      this._validator.validateCuttingPayload(request.payload);
      const { fishId, loinId, weight, cutDate, grade, caseNumber } = request.payload;
      //const { id: credentialId } = request.auth.credentials;

      const cuttingId = await this._service.addCutting({
        fishId, loinId, weight, cutDate, grade, caseNumber,
      });

      const response = h.response({
        status: 'success',
        message: 'Cutting added successfully',
        data: {
          cuttingId,
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

  async getCuttingsHandler(request) {
    //const { id: credentialId } = request.auth.credentials;
    const cuttings = await this._service.getCuttings();
    return {
      status: 'success',
      data: {
        cuttings,
      },
    };
  }

  async getCuttingByIdHandler(request, h) {
    try {
      const { id } = request.params;
      //const { id: credentialId } = request.auth.credentials;

      //await this._service.verifyCuttingAccess(id, credentialId);
      const cutting = await this._service.getCuttingById(id);

      return {
        status: 'success',
        data: {
          cutting,
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
  
  async getCuttingsByFishIdHandler(request, h) {
    try {
      const fishId = request.params.fishId || request.query.fishId || '';
      //const { id: credentialId } = request.auth.credentials;

      //await this._service.verifyCuttingsAccess(id, credentialId);
      const cuttings = await this._service.getCuttingsByFishId(fishId);

      return {
        status: 'success',
        data: {
          cuttings,
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

  async putCuttingByIdHandler(request, h) {
    try {
      this._validator.validateCuttingPayload(request.payload);
      const { id } = request.params;
      //const { id: credentialId } = request.auth.credentials;

      //await this._service.verifyCuttingAccess(id, credentialId);
      await this._service.editCuttingById(id, request.payload);

      return {
        status: 'success',
        message: 'Cutting successfully updated',
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

  async deleteCuttingByIdHandler(request, h) {
    try {
      const { id } = request.params;

      //const { id: credentialId } = request.auth.credentials;

      //await this._service.verifyCuttingOwner(id, credentialId);
      await this._service.deleteCuttingById(id);

      return {
        status: 'success',
        message: 'Cutting successfully deleted',
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

module.exports = CuttingsHandler;
