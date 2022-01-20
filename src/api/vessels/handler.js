const ClientError = require('../../exceptions/ClientError');

/* eslint-disable no-underscore-dangle */
class VesselsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postVesselHandler = this.postVesselHandler.bind(this);
    this.getVesselsHandler = this.getVesselsHandler.bind(this);
    this.getVesselsByVesselCodeHandler = this.getVesselsByVesselCodeHandler.bind(this);
    this.getVesselByIdHandler = this.getVesselByIdHandler.bind(this);
    this.putVesselByIdHandler = this.putVesselByIdHandler.bind(this);
    this.deleteVesselByIdHandler = this.deleteVesselByIdHandler.bind(this);
  }

  async postVesselHandler(request, h) {
    try {
      this._validator.validateVesselPayload(request.payload);
      const { vesselCode, vesselName, vesselSize, fisherman } = request.payload;
      //const { id: credentialId } = request.auth.credentials;

      const vesselId = await this._service.addVessel({
        vesselCode, vesselName, vesselSize, fisherman,
      });

      const response = h.response({
        status: 'success',
        message: 'Vessel added successfully',
        data: {
          vesselId,
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

  async getVesselsHandler(request) {
    //const { id: credentialId } = request.auth.credentials;
    const vessels = await this._service.getVessels();
    return {
      status: 'success',
      data: {
        vessels,
      },
    };
  }

  async getVesselByIdHandler(request, h) {
    try {
      const { id } = request.params;
      //const { id: credentialId } = request.auth.credentials;

      //await this._service.verifyVesselAccess(id, credentialId);
      const vessel = await this._service.getVesselById(id);

      return {
        status: 'success',
        data: {
          vessel,
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
  
  async getVesselsByVesselCodeHandler(request, h) {
    try {
      const vesselCode = request.params.vesselCode || request.query.vesselCode || '';
      //const { id: credentialId } = request.auth.credentials;

      //await this._service.verifyVesselsAccess(id, credentialId);
      const vessels = await this._service.getVesselsByVesselCode(vesselCode);

      return {
        status: 'success',
        data: {
          vessels,
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

  async putVesselByIdHandler(request, h) {
    try {
      this._validator.validateVesselPayload(request.payload);
      const { id } = request.params;
      //const { id: credentialId } = request.auth.credentials;

      //await this._service.verifyVesselAccess(id, credentialId);
      await this._service.editVesselById(id, request.payload);

      return {
        status: 'success',
        message: 'Vessel successfully updated',
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

  async deleteVesselByIdHandler(request, h) {
    try {
      const { id } = request.params;

      //const { id: credentialId } = request.auth.credentials;

      //await this._service.verifyVesselOwner(id, credentialId);
      await this._service.deleteVesselById(id);

      return {
        status: 'success',
        message: 'Vessel successfully deleted',
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

module.exports = VesselsHandler;
