/* eslint-disable no-underscore-dangle */
const pool = require('../../utils/connection_pool');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const {mapFishingGearToModel} = require('../../utils/mapping_table');

class FishingGearsService {
  constructor() {
    this._pool = pool;
  }

  async addFishingGear({ fishingGearCode, fishingGearName }) {
    await this.verifyNewFishingGearCode(idfishinggear);

    const [result] = await this._pool.query('INSERT INTO mfishinggear (idfishinggear, fishinggear) VALUES (?, ?)',
    [ fishingGearCode, fishingGearName ]);
    
    if (!result) {
      throw new InvariantError('Failed to save new Fishing Gear');
    }
    return result.insertId;
  }

  async verifyNewFishingGearCode(fishingGearCode) {

    const [rows] = await this._pool.query('SELECT idfishinggear FROM mfishinggear WHERE idfishinggear = ?', [fishingGearCode]);
    
    if(rows.length > 0) {
      throw new InvariantError('Failed to add Fishing Gear. Fishing Gear ID already used.')
    };
  }

  async editFishingGearById(id, { fishingGearCode, fishingGearName }) {

    const [result] = await this._pool.query('UPDATE mfishinggear SET idfishinggear = ?, fishinggear = ? WHERE id = ?',
    [fishingGearCode, fishingGearName, id]);

    if (result.affectedRows === 0) {
      throw new InvariantError('Failed to update FishingGear. ID not found.');
    }
    return result.insertId;
  }

  async deleteFishingGearById(id) {

    const [result] = await this._pool.query('DELETE FROM mfishinggear WHERE id = ?',
    [id]);

    if (result.affectedRows === 0) {
      throw new InvariantError('Failed to delete Fishing Gear. ID not found.');
    }
    return result.insertId;
  }

  async getFishingGears() {
    const [result] = await this._pool.query('SELECT id, idfishinggear, fishinggear FROM mfishinggear');
    return result.map(mapFishingGearToModel);
  }

  async getFishingGearById(id) {
    const [result] = await this._pool.query('SELECT id, idfishinggear, fishinggear FROM mfishinggear WHERE id = ?', [id]);

    if (result.length === 0) {
      throw new NotFoundError('Fishing Gear not found');
    }

    return result.map(mapFishingGearToModel)[0];
  }

  async getFishingGearsByFishingGearCode(idfishinggear) {

    const [result] = await this._pool.query('SELECT id, idfishinggear, fishinggear FROM mfishinggear WHERE idfishinggear LIKE ?', [`%${idfishinggear}%`]);
    //const mappedResult = result.map(mapFishingGearToModel);
    
    return result.map(mapFishingGearToModel);
  }
}

module.exports = FishingGearsService;
