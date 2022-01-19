/* eslint-disable no-underscore-dangle */
const pool = require('../../utils/connection_pool');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const {mapSpottraceToModel} = require('../../utils/mapping_table');

class SpottracesService {
  constructor() {
    this._pool = pool;
  }

  async addSpottrace({ spotId, unixTime, esn, latitude, longitude, datetime, time, batteryState, messageType, messageContent, location, localDate, localTime  }) {
    await this.verifyNewSpottraceId(SpottraceId);

    const [result] = await this._pool.query('INSERT INTO spottrace (id_spot, unixtime, esn, latitude, longitude, '
      +'datetime, time, battery_state, message_type, message_content, lokasi, local_date, local_time) VALUES '
      +'(?,?,?,?,?,?,?,?,?,?,?,?,?)',
    [spotId, unixTime, esn, latitude, longitude, datetime, time, batteryState, messageType, messageContent, location, localDate, localTime ]);
    
    if (!result) {
      throw new InvariantError('Failed to save new Spottrace');
    }
    return result.insertId;
  }

  async verifyNewSpottraceId(spotId) {

    const [rows] = await this._pool.query('SELECT id_spot FROM spottrace WHERE id_spot = ?', [spotId]);
    
    if(rows.length > 0) {
      throw new InvariantError('Failed to add Spottrace. Spottrace Code already used.')
    };
  }

  async editSpottraceById(id, {spotId, unixTime, esn, latitude, longitude, datetime, time, batteryState, messageType, messageContent, location, localDate, localTime  }) {

    const [result] = await this._pool.query('UPDATE spottrace SET id_spot = ?, unixtime = ?, esn = ?, latitude = ?, longitude = ?, datetime = ?, time = ?, battery_state = ?, message_type = ?, message_content = ?, lokasi = ?, local_date = ?, local_time = ? WHERE id = ?',
    [spotId, unixTime, esn, latitude, longitude, datetime, time, batteryState, messageType, messageContent, location, localDate, localTime , id]);

    if (result.affectedRows === 0) {
      throw new InvariantError('Failed to update Spottrace. ID not found.');
    }
    return result.insertId;
  }

  async deleteSpottraceById(id) {

    const [result] = await this._pool.query('DELETE FROM spottrace WHERE id = ?',
    [id]);

    if (result.affectedRows === 0) {
      throw new InvariantError('Failed to delete Spottrace. ID not found.');
    }
    return result.insertId;
  }

  async getSpottraces() {
    const [result] = await this._pool.query('SELECT id, id_spot, unixtime, esn, latitude, longitude, datetime, time, battery_state, message_type, message_content, lokasi, local_date, local_time FROM spottrace');
    return result.map(mapSpottraceToModel);
  }

  async getSpottraceById(id) {
    const [result] = await this._pool.query('SELECT id, id_spot, unixtime, esn, latitude, longitude, datetime, time, battery_state, message_type, message_content, lokasi, local_date, local_time FROM spottrace WHERE id = ?', [id]);

    if (result.length === 0) {
      throw new NotFoundError('Spottrace not found');
    }

    return result.map(mapSpottraceToModel)[0];
  }

  async getSpottracesBySpottraceId(spotId) {

    const [result] = await this._pool.query('SELECT id, id_spot, unixtime, esn, latitude, longitude, datetime, time, battery_state, message_type, message_content, lokasi, local_date, local_time FROM spottrace WHERE id_spot = ?', [spotId]);
    console.log(result);
    return result.map(mapSpottraceToModel);
  }
}

module.exports = SpottracesService;
