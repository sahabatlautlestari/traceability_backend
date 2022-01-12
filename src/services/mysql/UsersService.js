/* eslint-disable no-underscore-dangle */
const connection = require('../../utils/connection');
const bcrypt = require('bcrypt');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const AuthenticationError = require('../../exceptions/AuthenticationError');

class UserService {

  async add({ username, email, fullname, password }) {

    const hashedPassword = await bcrypt.hash(password, 10);

    connection.query('INSERT INTO tbuser (username, email, fullname, password) VALUES (?,?,?,?)',
      [username, email, fullname, hashedPassword],
      (error, rows, fields) => {
        if(error) {
          throw error;
        } else {
          return rows;
        }
      }
    );
  }

  async verifyNewUsername(username) {
    const result =  await connection.promise().query('SELECT username FROM tbuser WHERE username = ?',
      [username],
    );

    if (result[0].rowCount > 0) {
      throw new InvariantError('Gagal menambahkan user. Username sudah digunakan.');
    }
  }

  async getUserById(userId) {

    const result = await connection.promise().query('SELECT id, username, email, fullname FROM tbuser WHERE id = ?',
      [userId]
    );

    return result[0][0];
  }

  async verifyUserCredential(username, password) {
    const result = await connection.promise().query('SELECT id, password FROM tbuser WHERE username = $1',
      [username]
    );

    if (!result[0].rowCount) {
      throw new AuthenticationError('Kredensial yang Anda berikan salah');
    }

    const { id, password: hashedPassword } = result.rows[0];

    const match = await bcrypt.compare(password, hashedPassword);

    if (!match) {
      throw new AuthenticationError('Kredensial yang Anda berikan salah');
    }

    return id;
  }

  async getUsersByUsername(username) {
    
    const result = await connection.promise().query('SELECT id, username, email, fullname FROM tbuser WHERE username LIKE ?',
      [`%${username}%`],
    );
    return result[0];
  }
}

module.exports = UserService;
