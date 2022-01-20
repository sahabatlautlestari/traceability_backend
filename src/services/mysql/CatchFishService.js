/* eslint-disable no-underscore-dangle */
const pool = require('../../utils/connection_pool');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const {mapCatchFishToModel} = require('../../utils/mapping_table');

class CatchFishService {
  constructor() {
    this._pool = pool;
  }

  async addCatchFish({ fishId, location, datetime, vesselCode, fishingGearCode, speciesCode  }) {
    await this.verifyNewcatchFishCode(fishId);

    const [result] = await this._pool.query('INSERT INTO tbcatchfish (idfish, clocation, cdatetime, vesselid, idfishinggear, idspecies) VALUES (?, ?, ?, ?)',
    [ fishId, location, datetime, vesselCode, fishingGearCode, speciesCode ]);
    
    if (!result) {
      throw new InvariantError('Failed to save new CatchFish');
    }
    return result.insertId;
  }

  async verifyNewcatchFishCode(fishId) {

    const [rows] = await this._pool.query('SELECT idfish FROM tbcatchfish WHERE idfish = ?', [fishId]);
    
    if(rows.length > 0) {
      throw new InvariantError('Failed to add Catch Fish data. Fish Code already used.')
    };
  }

  async editCatchFishById(id, { fishId, location, datetime, vesselCode, fishingGearCode, speciesCode  }) {

    const [result] = await this._pool.query('UPDATE tbcatchfish SET idfish = ?, CatchFishname  = ?, CatchFishize = ?, fisherman = ? WHERE id = ?',
    [fishId, location, datetime, vesselCode, fishingGearCode, speciesCode , id]);

    if (result.affectedRows === 0) {
      throw new InvariantError('Failed to update Catch Fish data. ID not found.');
    }
    return result.insertId;
  }

  async deleteCatchFishById(id) {

    const [result] = await this._pool.query('DELETE FROM tbcatchfish WHERE id = ?',
    [id]);

    if (result.affectedRows === 0) {
      throw new InvariantError('Failed to delete Catch Fish data. ID not found.');
    }
    return result.insertId;
  }

  async getCatchFish() {
    const [result] = await this._pool.query('SELECT id, idfish, clocation, cdatetime, vesselid, idfishinggear, idspecies FROM tbcatchfish');
    return result.map(mapCatchFishToModel);
  }

  async getCatchFishById(id) {
    const [result] = await this._pool.query('SELECT id, idfish, clocation, cdatetime, vesselid, idfishinggear, idspecies FROM tbcatchfish WHERE id = ?', [id]);

    if (result.length === 0) {
      throw new NotFoundError('Catch Fish not found');
    }

    return result.map(mapCatchFishToModel)[0];
  }

  async getCatchFishByFishId(fishId) {

    const [result] = await this._pool.query('SELECT id, idfish, clocation, cdatetime, vesselid, idfishinggear, idspecies FROM tbcatchfish WHERE idfish = ?', [fishId]);
    
    if (result.length === 0) {
      throw new NotFoundError('Catch Fish not found');
    }

    return result.map(mapCatchFishToModel)[0];
  }
}

module.exports = CatchFishService;
