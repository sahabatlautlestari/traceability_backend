/* eslint-disable no-underscore-dangle */
const pool = require('../../utils/connection_pool');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const {mapBuyerToModel} = require('../../utils/mapping_table');

class BuyersService {
  constructor() {
    this._pool = pool;
  }

  async addBuyer({ idbuyer, buyername, location }) {
    await this.verifyNewBuyerId(idbuyer);

    const [result] = await this._pool.query('INSERT INTO mbuyer (idbuyer, buyername, location) VALUES (?, ?, GeomFromText(?))',
    [idbuyer, buyername, `POINT(${location.x} ${location.y})`]);
    
    if (!result) {
      throw new InvariantError('Failed to save new buyer');
    }
    return result.insertId;
  }

  async verifyNewBuyerId(idbuyer) {

    const [rows] = await this._pool.query('SELECT idbuyer FROM mbuyer WHERE idbuyer = ?', [idbuyer]);
    
    if(rows.length > 0) {
      throw new InvariantError('Failed to add buyer. Buyer ID already used.')
    };
  }

  async editBuyerById(id, {idbuyer, buyername, location }) {

    const [result] = await this._pool.query('UPDATE mbuyer SET idbuyer = ?, buyername = ?, location = GeomFromText(?) WHERE id = ?',
    [idbuyer, buyername, `POINT(${location.x} ${location.y})`, id]);

    if (result.affectedRows === 0) {
      throw new InvariantError('Failed to update buyer. ID not found.');
    }
    return result.insertId;
  }

  async deleteBuyerById(id) {

    const [result] = await this._pool.query('DELETE FROM mbuyer WHERE id = ?',
    [id]);

    if (result.affectedRows === 0) {
      throw new InvariantError('Failed to delete buyer. ID not found.');
    }
    return result.insertId;
  }

  async getBuyers() {
    const [result] = await this._pool.query('SELECT id, idbuyer, buyername, location FROM mbuyer');
    return result[0].map(mapBuyerToModel);
  }

  async getBuyerById(id) {
    const [result] = await this._pool.query('SELECT id, idbuyer, buyername, location FROM mbuyer WHERE id = ?', [id]);

    if (result.length === 0) {
      throw new NotFoundError('Buyer not found');
    }

    return result.map(mapBuyerToModel)[0];
  }

  async getBuyersByBuyerId(buyerId) {

    const [result] = await this._pool.query('SELECT id, idbuyer, buyername, location FROM mbuyer WHERE idbuyer LIKE ?', [`%${buyerId}%`]);
    //const mappedResult = result.map(mapBuyerToModel);
    
    return result.map(mapBuyerToModel);
  }
}

module.exports = BuyersService;
