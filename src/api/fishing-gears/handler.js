const ClientError = require('../../exceptions/ClientError');

/* eslint-disable no-underscore-dangle */
class FishingGearsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postFishingGearHandler = this.postFishingGearHandler.bind(this);
    this.getFishingGearsHandler = this.getFishingGearsHandler.bind(this);
    this.getFishingGearsByFishingGearCodeHandler = this.getFishingGearsByFishingGearCodeHandler.bind(this);
    this.getFishingGearByIdHandler = this.getFishingGearByIdHandler.bind(this);
    this.putFishingGearByIdHandler = this.putFishingGearByIdHandler.bind(this);
    this.deleteFishingGearByIdHandler = this.deleteFishingGearByIdHandler.bind(this);
  }

  async postFishingGearHandler(request, h) {
    try {
      this._validator.validateFishingGearPayload(request.payload);
      const { fishingGearCode, fishingGearName } = request.payload;
      //const { id: credentialId } = request.auth.credentials;

      const fishingGearId = await this._service.addFishingGear({
        fishingGearCode, fishingGearName,
      });

      const response = h.response({
        status: 'success',
        message: 'Fishing Gear added successfully',
        data: {
          fishingGearId,
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

  async getFishingGearsHandler(request) {
    //const { id: credentialId } = request.auth.credentials;
    const fishingGears = await this._service.getFishingGears();
    return {
      status: 'success',
      data: {
        fishingGears,
      },
    };
  }

  async getFishingGearByIdHandler(request, h) {
    try {
      const { id } = request.params;
      //const { id: credentialId } = request.auth.credentials;

      //await this._service.verifyFishingGearAccess(id, credentialId);
      const fishingGear = await this._service.getFishingGearById(id);

      return {
        status: 'success',
        data: {
          fishingGear,
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
  
  async getFishingGearsByFishingGearCodeHandler(request, h) {
    try {
      const { fishingGearCode = '' } = request.params || request.query;
      //const { id: credentialId } = request.auth.credentials;

      //await this._service.verifyFishingGearsAccess(id, credentialId);
      const fishingGears = await this._service.getFishingGearsByFishingGearCode(fishingGearCode);

      return {
        status: 'success',
        data: {
          fishingGears,
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

  async putFishingGearByIdHandler(request, h) {
    try {
      this._validator.validateFishingGearPayload(request.payload);
      const { id } = request.params;
      //const { id: credentialId } = request.auth.credentials;

      //await this._service.verifyFishingGearAccess(id, credentialId);
      await this._service.editFishingGearById(id, request.payload);

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

  async deleteFishingGearByIdHandler(request, h) {
    try {
      const { id } = request.params;

      //const { id: credentialId } = request.auth.credentials;

      //await this._service.verifyFishingGearOwner(id, credentialId);
      await this._service.deleteFishingGearById(id);

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

module.exports = FishingGearsHandler;
