exports.getUserProfile = (req, res, dataStore) => {
  const id = req.params.id;
  const profile = dataStore.profiles[id];

  if (profile) {
    res.json(profile);
  } else {
    res.status(404).json({ message: "Profile not found" });
  }
};

exports.updateUserProfile = (req, res, dataStore) => {
  const id = req.params.id;
  const updatedData = req.body;

  const requiredFields = [
    'fullName',
    'address1',
    'city',
    'state',
    'zipCode',
    'skills',
    'availability'
  ];
  const missing = requiredFields.filter(f => !updatedData[f]);
  if (missing.length) {
    return res
      .status(400)
      .json({ message: `Missing fields: ${missing.join(', ')}` });
  }

  // Create if not exists, or merge if it does
  dataStore.profiles[id] = {
    ...(dataStore.profiles[id] || {}),
    ...updatedData
  };

  res.json({
    message: dataStore.profiles[id] ? "Profile updated" : "Profile created",
    profile: dataStore.profiles[id]
  });
};
