/* eslint-disable no-underscore-dangle */
const pool = require('../../utils/connection_pool');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const {mapCatchFishToModel} = require('../../utils/mapping_table');

class CatchFishService {
  constructor() {
    this._pool = pool;
  }

  async addCatchFish({ catchId, location, datetime, vesselCode, fishingGearCode, speciesCode  }) {
    await this.verifyNewCatchCode(catchId);

    const [result] = await this._pool.query('INSERT INTO tbcatchfish (catchid, clocation, cdatetime, vesselid, idfishinggear, idspecies) VALUES (?, GeomFromText(?), ?, ?, ?, ?)',
    [ catchId, `POINT(${location.latitude} ${location.longitude})`, datetime, vesselCode, fishingGearCode, speciesCode ]);
    
    if (!result) {
      throw new InvariantError('Failed to save new CatchFish');
    }
    return result.insertId;
  }

  async verifyNewCatchCode(catchId) {

    const [rows] = await this._pool.query('SELECT catchid FROM tbcatchfish WHERE catchid = ?', [catchId]);
    
    if(rows.length > 0) {
      throw new InvariantError('Failed to add Catch Fish data. Fish Code already used.')
    };
  }

  async editCatchFishById(id, { catchId, location, datetime, vesselCode, fishingGearCode, speciesCode  }) {

    const [result] = await this._pool.query('UPDATE tbcatchfish SET catchid = ?, clocation = GeomFromText(?), cdatetime = ?, vesselid = ?, idfishinggear = ?, idspecies = ? WHERE id = ?',
    [catchId, `POINT(${location.latitude} ${location.longitude})`, datetime, vesselCode, fishingGearCode, speciesCode , id]);

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
    const [result] = await this._pool.query('SELECT id, catchid, clocation, cdatetime, vesselid, idfishinggear, idspecies FROM tbcatchfish');
    return result.map(mapCatchFishToModel);
  }

  async getCatchFishById(id) {
    const [result] = await this._pool.query('SELECT id, catchid, clocation, cdatetime, vesselid, idfishinggear, idspecies FROM tbcatchfish WHERE id = ?', [id]);

    if (result.length === 0) {
      throw new NotFoundError('Catch Fish not found');
    }

    return result.map(mapCatchFishToModel)[0];
  }

  async getCatchFishBycatchId(catchId) {

    const [result] = await this._pool.query('SELECT id, catchid, clocation, cdatetime, vesselid, idfishinggear, idspecies FROM tbcatchfish WHERE catchid = ?', [catchId]);
    
    if (result.length === 0) {
      throw new NotFoundError('Catch Fish not found');
    }

    return result.map(mapCatchFishToModel)[0];
  }
}

module.exports = CatchFishService;
