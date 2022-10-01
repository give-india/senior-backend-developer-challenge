import {addUserData, addAccountData, transferAmount} from './controller/transaction.js';
import { connectMongo } from './config/config.js'
import express from 'express';
import bodyParser from 'body-parser'
var app = express();
app.use(bodyParser.json({ limit: '5mb' }))
connectMongo()
app.get('/', function (req, res) {
  res.send('Hello World!');
});  
app.post('/add-ueser', addUserData);
app.post('/add-account', addAccountData);
app.post('/transfer-amount', transferAmount);
app.listen(3001, function () {
  console.log('Example app listening on port 3001!');
});