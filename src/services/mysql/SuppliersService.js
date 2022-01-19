/* eslint-disable no-underscore-dangle */
const pool = require('../../utils/connection_pool');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const {mapSupplierToModel} = require('../../utils/mapping_table');

class SuppliersService {
  constructor() {
    this._pool = pool;
  }

  async addSupplier({ supplierCode, supplierName }) {
    await this.verifyNewSupplierCode(supplierCode);

    const [result] = await this._pool.query('INSERT INTO msupplier (supplierid, suppliername) VALUES (?, ?)',
    [ supplierCode, supplierName ]);
    
    if (!result) {
      throw new InvariantError('Failed to save new Supplier');
    }
    return result.insertId;
  }

  async verifyNewSupplierCode(supplierCode) {

    const [rows] = await this._pool.query('SELECT supplierid FROM msupplier WHERE supplierid = ?', [supplierCode]);
    
    if(rows.length > 0) {
      throw new InvariantError('Failed to add Supplier. Supplier Code already used.')
    };
  }

  async editSupplierById(id, { supplierCode, supplierName }) {

    const [result] = await this._pool.query('UPDATE msupplier SET supplierid = ?, suppliername  = ? WHERE id = ?',
    [supplierCode, supplierName, id]);

    if (result.affectedRows === 0) {
      throw new InvariantError('Failed to update Supplier. ID not found.');
    }
    return result.insertId;
  }

  async deleteSupplierById(id) {

    const [result] = await this._pool.query('DELETE FROM msupplier WHERE id = ?',
    [id]);

    if (result.affectedRows === 0) {
      throw new InvariantError('Failed to delete Supplier. ID not found.');
    }
    return result.insertId;
  }

  async getSuppliers() {
    const [result] = await this._pool.query('SELECT id, supplierid, suppliername FROM msupplier');
    return result.map(mapSupplierToModel);
  }

  async getSupplierById(id) {
    const [result] = await this._pool.query('SELECT id, supplierid, suppliername FROM msupplier WHERE id = ?', [id]);

    if (result.length === 0) {
      throw new NotFoundError('Supplier not found');
    }

    return result.map(mapSupplierToModel)[0];
  }

  async getSuppliersBySupplierCode(supplierCode) {

    const [result] = await this._pool.query('SELECT id, supplierid, suppliername FROM msupplier WHERE supplierid LIKE ?', [`%${supplierCode}%`]);
    //const mappedResult = result.map(mapSupplierToModel);
    
    return result.map(mapSupplierToModel);
  }
}

module.exports = SuppliersService;
