/* eslint-disable no-underscore-dangle */
const pool = require('../../utils/connection_pool');
const NotFoundError = require('../../exceptions/NotFoundError');

class TracesService {
  constructor() {
    this._pool = pool;
  }

  async getTracesByProductCode(productCode) {

    const [result] = await this._pool.query('call traceProduct(?)', [productCode]);
    
    if (result.length === 0) {
      throw new NotFoundError('Tracing data not found');
    }
    
    return result;
  }
}

module.exports = TracesService;
