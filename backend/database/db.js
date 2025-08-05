
console.log("PGUSER:", process.env.PGUSER);
console.log("PGPASSWORD:", process.env.PGPASSWORD ? "*****" : undefined);
console.log("PGHOST:", process.env.PGHOST);
console.log("PGDATABASE:", process.env.PGDATABASE);

const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.DB_USER || 'myusername',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'volunteer-app',
  password: process.env.DB_PASSWORD || 'mypassword',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5433,  // Or 5432 if that's what Docker exposes
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  end: () => pool.end(),
};
