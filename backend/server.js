require("dotenv").config(); // Make sure this line is at the top
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env.docker') });

// Connect auth routes
const authRoutes = require("./routes/auth");
app.use("/api", authRoutes);

const notificationRoutes = require("./routes/notification");
app.use("/api", notificationRoutes);

//const eventRoutes = require('./routes/eventRoute');
//app.use('/api/eventRoute', eventRoutes);

const historyRoutes = require("./routes/volunteerHistory");
app.use("/api/volunteer-history", historyRoutes);

const userProfileRoutes = require("./routes/userProfile");
app.use("/api", userProfileRoutes);

//Admin View and Create Events
const eventRoutes = require("./routes/eventRoute");
app.use("/api/eventRoute", eventRoutes);

//Volunteer matching Algo
const matchRoutes = require("./routes/matchRoute");
app.use("/api/matches", matchRoutes);

app.get("/", (req, res) => {
  res.send("Backend server is running");
});

const PORT = 5000;
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;
