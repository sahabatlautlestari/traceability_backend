/* eslint-disable no-underscore-dangle */
const pool = require('../../utils/connection_pool');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const {mapPortToModel} = require('../../utils/mapping_table');

class PortsService {
  constructor() {
    this._pool = pool;
  }

  async addPort({ portCode, portName, location }) {
    await this.verifyNewPortCode(portCode);

    const [result] = await this._pool.query('INSERT INTO mports (portid, portname, plocation) VALUES (?, ?, GeomFromText(?))',
    [portCode, portName, `POINT(${location.latitude} ${location.longitude})`]);
    
    if (!result) {
      throw new InvariantError('Failed to save new Port');
    }
    return result.insertId;
  }

  async verifyNewPortCode(portCode) {

    const [rows] = await this._pool.query('SELECT portid FROM mports WHERE portid = ?', [portCode]);
    
    if(rows.length > 0) {
      throw new InvariantError('Failed to add Port. Port Code already used.')
    };
  }

  async editPortById(id, {portCode, portName, location }) {

    const [result] = await this._pool.query('UPDATE mports SET portid = ?, portname = ?, plocation = GeomFromText(?) WHERE id = ?',
    [portCode, portName, `POINT(${location.latitude} ${location.longitude})`, id]);

    if (result.affectedRows === 0) {
      throw new InvariantError('Failed to update Port. ID not found.');
    }
    return result.insertId;
  }

  async deletePortById(id) {

    const [result] = await this._pool.query('DELETE FROM mports WHERE id = ?',
    [id]);

    if (result.affectedRows === 0) {
      throw new InvariantError('Failed to delete Port. ID not found.');
    }
    return result.insertId;
  }

  async getPorts() {
    const [result] = await this._pool.query('SELECT id, portid, portname, plocation FROM mports');
    return result.map(mapPortToModel);
  }

  async getPortById(id) {
    const [result] = await this._pool.query('SELECT id, portid, portname, plocation FROM mports WHERE id = ?', [id]);

    if (result.length === 0) {
      throw new NotFoundError('Port not found');
    }

    return result.map(mapPortToModel)[0];
  }

  async getPortsByPortCode(portCode) {
    const [result] = await this._pool.query('SELECT id, portid, portname, plocation FROM mports WHERE portid LIKE ?', [`%${portCode}%`]);
    return result.map(mapPortToModel);
  }
}

module.exports = PortsService;
