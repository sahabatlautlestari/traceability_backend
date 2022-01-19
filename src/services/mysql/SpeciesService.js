/* eslint-disable no-underscore-dangle */
const pool = require('../../utils/connection_pool');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const {mapSpeciesToModel} = require('../../utils/mapping_table');

class SpeciesService {
  constructor() {
    this._pool = pool;
  }

  async addSpecies({ speciesCode, speciesName }) {
    await this.verifyNewspeciesCode(speciesCode);

    const [result] = await this._pool.query('INSERT INTO mspecies (idspecies, species) VALUES (?, ?)',
    [ speciesCode, speciesName ]);
    
    if (!result) {
      throw new InvariantError('Failed to save new Species');
    }
    return result.insertId;
  }

  async verifyNewspeciesCode(speciesCode) {

    const [rows] = await this._pool.query('SELECT idspecies FROM mspecies WHERE idspecies = ?', [speciesCode]);
    
    if(rows.length > 0) {
      throw new InvariantError('Failed to add Species. Species Code already used.')
    };
  }

  async editSpeciesById(id, { speciesCode, speciesName }) {

    const [result] = await this._pool.query('UPDATE mspecies SET idspecies = ?, species = ? WHERE id = ?',
    [speciesCode, speciesName, id]);

    if (result.affectedRows === 0) {
      throw new InvariantError('Failed to update Species. ID not found.');
    }
    return result.insertId;
  }

  async deleteSpeciesById(id) {

    const [result] = await this._pool.query('DELETE FROM mspecies WHERE id = ?',
    [id]);

    if (result.affectedRows === 0) {
      throw new InvariantError('Failed to delete Species. ID not found.');
    }
    return result.insertId;
  }

  async getSpecies() {
    const [result] = await this._pool.query('SELECT id, idspecies, species FROM mspecies');
    return result.map(mapSpeciesToModel);
  }

  async getSpeciesById(id) {
    const [result] = await this._pool.query('SELECT id, idspecies, species FROM mspecies WHERE id = ?', [id]);

    if (result.length === 0) {
      throw new NotFoundError('Species not found');
    }

    return result.map(mapSpeciesToModel)[0];
  }

  async getSpeciesByspeciesCode(speciesCode) {

    const [result] = await this._pool.query('SELECT id, idspecies, species FROM mspecies WHERE idspecies LIKE ?', [`%${speciesCode}%`]);
    return result.map(mapSpeciesToModel);
  }
}

module.exports = SpeciesService;
