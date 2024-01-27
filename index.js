const express = require('express');

const app = express();
const port = 3000;

var logger = require('morgan');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* GET App Status. */
app.get('/', (req, res) => {
  const response = {
    status: "App Running; " + (new Date())
  };
  
  res.json(response);
});

let accountRouter = require('./routes/account');
app.use('/api/account', accountRouter);

let trasnferRouter = require('./routes/transfer');
app.use('/api/transfer', trasnferRouter);

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
