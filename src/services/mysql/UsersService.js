/* eslint-disable no-underscore-dangle */
const pool = require('../../utils/connection_pool');
const bcrypt = require('bcrypt');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const AuthenticationError = require('../../exceptions/AuthenticationError');

class UsersService {
  constructor() {
    this._pool = pool;
  }

  async addUser({ username, email, password, fullname }) {
    await this.verifyNewUsername(username);
    
    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await this._pool.query('INSERT INTO tbuser (username, email, fullname, password) VALUES (?, ?, ?, ?)',
    [username, email, fullname, hashedPassword]);
    
    if (!result) {
      throw new InvariantError('User gagal ditambahkan');
    }
    return result.insertId;
  }

  async verifyNewUsername(username) {

    const [rows] = await this._pool.query('SELECT username FROM tbuser WHERE username = ?', [username]);
    
    if(rows.length > 0) {
      throw new InvariantError('Gagal menambahkan user. Username sudah digunakan.')
    };
  }

  async getUserById(userId) {
    const [result] = await this._pool.query('SELECT id, username, email, fullname FROM tbuser WHERE id = ?', [userId]);

    if (result.length === 0) {
      throw new NotFoundError('User tidak ditemukan');
    }

    return result[0];
  }

  async verifyUserCredential(username, password) {

    const [result] = await this._pool.query('SELECT id, password FROM tbuser WHERE username = ?', [username]);

    if (result.length === 0) {
      throw new AuthenticationError('Kredensial yang Anda berikan salah');
    }

    const { id, password: hashedPassword } = result[0];

    const match = await bcrypt.compare(password, hashedPassword);

    if (!match) {
      throw new AuthenticationError('Kredensial yang Anda berikan salah');
    }

    return id;
  }

  async getUsersByUsername(username) {

    const [result] = await this._pool.query('SELECT id, username, email, fullname FROM tbuser WHERE username LIKE ?', [`%${username}%`]);
    return result;
  }
}

module.exports = UsersService;
