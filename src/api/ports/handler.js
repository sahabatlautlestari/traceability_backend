const ClientError = require('../../exceptions/ClientError');

/* eslint-disable no-underscore-dangle */
class PortsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postPortHandler = this.postPortHandler.bind(this);
    this.getPortsHandler = this.getPortsHandler.bind(this);
    this.getPortsByPortCodeHandler = this.getPortsByPortCodeHandler.bind(this);
    this.getPortByIdHandler = this.getPortByIdHandler.bind(this);
    this.putPortByIdHandler = this.putPortByIdHandler.bind(this);
    this.deletePortByIdHandler = this.deletePortByIdHandler.bind(this);
  }

  async postPortHandler(request, h) {
    try {
      this._validator.validatePortPayload(request.payload);
      const { portCode, portName, location } = request.payload;
      //const { id: credentialId } = request.auth.credentials;

      const portId = await this._service.addPort({
        portCode, portName, location,
      });

      const response = h.response({
        status: 'success',
        message: 'Port added successfully',
        data: {
          portId,
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

  async getPortsHandler(request) {
    //const { id: credentialId } = request.auth.credentials;
    const ports = await this._service.getPorts();
    return {
      status: 'success',
      data: {
        ports,
      },
    };
  }

  async getPortByIdHandler(request, h) {
    try {
      const { id } = request.params;
      //const { id: credentialId } = request.auth.credentials;

      //await this._service.verifyPortAccess(id, credentialId);
      const port = await this._service.getPortById(id);

      return {
        status: 'success',
        data: {
          port,
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
  
  async getPortsByPortCodeHandler(request, h) {
    try {
      const {portCode = ''} = request.params || request.query;
      //const { id: credentialId } = request.auth.credentials;

      //await this._service.verifyPortsAccess(id, credentialId);
      const ports = await this._service.getPortsByPortCode(portCode);

      return {
        status: 'success',
        data: {
          ports,
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

  async putPortByIdHandler(request, h) {
    try {
      this._validator.validatePortPayload(request.payload);
      const { id } = request.params;
      //const { id: credentialId } = request.auth.credentials;

      //await this._service.verifyPortAccess(id, credentialId);
      await this._service.editPortById(id, request.payload);

      return {
        status: 'success',
        message: 'Port successfully updated',
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

  async deletePortByIdHandler(request, h) {
    try {
      const { id } = request.params;

      //const { id: credentialId } = request.auth.credentials;

      //await this._service.verifyPortOwner(id, credentialId);
      await this._service.deletePortById(id);

      return {
        status: 'success',
        message: 'Port successfully deleted',
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

module.exports = PortsHandler;
