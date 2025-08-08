
console.log("PGUSER:", process.env.PGUSER);
console.log("PGPASSWORD:", process.env.PGPASSWORD ? "*****" : undefined);
console.log("PGHOST:", process.env.PGHOST);
console.log("PGDATABASE:", process.env.PGDATABASE);

const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.PGUSER || 'myusername',
  host: process.env.PGHOST || 'localhost',
  database: process.env.PGDATABASE || 'volunteer-app',
  password: process.env.PGPASSWORD || 'mypassword',
  port: process.env.PGPORT ? parseInt(process.env.PGPORT) : 5432,  // Or 5432 if that's what Docker exposes
});



module.exports = {
  query: (text, params) => pool.query(text, params),
  end: () => pool.end(),
};