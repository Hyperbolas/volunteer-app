const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); 
app.use(express.json());

//Admin View and Create Events 
const eventRoutes = require('./routes/eventRoute');
app.use('/api/eventRoute', eventRoutes); 

//Volunteer matching Algo
const matchRoutes = require('./routes/matchRoute');
app.use('/api/matches', matchRoutes);

const PORT = 5000;
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;
