/* User Credentials */
CREATE TABLE IF NOT EXISTS UserCredentials (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT
);

/* UserProfile */
CREATE TABLE IF NOT EXISTS UserProfile (
  id SERIAL PRIMARY KEY,
  full_name TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  zipcode TEXT,
  skills TEXT[],
  preferences TEXT[],
  availability TIMESTAMP[],
  CONSTRAINT fk_user FOREIGN KEY (id) REFERENCES UserCredentials(id) ON DELETE CASCADE
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
    eventname TEXT,
    requiredskills TEXT[],
    date TEXT[],
    status TEXT,
    volunteer_id INT REFERENCES UserCredentials(id)
);


-- Seed user credentials
INSERT INTO UserCredentials (email, password_hash, role)
VALUES 
  ('alice@example.com', 'hashedpassword1', 'volunteer'),
  ('bob@example.com', 'hashedpassword2', 'volunteer');

-- Seed user profiles
INSERT INTO UserProfile (
  id, full_name, address, city, state, zipcode, skills, preferences, availability
) VALUES 
(
  1, 'Alice Bobby', '123 Main St', 'Houston', 'TX', '77001',
  ARRAY['Cleaning'],
  ARRAY['Evening'],
  ARRAY['2025-08-01 18:00:00'::timestamp]
),
(
  2, 'Bob Lobby', '456 Elm St', 'Houston', 'TX', '77002',
  ARRAY['Cooking', 'Teamwork'],
  ARRAY['Weekend'],
  ARRAY['2025-08-02 09:00:00'::timestamp]
);

-- Seed volunteer history
INSERT INTO VolunteerHistory (eventname, requiredSkills, date, status, volunteer_id)
VALUES 
  ('Warehouse Cleaning', ARRAY['Cleaning'], ARRAY['2025-05-10'], 'Completed', 1),
  ('Shelter Kitchen Shift', ARRAY['Cooking', 'Teamwork'], ARRAY['2025-06-22'], 'Completed', 1),
  ('Community Meeting', ARRAY['Communication'], ARRAY['2025-07-09'], 'Pending', 2);