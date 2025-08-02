const db = require("../database/db");

function validateUserProfile(profile) {
  const errors = {};
  if (!profile.fullName) errors.fullName = "Full Name is required";
  if (!profile.address1) errors.address1 = "Address 1 is required";
  if (!profile.city) errors.city = "City is required";
  if (!profile.state) errors.state = "State is required";
  if (!profile.zipCode) errors.zipCode = "Zip Code is required";
  else if (String(profile.zipCode).length < 5) errors.zipCode = "Zip Code must be at least 5 characters";
  if (!Array.isArray(profile.skills) || profile.skills.length === 0) errors.skills = "Skills must be a non-empty array";
  if (!Array.isArray(profile.availability) || profile.availability.length === 0) errors.availability = "Availability must be a non-empty array";
  if (profile.address2 && typeof profile.address2 !== "string") errors.address2 = "Address 2 must be a string";
  return { valid: Object.keys(errors).length === 0, errors };
}

exports.getUserProfile = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await db.query("SELECT * FROM UserProfile WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Profile not found" });
    }

    const row = result.rows[0];
    res.status(200).json({
      fullName: row.full_name,
      address1: row.address, // frontend expects address1
      address2: "", // not in DB schema
      city: row.city,
      state: row.state,
      zipCode: row.zipcode,
      skills: row.skills,
      preferences: row.preferences || "",
      availability: row.availability.map(ts => ts.toISOString().split("T")[0]),
    });
  } catch (err) {
    console.error("Error fetching profile:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateUserProfile = async (req, res) => {
  const id = req.params.id;
  const profile = req.body;
  const { valid, errors } = validateUserProfile(profile);
  if (!valid) return res.status(400).json({ message: "Validation failed", errors });
  console.log("Incoming profile data:", profile);

  try {
    const result = await db.query(
      `INSERT INTO UserProfile (id, full_name, address, city, state, zipcode, skills, preferences, availability)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       ON CONFLICT (id)
       DO UPDATE SET
         full_name = EXCLUDED.full_name,
         address = EXCLUDED.address,
         city = EXCLUDED.city,
         state = EXCLUDED.state,
         zipcode = EXCLUDED.zipcode,
         skills = EXCLUDED.skills,
         preferences = EXCLUDED.preferences,
         availability = EXCLUDED.availability`,
      [
        id,
        profile.fullName,
        profile.address1,
        profile.city,
        profile.state,
        profile.zipCode,
        profile.skills,
        String(profile.preferences),
        profile.availability.map(date => new Date(date)), // convert date strings to timestamp
      ]
    );

    res.status(200).json({ message: "Profile saved successfully" });
  } catch (err) {
    console.error("Error saving profile:", err.message);
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

