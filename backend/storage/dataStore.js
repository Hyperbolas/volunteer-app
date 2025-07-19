//hard coded data, will be replaced with db
const dataStore = {
  profiles: {
    "1": {
      fullName: "Santa Claude",
      address1: "123 Main St",
      address2: "",
      city: "Houston",
      state: "TX",
      zipCode: "77001",
      skills: ["cleaning", "communication"],
      preferences: "Prefer holidays like Christmas",
      availability: ["2025-08-01", "2025-08-15"]
    }
    //can add more user ids
  }
};

module.exports = dataStore;
