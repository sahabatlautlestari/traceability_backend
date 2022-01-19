const ClientError = require('../../exceptions/ClientError');

/* eslint-disable no-underscore-dangle */
class CompaniesHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postCompanyHandler = this.postCompanyHandler.bind(this);
    this.getCompaniesHandler = this.getCompaniesHandler.bind(this);
    this.getCompaniesByCompanyCodeHandler = this.getCompaniesByCompanyCodeHandler.bind(this);
    this.getCompanyByIdHandler = this.getCompanyByIdHandler.bind(this);
    this.putCompanyByIdHandler = this.putCompanyByIdHandler.bind(this);
    this.deleteCompanyByIdHandler = this.deleteCompanyByIdHandler.bind(this);
  }

  async postCompanyHandler(request, h) {
    try {
      this._validator.validateCompanyPayload(request.payload);
      const { companyCode, companyName, location } = request.payload;
      //const { id: credentialId } = request.auth.credentials;

      const companyId = await this._service.addCompany({
        companyCode, companyName, location,
      });

      const response = h.response({
        status: 'success',
        message: 'Company added successfully',
        data: {
          companyId,
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

  async getCompaniesHandler(request) {
    //const { id: credentialId } = request.auth.credentials;
    const companies = await this._service.getCompanies();
    return {
      status: 'success',
      data: {
        companies,
      },
    };
  }

  async getCompanyByIdHandler(request, h) {
    try {
      const { id } = request.params;
      //const { id: credentialId } = request.auth.credentials;

      //await this._service.verifyCompanyAccess(id, credentialId);
      const company = await this._service.getCompanyById(id);

      return {
        status: 'success',
        data: {
          company,
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
  
  async getCompaniesByCompanyCodeHandler(request, h) {
    try {
      const { companyCode = '' } = request.query || request.params;
      //const { id: credentialId } = request.auth.credentials;

      //await this._service.verifyCompaniesAccess(id, credentialId);
      const companies = await this._service.getCompaniesByCompanyCode(companyCode);

      return {
        status: 'success',
        data: {
          companies,
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

  async putCompanyByIdHandler(request, h) {
    try {
      this._validator.validateCompanyPayload(request.payload);
      const { id } = request.params;
      //const { id: credentialId } = request.auth.credentials;

      //await this._service.verifyCompanyAccess(id, credentialId);
      await this._service.editCompanyById(id, request.payload);

      return {
        status: 'success',
        message: 'Company successfully updated',
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

  async deleteCompanyByIdHandler(request, h) {
    try {
      const { id } = request.params;

      //const { id: credentialId } = request.auth.credentials;

      //await this._service.verifyCompanyOwner(id, credentialId);
      await this._service.deleteCompanyById(id);

      return {
        status: 'success',
        message: 'Company successfully deleted',
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

module.exports = CompaniesHandler;
