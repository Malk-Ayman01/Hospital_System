const mysql = require('mysql2/promise');
const config = require('./index');

const pool = config.databaseUrl ? mysql.createPool(config.databaseUrl) : null;

async function query(sql, params = []) {
  if (!pool) throw new Error('DATABASE_URL is not set');
  const [rows] = await pool.execute(sql, params);
  return rows;
}

module.exports = { pool, query };