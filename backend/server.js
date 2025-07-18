const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); 
app.use(express.json());

const eventRoutes = require('./routes/eventRoute');
app.use('/api/eventRoute', eventRoutes); 

const PORT = 5000;
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;
