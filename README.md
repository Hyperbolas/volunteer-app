# Volunteer App

## Getting Started

## Docker Instructions
Docker will setup frontend+backend+database

<pre>
  # 1. Copy the example enviroment file 
  cp .env.example .env.docker
</pre>
<pre>
  # 2. Change the username and password in .env.docker to your own
  POSTGRES_USER
  POSTGRES_PASSWORD
  PGUSER, PGPASSWORD — chnage to same creds as above if you want
</pre>
<pre>
  # 3. Start the app 
  docker-compose --env-file .env.docker up --build

  # 4. Navigate to web app
  http://localhost:3000/
</pre>

----
For just Front end and backend, do the following: 

## React Start

Download Node.js and install from: https://nodejs.org

Confirm it's working:
'node -v',
'npm -v'

Open cmd and execute the following:
<pre>
  npm install
  cd frontend
  npm start
</pre>

- The server should start and page should appear automatically or open link manually ie. http://localhost:3000/
## Nodejs Start 
<pre> 
  cd backend
  npm run dev
</pre>



---

In order to use the multi-date picker execute npm install react-multi-date-picker

Problem Statement

A non-profit organization has requested to build a software application that will help manage and optimize their volunteer activities. The application should help the organization efficiently allocate volunteers to different events and tasks based on their preferences, skills, and availability. The application should consider the following criteria:

Volunteer’s location
Volunteer’s skills and preferences
Volunteer’s availability
Event requirements and location
Task urgency and priority

---

## Assignment 2: Front End

Front end must include the following components:

- Login (Allow volunteers and administrators to register if not registered yet)
- User Registration (Initially only username (use email) and password)
- User Profile Management (After registration, users should log in first to complete their profile). Following fields will be on the profile page/form:
  Full Name (50 characters, required)
  Address 1 (100 characters, required)
  Address 2 (100 characters, optional)
  City (100 characters, required)
  State (Drop Down, selection required) DB will store 2-character state code
  Zip code (9 characters, at least 5-character code required)
  Skills (multi-select dropdown, required)
  Preferences (Text area, optional)
  Availability (Date picker, multiple dates allowed, required)
- Event Management Form (Administrators can create and manage events). The form should include:
  Event Name (100 characters, required)
  Event Description (Text area, required)
  Location (Text area, required)
  Required Skills (Multi-select dropdown, required)
  Urgency (Drop down, selection required)
  Event Date (Calendar, date picker)
- Volunteer Matching Form (A form where administrators can view and match volunteers to events based on their profiles and event requirements):
  Volunteer Name (Auto-fill from database)
- Matched Event (Auto-fill from database based on volunteer's profile)
- Notification System
- Display notifications for new event assignments, updates, and reminders
- Volunteer History
- Tabular display of all volunteer participation history. All fields from Event Management are displayed, along with volunteer’s participation status.
- You should have validations in place for required fields, field types, and field lengths.
  Submission Requirements

---

Submit a Word/PDF document with your answers.
Use GitHub for your group collaboration and code.
Answer these questions:

- GitHub Repository Link (1 point)
  Provide the link to your GitHub repository for TAs to view the code.
- Design and Development Methodology (1 point)
  Discuss if your design and development methodology has changed since Assignment 1 and why.
- Front-End Technologies and Responsibilities (2 points)
  List what front-end technologies you are using and why. List who is responsible for doing what in your group.
  -Screenshots of Your Front End (5 points)
  Provide screenshots of your front end, each page.

---

## Assignment 3: Back-End

Back end must include the following components/modules:

- Login Module: Handle user authentication, registration, and login functionality.
- User Profile Management Module: Manage user profile data, including location, skills, preferences, and availability.
- Event Management Module: Create and manage events, including required skills, location, urgency, and event details.
- Volunteer Matching Module: Implement logic to match volunteers to events based on their profiles and event requirements.
- Notification Module: Logic to send notifications to volunteers for event assignments, updates, and reminders.
- Volunteer History Module: Track and display volunteer participation history.
  
## Important Deliverables
- Validations: Ensure validations are in place for required fields, field types, and field lengths in the backend code.

- Unit Tests: All backend code should be covered by unit tests. Code coverage should be greater than 80%. Research how to run the code coverage reports. Each IDE has plugins to generate reports. Here are a few pointers: Stackify Code Coverage ToolsLinks to an external site.

- Integration with Front End: All front-end components should be connected to the back end. Form data should be populated from the back end. The back end should receive data from the front end, validate it, and prepare it to persist to the database.

- No Database Implementation: We are not implementing the database yet. For this assignment, you can hard code the values.

---

## Assignment 4: Database Implementation

You can use RDBMS or NoSQL database.

Database must include the following tables/documents:

- UserCredentials: (ID & password), password should be encrypted.
- UserProfile: Stores user details like full name, address, city, state, zipcode, skills, preferences, and availability.
- EventDetails: Stores details of the events such as event name, description, location, required skills, urgency, and event date.
- VolunteerHistory: Tracks volunteer participation in events.
- States: Stores state codes and names (if required).
  
## Important Deliverables
- Validations: Ensure validations are in place for required fields, field types, and field lengths.
- Data Retrieval and Display: Backend should retrieve data from the database and display it to the front end.
- Data Persistence: Form data should be populated from the backend. The backend should receive data from the front end, validate it, and persist it to the database.
- Unit Tests: Any new code added should be covered by unit tests. Keep code coverage above 80%.
