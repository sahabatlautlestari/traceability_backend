const mysql = require('mysql2/promise');

// create the connection pool.
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

pool.getConnection((err, connection) => {
  if(err)
    throw err;
  console.log('Database connected successfully');
  connection.release();
});

module.exports = pool;
