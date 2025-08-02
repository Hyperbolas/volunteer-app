/* User Credentials */
CREATE TABLE IF NOT EXISTS UserCredentials (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

/* UserProfile */
CREATE TABLE IF NOT EXISTS UserProfile (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES UserCredentials(id) ON DELETE CASCADE,
  full_name TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  zipcode TEXT,
  skills TEXT[],
  preferences TEXT[],
  availability TIMESTAMP[]
);

/* EventDetails */
CREATE TABLE IF NOT EXISTS EventDetails (
  id SERIAL PRIMARY KEY,
  eventname TEXT,
  description TEXT,
  location TEXT,
  skills TEXT[],
  urgency TEXT,
  date TEXT[],
  status TEXT
);

/* UserEvents */
CREATE TABLE IF NOT EXISTS UserEvents (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES UserCredentials(id),
  event_id INT REFERENCES EventDetails(id),
  status TEXT
);

/* VolunteerHistory */
CREATE TABLE IF NOT EXISTS VolunteerHistory (
    id SERIAL PRIMARY KEY,
    volunteerName TEXT,
    eventname TEXT,
    requiredSkills TEXT[],
    date TEXT[],
    status TEXT
);