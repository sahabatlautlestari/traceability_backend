/* eslint-disable no-underscore-dangle */
const pool = require('../../utils/connection_pool');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const {mapShippingToModel} = require('../../utils/mapping_table');

class ShippingsService {
  constructor() {
    this._pool = pool;
  }

  async addShipping({ shipNo, shipDate, buyerCode, voyageNo, containerNo }) {
    await this.verifyNewShippingNumber(shipNo);

    const [result] = await this._pool.query('INSERT INTO tbshipping (shipno, shipdate, idbuyer, voyageno, containerno) VALUES (?, ?, ?, ?, ?)',
    [ shipNo, shipDate, buyerCode, voyageNo, containerNo ]);
    
    if (!result) {
      throw new InvariantError('Failed to save new Shipping');
    }
    return result.insertId;
  }

  async verifyNewShippingNumber(shipNo) {

    const [rows] = await this._pool.query('SELECT shipno FROM tbshipping WHERE shipno = ?', [shipNo]);
    
    if(rows.length > 0) {
      throw new InvariantError(`Failed to add Shipping. Shipping with Shipping Number ${shipNo} already exist.`)
    };
  }

  async editShippingById(id, { shipNo, shipDate, buyerCode, voyageNo, containerNo }) {

    const [result] = await this._pool.query('UPDATE tbshipping SET shipno = ?, shipdate = ?, idbuyer = ?, voyageno = ?, containerno = ? WHERE id = ?',
    [shipNo, shipDate, buyerCode, voyageNo, containerNo, id]);

    if (result.affectedRows === 0) {
      throw new InvariantError('Failed to update Shipping. ID not found.');
    }
    return result.insertId;
  }

  async deleteShippingById(id) {

    const [result] = await this._pool.query('DELETE FROM tbshipping WHERE id = ?',
    [id]);

    if (result.affectedRows === 0) {
      throw new InvariantError('Failed to delete Shipping. ID not found.');
    }
    return result.insertId;
  }

  async getShippings() {
    const [result] = await this._pool.query('SELECT id, shipno, shipdate, idbuyer, voyageno, containerno FROM tbshipping');
    return result.map(mapShippingToModel);
  }

  async getShippingById(id) {
    const [result] = await this._pool.query('SELECT id, shipno, shipdate, idbuyer, voyageno, containerno FROM tbshipping WHERE id = ?', [id]);

    if (result.length === 0) {
      throw new NotFoundError('Shipping not found');
    }

    return result.map(mapShippingToModel)[0];
  }

  async getShippingByShipNo(shipNo) {

    const [result] = await this._pool.query('SELECT id, shipno, shipdate, idbuyer, voyageno, containerno FROM tbshipping WHERE shipno = ?', [shipNo]);

    if (result.length === 0) {
      throw new NotFoundError('Shipping not found');
    }
    
    return result.map(mapShippingToModel)[0];
  }
}

module.exports = ShippingsService;
