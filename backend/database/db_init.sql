/* User Credentials */
CREATE TABLE IF NOT EXISTS UserCredentials (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL
);

/* UserProfile */
CREATE TABLE IF NOT EXISTS UserProfile (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES UserCredentials(id) ON DELETE CASCADE,
  full_name TEXT,
  location TEXT,
  skills TEXT[],
  preferences TEXT[],
  availability TIMESTAMP[]
);

/* Events */
CREATE TABLE IF NOT EXISTS Events (
  id SERIAL PRIMARY KEY,
  eventName TEXT,
  description TEXT,
  location TEXT,
  required_skills TEXT[],
  urgency TEXT,
  event_date TIMESTAMP[],
);

/* UserEvents */
CREATE TABLE IF NOT EXISTS UserEvents (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES UserCredentials(id),
  event_id INT REFERENCES Events(id),
  status TEXT
);

/* VolunteerHistory */
CREATE TABLE IF NOT EXISTS VolunteerHistory (
    id SERIAL PRIMARY KEY,
    volunteerName TEXT,
    eventName TEXT
    requiredSkills TEXT[]
    date TIMESTAMP[],
    status TEXT
);