/* eslint-disable no-underscore-dangle */
const pool = require('../../utils/connection_pool');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const {mapVesselToModel} = require('../../utils/mapping_table');

class VesselsService {
  constructor() {
    this._pool = pool;
  }

  async addVessel({ vesselCode, vesselName, vesselSize, fisherman }) {
    await this.verifyNewVesselCode(vesselCode);

    const [result] = await this._pool.query('INSERT INTO mvessel (vesselid, vesselname, vesselsize, fisherman) VALUES (?, ?, ?, ?)',
    [ vesselCode, vesselName, vesselSize, fisherman ]);
    
    if (!result) {
      throw new InvariantError('Failed to save new Vessel');
    }
    return result.insertId;
  }

  async verifyNewVesselCode(vesselCode) {

    const [rows] = await this._pool.query('SELECT vesselid FROM mvessel WHERE vesselid = ?', [vesselCode]);
    
    if(rows.length > 0) {
      throw new InvariantError('Failed to add Vessel. Vessel Code already used.')
    };
  }

  async editVesselById(id, { vesselCode, vesselName, vesselSize, fisherman }) {

    const [result] = await this._pool.query('UPDATE mvessel SET vesselid = ?, vesselname  = ?, vesselsize = ?, fisherman = ? WHERE id = ?',
    [vesselCode, vesselName, vesselSize, fisherman, id]);

    if (result.affectedRows === 0) {
      throw new InvariantError('Failed to update Vessel. ID not found.');
    }
    return result.insertId;
  }

  async deleteVesselById(id) {

    const [result] = await this._pool.query('DELETE FROM mvessel WHERE id = ?',
    [id]);

    if (result.affectedRows === 0) {
      throw new InvariantError('Failed to delete Vessel. ID not found.');
    }
    return result.insertId;
  }

  async getVessels() {
    const [result] = await this._pool.query('SELECT id, vesselid, vesselname, vesselsize, fisherman FROM mvessel');
    return result.map(mapVesselToModel);
  }

  async getVesselById(id) {
    const [result] = await this._pool.query('SELECT id, vesselid, vesselname, vesselsize, fisherman FROM mvessel WHERE id = ?', [id]);

    if (result.length === 0) {
      throw new NotFoundError('Vessel not found');
    }

    return result.map(mapVesselToModel)[0];
  }

  async getVesselsByVesselCode(vesselCode) {

    const [result] = await this._pool.query('SELECT id, vesselid, vesselname, vesselsize, fisherman FROM mvessel WHERE vesselid LIKE ?', [`%${vesselCode}%`]);
    //const mappedResult = result.map(mapVesselToModel);
    
    return result.map(mapVesselToModel);
  }
}

module.exports = VesselsService;
