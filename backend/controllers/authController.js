const bcrypt = require('bcrypt');
const pool = require('../database/db'); // your DB connection

// Register user
async function registerUser(req, res) {
  try {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
      return res.status(400).json({ error: "All fields are required." });
  }

    // Check if user already exists
    const userCheck = await pool.query("SELECT * FROM usercredentials WHERE email = $1", [email]);
    if (userCheck.rows.length > 0) {
      return res.status(409).json({ error: "User already exists" });
  }

    // Hash password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user and get new id
    const insertUserResult = await pool.query(
      "INSERT INTO usercredentials (email, password_hash, role) VALUES ($1, $2, $3) RETURNING id",
      [email, hashedPassword, role]
    );

    const newUserId = insertUserResult.rows[0].id;

    // Create empty profile for new user
    await pool.query("INSERT INTO userprofile (user_id) VALUES ($1)", [newUserId]);

    res.status(201).json({ message: "User registered", userId: newUserId });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ error: "Server error" });
  }
}

// Login user
async function loginUser(req, res) {
  try {
  const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Find user by email
    const userResult = await pool.query("SELECT * FROM usercredentials WHERE email = $1", [email]);

    if (userResult.rows.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const user = userResult.rows[0];

    // Compare password hashes correctly
    const passwordMatch = await bcrypt.compare(password, user.password_hash);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
  }

    // Successful login
    res.json({ message: "Login successful", role: user.role, userId: user.id });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error" });
  }
}

module.exports = {
  registerUser,
  loginUser,
};
