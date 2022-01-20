const ClientError = require('../../exceptions/ClientError');

/* eslint-disable no-underscore-dangle */
class LandingsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postLandingHandler = this.postLandingHandler.bind(this);
    this.getLandingsHandler = this.getLandingsHandler.bind(this);
    this.getLandingByFishIdHandler = this.getLandingByFishIdHandler.bind(this);
    this.getLandingByIdHandler = this.getLandingByIdHandler.bind(this);
    this.putLandingByIdHandler = this.putLandingByIdHandler.bind(this);
    this.deleteLandingByIdHandler = this.deleteLandingByIdHandler.bind(this);
  }

  async postLandingHandler(request, h) {
    try {
      this._validator.validateLandingPayload(request.payload);
      const { fishId, portCode, datetime, supplierCode, weight, fishLength } = request.payload;
      //const { id: credentialId } = request.auth.credentials;

      const landingId = await this._service.addLanding({
        fishId, portCode, datetime, supplierCode, weight, fishLength,
      });

      const response = h.response({
        status: 'success',
        message: 'Landing added successfully',
        data: {
          landingId,
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

  async getLandingsHandler(request) {
    //const { id: credentialId } = request.auth.credentials;
    const landings = await this._service.getLandings();
    return {
      status: 'success',
      data: {
        landings,
      },
    };
  }

  async getLandingByIdHandler(request, h) {
    try {
      const { id } = request.params;
      //const { id: credentialId } = request.auth.credentials;

      //await this._service.verifyLandingAccess(id, credentialId);
      const landing = await this._service.getLandingById(id);

      return {
        status: 'success',
        data: {
          landing,
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
  
  async getLandingByFishIdHandler(request, h) {
    try {
      const fishId = request.params.fishId || request.query.fishId || '';
      //const { id: credentialId } = request.auth.credentials;

      //await this._service.verifyLandingsAccess(id, credentialId);
      const landing = await this._service.getLandingByFishId(fishId);

      return {
        status: 'success',
        data: {
          landing,
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

  async putLandingByIdHandler(request, h) {
    try {
      this._validator.validateLandingPayload(request.payload);
      const { id } = request.params;
      //const { id: credentialId } = request.auth.credentials;

      //await this._service.verifyLandingAccess(id, credentialId);
      await this._service.editLandingById(id, request.payload);

      return {
        status: 'success',
        message: 'Landing successfully updated',
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

  async deleteLandingByIdHandler(request, h) {
    try {
      const { id } = request.params;

      //const { id: credentialId } = request.auth.credentials;

      //await this._service.verifyLandingOwner(id, credentialId);
      await this._service.deleteLandingById(id);

      return {
        status: 'success',
        message: 'Landing successfully deleted',
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

module.exports = LandingsHandler;
