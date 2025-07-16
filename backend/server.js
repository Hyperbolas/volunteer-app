//references: chatgpt, https://medium.com/@ibrahimhz/creating-your-first-backend-with-node-js-step-by-step-guide-892769af4cb0


const express = require('express');
const app = express();
const PORT = 5000;

app.get('/', (req, res) => {
  res.send('Backend works!');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
