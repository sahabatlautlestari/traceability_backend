/* eslint-disable no-underscore-dangle */
const pool = require('../../utils/connection_pool');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const {mapReceivingToModel} = require('../../utils/mapping_table');

class ReceivingsService {
  constructor() {
    this._pool = pool;
  }

  async addReceiving({ companyCode, fishId, grade, weight, supplierId, rcvDatetime }) {
    await this.verifyNewReceivingCompanyAndFish(supplierId, fishId);

    const [result] = await this._pool.query('INSERT INTO tbreceiving (companyid, idfish, grade, weight, supplierid, rcvdatetime) VALUES (?, ?, ?, ?, ?, ?)',
    [ companyCode, fishId, grade, weight, supplierId, rcvDatetime ]);
    
    if (!result) {
      throw new InvariantError('Failed to save new Receiving');
    }
    return result.insertId;
  }

  async verifyNewReceivingCompanyAndFish(supplierId, fishId) {

    const [rows] = await this._pool.query('SELECT companyid, idfish FROM tbreceiving WHERE supplierid = ? AND idfish = ?', [supplierId, fishId]);
    
    if(rows.length > 0) {
      throw new InvariantError(`Failed to add Receiving. Receiving Fish ID ${fishId} from Supplier ${supplierId} already exist.`)
    };
  }

  async editReceivingById(id, { companyCode, fishId, grade, weight, supplierId, rcvDatetime }) {

    const [result] = await this._pool.query('UPDATE tbreceiving SET companyid = ?, idfish = ?, grade = ?, weight = ?, supplierid = ?, rcvdatetime = ?  WHERE id = ?',
    [companyCode, fishId, grade, weight, supplierId, rcvDatetime, id]);

    if (result.affectedRows === 0) {
      throw new InvariantError('Failed to update Receiving. ID not found.');
    }
    return result.insertId;
  }

  async deleteReceivingById(id) {

    const [result] = await this._pool.query('DELETE FROM tbreceiving WHERE id = ?',
    [id]);

    if (result.affectedRows === 0) {
      throw new InvariantError('Failed to delete Receiving. ID not found.');
    }
    return result.insertId;
  }

  async getReceivings() {
    const [result] = await this._pool.query('SELECT id, companyid, idfish, grade, weight, supplierid, rcvdatetime FROM tbreceiving');
    return result.map(mapReceivingToModel);
  }

  async getReceivingById(id) {
    const [result] = await this._pool.query('SELECT id, companyid, idfish, grade, weight, supplierid, rcvdatetime FROM tbreceiving WHERE id = ?', [id]);

    if (result.length === 0) {
      throw new NotFoundError('Receiving not found');
    }

    return result.map(mapReceivingToModel)[0];
  }

  async getReceivingByFishId(fishId) {

    const [result] = await this._pool.query('SELECT id, companyid, idfish, grade, weight, supplierid, rcvdatetime FROM tbreceiving WHERE idfish = ?', [fishId]);

    if (result.length === 0) {
      throw new NotFoundError('Receiving not found');
    }

    return result.map(mapReceivingToModel)[0];
  }
}

module.exports = ReceivingsService;
