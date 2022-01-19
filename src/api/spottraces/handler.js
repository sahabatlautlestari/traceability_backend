const ClientError = require('../../exceptions/ClientError');

/* eslint-disable no-underscore-dangle */
class SpottracesHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postSpottraceHandler = this.postSpottraceHandler.bind(this);
    this.getSpottracesHandler = this.getSpottracesHandler.bind(this);
    this.getSpottracesBySpottraceIdHandler = this.getSpottracesBySpottraceIdHandler.bind(this);
    this.getSpottraceByIdHandler = this.getSpottraceByIdHandler.bind(this);
    this.putSpottraceByIdHandler = this.putSpottraceByIdHandler.bind(this);
    this.deleteSpottraceByIdHandler = this.deleteSpottraceByIdHandler.bind(this);
  }

  async postSpottraceHandler(request, h) {
    try {
      this._validator.validateSpottracePayload(request.payload);
      const { spotId, unixTime, esn, latitude, longitude, datetime, time, batteryState, messageType, messageContent, location, localDate, localTime  } = request.payload;
      //const { id: credentialId } = request.auth.credentials;

      const spottraceId = await this._service.addSpottrace({
        spotId, unixTime, esn, latitude, longitude, datetime, time, batteryState, messageType, messageContent, location, localDate, localTime ,
      });

      const response = h.response({
        status: 'success',
        message: 'Spottrace added successfully',
        data: {
          spottraceId,
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

  async getSpottracesHandler(request) {
    //const { id: credentialId } = request.auth.credentials;
    const spottraces = await this._service.getSpottraces();
    return {
      status: 'success',
      data: {
        spottraces,
      },
    };
  }

  async getSpottraceByIdHandler(request, h) {
    try {
      const { id } = request.params;
      //const { id: credentialId } = request.auth.credentials;

      //await this._service.verifySpottraceAccess(id, credentialId);
      const spottrace = await this._service.getSpottraceById(id);

      return {
        status: 'success',
        data: {
          spottrace,
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
  
  async getSpottracesBySpottraceIdHandler(request, h) {
    try {
      const spotId = request.params.spotId || request.query.spotId || '';
      //const { id: credentialId } = request.auth.credentials;

      //await this._service.verifySpottracesAccess(id, credentialId);
      const spottraces = await this._service.getSpottracesBySpottraceId(spotId);

      return {
        status: 'success',
        data: {
          spottraces,
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

  async putSpottraceByIdHandler(request, h) {
    try {
      this._validator.validateSpottracePayload(request.payload);
      const { id } = request.params;
      //const { id: credentialId } = request.auth.credentials;

      //await this._service.verifySpottraceAccess(id, credentialId);
      await this._service.editSpottraceById(id, request.payload);

      return {
        status: 'success',
        message: 'Spottrace successfully updated',
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

  async deleteSpottraceByIdHandler(request, h) {
    try {
      const { id } = request.params;

      //const { id: credentialId } = request.auth.credentials;

      //await this._service.verifySpottraceOwner(id, credentialId);
      await this._service.deleteSpottraceById(id);

      return {
        status: 'success',
        message: 'Spottrace successfully deleted',
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

module.exports = SpottracesHandler;
