
console.log("PGUSER:", process.env.PGUSER);
console.log("PGPASSWORD:", process.env.PGPASSWORD ? "*****" : undefined);
console.log("PGHOST:", process.env.PGHOST);
console.log("PGDATABASE:", process.env.PGDATABASE);

const { Pool } = require("pg");
require("dotenv").config();

//initialize connection pool
const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: 5432,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
