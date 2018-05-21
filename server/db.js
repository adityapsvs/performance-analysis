const pgp = require('pg-promise')();

const connection = 'postgres://psvs:4503@localhost:5432/performancedb';
const db = pgp(connection);

module.exports = db;
