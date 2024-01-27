const express = require('express');

const app = express();
const port = 3000;

var logger = require('morgan');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Endpoint for transferring amount to different account
app.get('/', (req, res) => {
  const response = {
    status: "App Running; " + (new Date())
  };
  
  res.json(response);
});

var trasnferRouter = require('./routes/transfer');
app.use('/api/transfer', trasnferRouter);

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
