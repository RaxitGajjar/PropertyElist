import mysql from 'mysql2/promise';

export const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '', // જો XAMPP મા પાસવર્ડ હોય તો અહી લખો
  database: 'propertyelist',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});