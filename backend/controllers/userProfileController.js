const dataStore = require("../storage/dataStore");

function validateUserProfile(profile) {
  const errors = {
    fullName: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zipCode: "",
    skills: "",
    preferences: "",
    availability: "",
  };

  if (!profile.fullName) {
    errors.fullName = "Full Name is required";
  }

  if (!profile.address1) {
    errors.address1 = "Address 1 is required";
  }

  if (!profile.city) {
    errors.city = "City is required";
  }

  if (!profile.state) {
    errors.state = "State is required";
  }

  if (!profile.zipCode) {
    errors.zipCode = "Zip Code is required";
  } else if (String(profile.zipCode).length < 5) {
    errors.zipCode = "Zip Code must be at least 5 characters";
  }

  if (!Array.isArray(profile.skills) || profile.skills.length === 0) {
    errors.skills = "Skills must be a non-empty array";
  }

  if (!Array.isArray(profile.availability) || profile.availability.length === 0) {
    errors.availability = "Availability must be a non-empty array";
  }

  if (profile.address2 && typeof profile.address2 !== "string") {
    errors.address2 = "address2 must be a string";
  }

  // Remove empty errors
  Object.keys(errors).forEach((key) => {
    if (errors[key] === "") {
      delete errors[key];
    }
  });

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

exports.getUserProfile = (req, res) => {
  const id = req.params.id;
  const profile = dataStore.profiles[id];

  if (profile) {
    res.status(200).json(profile);
  } else {
    res.status(404).json({ message: "Profile not found" });
  }
};

exports.updateUserProfile = (req, res) => {
  const id = req.params.id;
  const profile = req.body;

  const { valid, errors } = validateUserProfile(profile);

  if (!valid) {
    return res.status(400).json({ message: "Validation failed", errors });
  }

  dataStore.profiles[id] = {
    ...(dataStore.profiles[id] || {}),
    ...profile,
  };

  res.status(200).json({
    message: "Profile saved successfully",
    profile: dataStore.profiles[id],
  });
};
