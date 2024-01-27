const express = require('express');

const app = express();
const port = 3000;

var logger = require('morgan');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const repo  = require("./repo");
console.log("Repo: collections:" + Object.keys(repo.config.collections));

app.use(function(req, res, next) {
    req.repo = repo.repository;
    console.log("Middleware Created: Added Repo to Req Object.");
    next();
});

/* GET App Status. */
app.get('/', (req, res) => {
  const response = {
    status: "App Running; " + (new Date())
  };
  
  res.json(response);
});

let userRouter = require('./routes/user');
app.use('/api/user', userRouter);

let accountTypeRouter = require('./routes/account_type');
app.use('/api/account_type', accountTypeRouter);

let accountRouter = require('./routes/account');
app.use('/api/account', accountRouter);

let trasnferRouter = require('./routes/transfer');
app.use('/api/transfer', trasnferRouter);

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
