const { Pool } = require('pg');

const pool = new Pool({
<<<<<<< HEAD
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432,
=======
  user: process.env.DB_USER || 'myusername',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'volunteer-app',
  password: process.env.DB_PASSWORD || 'mypassword',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5433,  // Or 5432 if that's what Docker exposes
>>>>>>> 3d604f4bb02febb830296c5f5b5f96932f4ca341
});

module.exports = {
  query: (text, params) => pool.query(text, params),
<<<<<<< HEAD
};
=======
  end: () => pool.end(),
};
>>>>>>> 3d604f4bb02febb830296c5f5b5f96932f4ca341
