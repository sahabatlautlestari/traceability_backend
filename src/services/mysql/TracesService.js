/* eslint-disable no-underscore-dangle */
const pool = require('../../utils/connection_pool');
const NotFoundError = require('../../exceptions/NotFoundError');
const { mapTracingToModel } = require('../../utils/mapping_table');

class TracesService {
  constructor() {
    this._pool = pool;
  }

  async getTracesByProductCode(productCode) {

    const [result] = await this._pool.query('call traceProduct(?)', [productCode]);
    
    if (result.length === 0) {
      throw new NotFoundError('Tracing data not found');
    }
    return result[0].map(mapTracingToModel);
  }
}

module.exports = TracesService;
