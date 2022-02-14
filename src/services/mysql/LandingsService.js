/* eslint-disable no-underscore-dangle */
const pool = require('../../utils/connection_pool');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const {mapLandingToModel} = require('../../utils/mapping_table');

class LandingsService {
  constructor() {
    this._pool = pool;
  }

  async addLanding({ catchId, fishId,portCode, datetime, supplierCode, weight, fishLength }) {
    await this.verifyNewLandingFishId(fishId);

    const [result] = await this._pool.query('INSERT INTO tblanding (catchid, idfish, portid, ldatetime, supplierid, weight, fishlength) VALUES (?, ?, ?, ?, ?, ?)',
    [ catchId, fishId,portCode, datetime, supplierCode, weight, fishLength ]);
    
    if (!result) {
      throw new InvariantError('Failed to save new Landing');
    }
    return result.insertId;
  }

  async verifyNewLandingFishId(fishId) {

    const [rows] = await this._pool.query('SELECT fishId FROM tblanding WHERE fishId = ?', [fishId]);
    
    if(rows.length > 0) {
      throw new InvariantError(`Failed to add Landing. Landing with Fish ID ${fishId} already exist.`)
    };
  }

  async editLandingById(id, { catchId, fishId,portCode, datetime, supplierCode, weight, fishLength }) {

    const [result] = await this._pool.query('UPDATE tblanding SET idfish = ?, portid = ?, ldatetime = ?, supplierid = ?, weight = ?, fishlength = ? WHERE id = ?',
    [catchId, fishId,portCode, datetime, supplierCode, weight, fishLength, id]);

    if (result.affectedRows === 0) {
      throw new InvariantError('Failed to update Landing. ID not found.');
    }
    return result.insertId;
  }

  async deleteLandingById(id) {

    const [result] = await this._pool.query('DELETE FROM tblanding WHERE id = ?',
    [id]);

    if (result.affectedRows === 0) {
      throw new InvariantError('Failed to delete Landing. ID not found.');
    }
    return result.insertId;
  }

  async getLandings() {
    const [result] = await this._pool.query('SELECT id, catchid, idfish, portid, ldatetime, supplierid, weight, fishlength FROM tblanding');
    return result.map(mapLandingToModel);
  }

  async getLandingById(id) {
    const [result] = await this._pool.query('SELECT id, catchid, idfish, portid, ldatetime, supplierid, weight, fishlength FROM tblanding WHERE id = ?', [id]);

    if (result.length === 0) {
      throw new NotFoundError('Landing not found');
    }

    return result.map(mapLandingToModel)[0];
  }

  async getLandingByFishId(fishId) {

    const [result] = await this._pool.query('SELECT id, catchid, idfish, portid, ldatetime, supplierid, weight, fishlength FROM tblanding WHERE idfish = ?', [fishId]);
    //const mappedResult = result.map(mapLandingToModel);
    
    if (result.length === 0) {
      throw new NotFoundError('Landing not found');
    }

    return result.map(mapLandingToModel)[0];
  }

  async getLandingByCatchId(catchId) {

    const [result] = await this._pool.query('SELECT id, catchid, idfish, portid, ldatetime, supplierid, weight, fishlength FROM tblanding WHERE catchid = ?', [catchId]);
    //const mappedResult = result.map(mapLandingToModel);
    
    if (result.length === 0) {
      throw new NotFoundError('Landing not found');
    }

    return result.map(mapLandingToModel)[0];
  }
}

module.exports = LandingsService;
