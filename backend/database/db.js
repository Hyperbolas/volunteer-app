console.log("PGUSER:", process.env.PGUSER);
console.log("PGPASSWORD:", process.env.PGPASSWORD ? "*****" : undefined);
console.log("PGHOST:", process.env.PGHOST);
console.log("PGDATABASE:", process.env.PGDATABASE);

const { Pool } = require("pg");

// Use PG* variables from Docker or fallback for local dev
const pool = new Pool({
  user: process.env.PGUSER || 'myusername',
  host: process.env.PGHOST || 'db',
  database: process.env.PGDATABASE || 'volunteer-app',
  password: process.env.PGPASSWORD || 'mypassword',
  port: process.env.PGPORT ? parseInt(process.env.PGPORT) : 5432,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  end: () => pool.end(),
};
