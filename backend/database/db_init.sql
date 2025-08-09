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
  user_id INT UNIQUE REFERENCES UserCredentials(id) ON DELETE CASCADE,
  full_name TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  zipcode TEXT,
  skills TEXT[],
  preferences TEXT,
  availability TIMESTAMP[]
  --CONSTRAINT fk_user FOREIGN KEY (id) REFERENCES UserCredentials(id) ON DELETE CASCADE
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
  status TEXT,
  UNIQUE (user_id, event_id)
);

/* Notifications */
CREATE TABLE IF NOT EXISTS Notifications (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES UserCredentials(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  read BOOLEAN DEFAULT FALSE
);

-- Seed user credentials
INSERT INTO UserCredentials (email, password_hash, role)
VALUES 
  ('alice@example.com', 'hashedpassword1', 'volunteer'),
  ('bob@example.com', 'hashedpassword2', 'volunteer');

-- Seed user profiles
INSERT INTO UserProfile (user_id, full_name, address, city, state, zipcode, skills, preferences, availability) VALUES
  ( (SELECT id FROM UserCredentials WHERE email='alice@example.com'),
    'Alice Bobby', '123 Main St', 'Houston', 'TX', '77001',
    ARRAY['Cleaning'], 'Evening', ARRAY['2025-08-01 18:00:00'::timestamp] ),
  ( (SELECT id FROM UserCredentials WHERE email='bob@example.com'),
    'Bob Lobby', '456 Elm St', 'Houston', 'TX', '77002',
    ARRAY['Cooking','Teamwork'], 'Weekend', ARRAY['2025-08-02 09:00:00'::timestamp] );


INSERT INTO EventDetails (eventname, description, location, skills, urgency, date, status) VALUES
  ('Food Drive','Help collect food items for food bank','Houston, TX', ARRAY['Teamwork','Organization'],'Medium', ARRAY['2025-08-25','2025-08-20'],'Active'),
  ('Beach Cleanup','Help clean beach','Galveston, TX', ARRAY['Teamwork','Organization','Cleaning'],'High', ARRAY['2025-08-20','2025-08-21'],'Active'),
  ('Toy Donation','Help collect toy items for shelters','Austin, TX', ARRAY['Teamwork','Organization'],'Low', ARRAY['2025-09-02','2025-10-20'],'Active'),
  ('Community Garden','Assist with planting and weeding','Dallas, TX', ARRAY['Teamwork'],'Medium', ARRAY['2025-08-18','2025-08-25'],'Active'),
  ('Blood Drive','Support setup and registration for blood donors','Houston, TX', ARRAY['Organization','Communication'],'High', ARRAY['2025-08-22'],'Active'),
  ('Animal Shelter Help','Assist feeding/cleaning for animals','San Antonio, TX', ARRAY['Cleaning','Teamwork'],'Medium', ARRAY['2025-08-30'],'Active'),
  ('School Supply Drive','Help organize donated school supplies','El Paso, TX', ARRAY['Organization','Teamwork'],'Low', ARRAY['2025-09-01','2025-09-05'],'Active'),
  ('Senior Tech Support','Teach seniors basic tech skills','Austin, TX', ARRAY['Communication'],'Medium', ARRAY['2025-08-28','2025-09-03'],'Active'),
  ('Habitat Build','Assist in building affordable homes','Houston, TX', ARRAY['Teamwork','Organization'],'High', ARRAY['2025-08-27','2025-08-28'],'Active'),
  ('Park Restoration','Replant and beautify local parks','Fort Worth, TX', ARRAY['Teamwork','Cleaning'],'Medium', ARRAY['2025-08-23','2025-08-29'],'Active');


INSERT INTO UserEvents (user_id, event_id, status) VALUES
  ((SELECT id FROM UserCredentials WHERE email='alice@example.com'), 1, 'Completed'),
  ((SELECT id FROM UserCredentials WHERE email='alice@example.com'), 2, 'Completed'),
  ((SELECT id FROM UserCredentials WHERE email='alice@example.com'), 5, 'Pending'),
  ((SELECT id FROM UserCredentials WHERE email='bob@example.com'),   3, 'Completed'),
  ((SELECT id FROM UserCredentials WHERE email='bob@example.com'),   6, 'Pending'),
  ((SELECT id FROM UserCredentials WHERE email='bob@example.com'),   9, 'Completed');
