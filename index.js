const express = require('express');
const app = express();
const port = 3000;

// Endpoint for transferring amount to different account
app.get('/api/transfer', (req, res) => {
  const response = {
    status: "OK"
  };
  
  res.json(response);
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
