const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Connect auth routes
const authRoutes = require("./routes/auth");
app.use("/api", authRoutes);

const notificationRoutes = require("./routes/notification");
app.use("/api", notificationRoutes);

const eventRoutes = require('./routes/eventRoute');
app.use('/api/eventRoute', eventRoutes); 

const historyRoutes = require("./routes/volunteerHistory");
app.use("/api", historyRoutes);

const userProfileRoutes = require('./routes/userProfile'); 
app.use('/api', userProfileRoutes);


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