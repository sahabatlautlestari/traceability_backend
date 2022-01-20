const ClientError = require('../../exceptions/ClientError');

/* eslint-disable no-underscore-dangle */
class CatchFishHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postCatchFishHandler = this.postCatchFishHandler.bind(this);
    this.getCatchFishHandler = this.getCatchFishHandler.bind(this);
    this.getCatchFishByFishIdHandler = this.getCatchFishByFishIdHandler.bind(this);
    this.getCatchFishByIdHandler = this.getCatchFishByIdHandler.bind(this);
    this.putCatchFishByIdHandler = this.putCatchFishByIdHandler.bind(this);
    this.deleteCatchFishByIdHandler = this.deleteCatchFishByIdHandler.bind(this);
  }

  async postCatchFishHandler(request, h) {
    try {
      this._validator.validateCatchFishPayload(request.payload);
      const { fishCode, location, datetime, vesselCode, fishingGearCode, speciesCode } = request.payload;
      //const { id: credentialId } = request.auth.credentials;

      const catchFishId = await this._service.addCatchFish({
        fishCode, location, datetime, vesselCode, fishingGearCode, speciesCode,
      });

      const response = h.response({
        status: 'success',
        message: 'Catch Fish added successfully',
        data: {
          catchFishId,
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

  async getCatchFishHandler(request) {
    //const { id: credentialId } = request.auth.credentials;
    const catchFish = await this._service.getCatchFish();
    return {
      status: 'success',
      data: {
        catchFish,
      },
    };
  }

  async getCatchFishByIdHandler(request, h) {
    try {
      const { id } = request.params;
      //const { id: credentialId } = request.auth.credentials;

      //await this._service.verifyCatchFishAccess(id, credentialId);
      const catchFish = await this._service.getCatchFishById(id);

      return {
        status: 'success',
        data: {
          catchFish,
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
  
  async getCatchFishByFishIdHandler(request, h) {
    try {
      const fishId = request.params.fishId || request.query.fishId || '';
      //const { id: credentialId } = request.auth.credentials;

      //await this._service.verifyCatchFishAccess(id, credentialId);
      const catchFish = await this._service.getCatchFishByFishId(fishId);

      return {
        status: 'success',
        data: {
          catchFish,
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

  async putCatchFishByIdHandler(request, h) {
    try {
      this._validator.validateCatchFishPayload(request.payload);
      const { id } = request.params;
      //const { id: credentialId } = request.auth.credentials;

      //await this._service.verifyCatchFishAccess(id, credentialId);
      await this._service.editCatchFishById(id, request.payload);

      return {
        status: 'success',
        message: 'Catch Fish successfully updated',
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

  async deleteCatchFishByIdHandler(request, h) {
    try {
      const { id } = request.params;

      //const { id: credentialId } = request.auth.credentials;

      //await this._service.verifyCatchFishOwner(id, credentialId);
      await this._service.deleteCatchFishById(id);

      return {
        status: 'success',
        message: 'Catch Fish successfully deleted',
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

module.exports = CatchFishHandler;
