const ClientError = require('../../exceptions/ClientError');

/* eslint-disable no-underscore-dangle */
class SpeciesHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postSpeciesHandler = this.postSpeciesHandler.bind(this);
    this.getSpeciesHandler = this.getSpeciesHandler.bind(this);
    this.getSpeciesBySpeciesCodeHandler = this.getSpeciesBySpeciesCodeHandler.bind(this);
    this.getSpeciesByIdHandler = this.getSpeciesByIdHandler.bind(this);
    this.putSpeciesByIdHandler = this.putSpeciesByIdHandler.bind(this);
    this.deleteSpeciesByIdHandler = this.deleteSpeciesByIdHandler.bind(this);
  }

  async postSpeciesHandler(request, h) {
    try {
      this._validator.validateSpeciesPayload(request.payload);
      const { speciesCode, speciesName } = request.payload;
      //const { id: credentialId } = request.auth.credentials;

      const speciesId = await this._service.addSpecies({
        speciesCode, speciesName,
      });

      const response = h.response({
        status: 'success',
        message: 'Species added successfully',
        data: {
          speciesId,
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

  async getSpeciesHandler(request) {
    //const { id: credentialId } = request.auth.credentials;
    const species = await this._service.getSpecies();
    return {
      status: 'success',
      data: {
        species,
      },
    };
  }

  async getSpeciesByIdHandler(request, h) {
    try {
      const { id } = request.params;
      //const { id: credentialId } = request.auth.credentials;

      //await this._service.verifySpeciesAccess(id, credentialId);
      const species = await this._service.getSpeciesById(id);

      return {
        status: 'success',
        data: {
          species,
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
  
  async getSpeciesBySpeciesCodeHandler(request, h) {
    try {
      const speciesCode = request.params.speciesCode || request.query.speciesCode || '';
      //const { id: credentialId } = request.auth.credentials;

      //await this._service.verifySpeciesAccess(id, credentialId);
      const species = await this._service.getSpeciesBySpeciesCode(speciesCode);

      return {
        status: 'success',
        data: {
          species,
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

  async putSpeciesByIdHandler(request, h) {
    try {
      this._validator.validateSpeciesPayload(request.payload);
      const { id } = request.params;
      //const { id: credentialId } = request.auth.credentials;

      //await this._service.verifySpeciesAccess(id, credentialId);
      await this._service.editSpeciesById(id, request.payload);

      return {
        status: 'success',
        message: 'Species successfully updated',
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

  async deleteSpeciesByIdHandler(request, h) {
    try {
      const { id } = request.params;

      //const { id: credentialId } = request.auth.credentials;

      //await this._service.verifySpeciesOwner(id, credentialId);
      await this._service.deleteSpeciesById(id);

      return {
        status: 'success',
        message: 'Species successfully deleted',
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

module.exports = SpeciesHandler;
