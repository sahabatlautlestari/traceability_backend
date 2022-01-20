/* eslint-disable no-underscore-dangle */
const pool = require('../../utils/connection_pool');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const {mapCuttingToModel} = require('../../utils/mapping_table');

class CuttingsService {
  constructor() {
    this._pool = pool;
  }

  async addCutting({ fishId, loinId, weight, cutDate, grade, caseNumber }) {
    await this.verifyNewCuttingFishAndLoin(fishId, loinId);

    const [result] = await this._pool.query('INSERT INTO tbcutting (idfish, idloin, weight, cutdate, grade, casenumber) VALUES (?, ?, ?, ?, ?, ?)',
    [ fishId, loinId, weight, cutDate, grade, caseNumber ]);
    
    if (!result) {
      throw new InvariantError('Failed to save new Cutting');
    }
    return result.insertId;
  }

  async verifyNewCuttingFishAndLoin(fishId, loinId) {

    const [rows] = await this._pool.query('SELECT fishId, loinId FROM tbcutting WHERE fishId = ? AND loinId = ?', [fishId, loinId]);
    
    if(rows.length > 0) {
      throw new InvariantError(`Failed to add Cutting. Cutting with Fish ID ${fishId} and Loin ID ${loinId} already exist.`)
    };
  }

  async editCuttingById(id, { fishId, loinId, weight, cutDate, grade, caseNumber }) {

    const [result] = await this._pool.query('UPDATE tbcutting SET idfish = ?, idloin = ?, weight = ?, cutdate = ?, grade = ?, casenumber = ? WHERE id = ?',
    [fishId, loinId, weight, cutDate, grade, caseNumber, id]);

    if (result.affectedRows === 0) {
      throw new InvariantError('Failed to update Cutting. ID not found.');
    }
    return result.insertId;
  }

  async deleteCuttingById(id) {

    const [result] = await this._pool.query('DELETE FROM tbcutting WHERE id = ?',
    [id]);

    if (result.affectedRows === 0) {
      throw new InvariantError('Failed to delete Cutting. ID not found.');
    }
    return result.insertId;
  }

  async getCuttings() {
    const [result] = await this._pool.query('SELECT id, idfish, idloin, weight, cutdate, grade, casenumber FROM tbcutting');
    return result.map(mapCuttingToModel);
  }

  async getCuttingById(id) {
    const [result] = await this._pool.query('SELECT id, idfish, idloin, weight, cutdate, grade, casenumber FROM tbcutting WHERE id = ?', [id]);

    if (result.length === 0) {
      throw new NotFoundError('Cutting not found');
    }

    return result.map(mapCuttingToModel)[0];
  }

  async getCuttingsByFishId(fishId) {

    const [result] = await this._pool.query('SELECT id, idfish, idloin, weight, cutdate, grade, casenumber FROM tbcutting WHERE idfish = ?', [fishId]);
    //const mappedResult = result.map(mapCuttingToModel);
    
    return result.map(mapCuttingToModel);
  }
}

module.exports = CuttingsService;
