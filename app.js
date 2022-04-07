const express = require('express');
const bodyParser = require('body-parser');
const mongoose =require('mongoose');
const transactionRoutes = require('./routes/transaction'); 
const transactionController = require('./controllers/transactions'); 
const app = express();
const MONGO_DB_CONNECTION_URL = '';
app.use(bodyParser.json());
app.use(transactionController.corsHandler);
app.use('/sbdc',transactionRoutes);
mongoose.connect(MONGO_DB_CONNECTION_URL).then(result=>{
    app.listen(8080);
}).catch(err=>console.log(err))
