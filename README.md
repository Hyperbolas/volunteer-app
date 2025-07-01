# Volunteer App
Getting Started

Download Node.js and install from: https://nodejs.org

Confirm it's working:
'node -v', 
'npm -v'

Open cmd and execute the following:
1. npm install
2. cd volunteer-app
3. npm start

- The server should start and page should appear automatically or open link manually ie. http://localhost:3000/
--------------------------------------
Problem Statement

A non-profit organization has requested to build a software application that will help manage and optimize their volunteer activities. The application should help the organization efficiently allocate volunteers to different events and tasks based on their preferences, skills, and availability. The application should consider the following criteria:

Volunteer’s location
Volunteer’s skills and preferences
Volunteer’s availability
Event requirements and location
Task urgency and priority

---------------------------------------
Assignment 2: Front End

Front end must include the following components:

- Login (Allow volunteers and administrators to register if not registered yet)
- User Registration (Initially only username (use email) and password)
- User Profile Management (After registration, users should log in first to complete their profile). Following fields will be on the profile page/form:
- Full Name (50 characters, required)
- Address 1 (100 characters, required)
- Address 2 (100 characters, optional)
- City (100 characters, required)
- State (Drop Down, selection required) DB will store 2-character state code
- Zip code (9 characters, at least 5-character code required)
- Skills (multi-select dropdown, required)
- Preferences (Text area, optional)
- Availability (Date picker, multiple dates allowed, required)
- Event Management Form (Administrators can create and manage events). The form should include:
- Event Name (100 characters, required)
- Event Description (Text area, required)
-Location (Text area, required)
- Required Skills (Multi-select dropdown, required)
- Urgency (Drop down, selection required)
- Event Date (Calendar, date picker)
- Volunteer Matching Form (A form where administrators can view and match volunteers to events based on their profiles and event requirements):
- Volunteer Name (Auto-fill from database)
- Matched Event (Auto-fill from database based on volunteer's profile)
- Notification System
- Display notifications for new event assignments, updates, and reminders
- Volunteer History
- Tabular display of all volunteer participation history. All fields from Event Management are displayed, along with volunteer’s participation status.
- You should have validations in place for required fields, field types, and field lengths.
Submission Requirements
----------------------------------------------------
Submit a Word/PDF document with your answers.
Use GitHub for your group collaboration and code.
Answer these questions:

GitHub Repository Link (1 point)
Provide the link to your GitHub repository for TAs to view the code.
Design and Development Methodology (1 point)
Discuss if your design and development methodology has changed since Assignment 1 and why.
Front-End Technologies and Responsibilities (2 points)
List what front-end technologies you are using and why. List who is responsible for doing what in your group.
Screenshots of Your Front End (5 points)
Provide screenshots of your front end, each page.

---------------------------------------------------- 

