/* eslint-disable no-underscore-dangle */
const pool = require('../../utils/connection_pool');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const {mapCompanyToModel} = require('../../utils/mapping_table');

class CompaniesService {
  constructor() {
    this._pool = pool;
  }

  async addCompany({ companyCode, companyName, location }) {
    await this.verifyNewCompanyCode(companyCode);

    const [result] = await this._pool.query('INSERT INTO mcompany (companyid, companyname, location) VALUES (?, ?, GeomFromText(?))',
    [companyCode, companyName, `POINT(${location.latitude} ${location.longitude})`]);
    
    if (!result) {
      throw new InvariantError('Failed to save new Company');
    }
    return result.insertId;
  }

  async verifyNewCompanyCode(companyCode) {

    const [rows] = await this._pool.query('SELECT companyid FROM mcompany WHERE companyid = ?', [companyCode]);
    
    if(rows.length > 0) {
      throw new InvariantError('Failed to add Company. Company Code already used.')
    };
  }

  async editCompanyById(id, {companyCode, companyName, location }) {

    const [result] = await this._pool.query('UPDATE mcompany SET companyid = ?, companyname = ?, location = GeomFromText(?) WHERE id = ?',
    [companyCode, companyName, `POINT(${location.latitude} ${location.longitude})`, id]);

    if (result.affectedRows === 0) {
      throw new InvariantError('Failed to update Company. ID not found.');
    }
    return result.insertId;
  }

  async deleteCompanyById(id) {

    const [result] = await this._pool.query('DELETE FROM mcompany WHERE id = ?',
    [id]);

    if (result.affectedRows === 0) {
      throw new InvariantError('Failed to delete Company. ID not found.');
    }
    return result.insertId;
  }

  async getCompanies() {
    const [result] = await this._pool.query('SELECT id, companyid, companyname, location FROM mcompany');
    return result.map(mapCompanyToModel);
  }

  async getCompanyById(id) {
    const [result] = await this._pool.query('SELECT id, companyid, companyname, location FROM mcompany WHERE id = ?', [id]);

    if (result.length === 0) {
      throw new NotFoundError('Company not found');
    }

    return result.map(mapCompanyToModel)[0];
  }

  async getCompanyByCompanyCode(companyCode) {

    const [result] = await this._pool.query('SELECT id, companyid, companyname, location FROM mcompany WHERE companyid = ?', [companyCode]);
    
    if (result.length === 0) {
      throw new NotFoundError('Company not found');
    }
    
    return result.map(mapCompanyToModel)[0];
  }
}

module.exports = CompaniesService;
