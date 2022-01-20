/* eslint-disable no-underscore-dangle */
const pool = require('../../utils/connection_pool');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const {mapPackingToModel} = require('../../utils/mapping_table');

class PackingsService {
  constructor() {
    this._pool = pool;
  }

  async addPacking({ caseNumber, grade, size, prodDate, weight, pcs, shipNo }) {
    await this.verifyNewPackingCaseNumber(caseNumber);

    const [result] = await this._pool.query('INSERT INTO tbpacking (casenumber, grade, size, dateprod, weight, pcs, shipno) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [ caseNumber, grade, size, prodDate, weight, pcs, shipNo ]);
    
    if (!result) {
      throw new InvariantError('Failed to save new Packing');
    }
    return result.insertId;
  }

  async verifyNewPackingCaseNumber(caseNumber) {

    const [rows] = await this._pool.query('SELECT casenumber FROM tbpacking WHERE casenumber = ?', [caseNumber]);
    
    if(rows.length > 0) {
      throw new InvariantError(`Failed to add Packing. Packing with Case Number ${caseNumber} already exist.`)
    };
  }

  async editPackingById(id, { caseNumber, grade, size, prodDate, weight, pcs, shipNo }) {

    const [result] = await this._pool.query('UPDATE tbpacking SET casenumber = ?, grade = ?, size = ?, dateprod = ?, weight = ?, pcs = ?, shipno = ? WHERE id = ?',
    [caseNumber, grade, size, prodDate, weight, pcs, shipNo, id]);

    if (result.affectedRows === 0) {
      throw new InvariantError('Failed to update Packing. ID not found.');
    }
    return result.insertId;
  }

  async deletePackingById(id) {

    const [result] = await this._pool.query('DELETE FROM tbpacking WHERE id = ?',
    [id]);

    if (result.affectedRows === 0) {
      throw new InvariantError('Failed to delete Packing. ID not found.');
    }
    return result.insertId;
  }

  async getPackings() {
    const [result] = await this._pool.query('SELECT id, casenumber, grade, size, dateprod, weight, pcs, shipno FROM tbpacking');
    return result.map(mapPackingToModel);
  }

  async getPackingById(id) {
    const [result] = await this._pool.query('SELECT id, casenumber, grade, size, dateprod, weight, pcs, shipno FROM tbpacking WHERE id = ?', [id]);

    if (result.length === 0) {
      throw new NotFoundError('Packing not found');
    }

    return result.map(mapPackingToModel)[0];
  }

  async getPackingsByCaseNumber(caseNumber) {

    const [result] = await this._pool.query('SELECT id, casenumber, grade, size, dateprod, weight, pcs, shipno FROM tbpacking WHERE casenumber = ?', [caseNumber]);
    //const mappedResult = result.map(mapPackingToModel);
    
    return result.map(mapPackingToModel);
  }
}

module.exports = PackingsService;
