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