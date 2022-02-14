const ClientError = require('../../exceptions/ClientError');

/* eslint-disable no-underscore-dangle */
class TracesHandler {
  constructor(service) {
    this._service = service;
    this.getTracesByProductCode = this.getTracesByProductCode.bind(this);
  }
  
  async getTracesByProductCode(request, h) {
    try {
      const productCode = request.params.productCode || request.query.productCode || '';
      const traces = await this._service.getTracesByProductCode(productCode);

      return {
        status: 'success',
        data: {
          traces,
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
}

module.exports = TracesHandler;
