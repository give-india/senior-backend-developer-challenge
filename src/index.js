const express= require("express");
const dotenv = require('dotenv').config();
const bodyParser= require("body-parser");
const transferRoutes = require('./routers/transferRouter');
const helmet = require('helmet');
const cors = require('cors');
const globalErrorHandler = require('./middlewares/globalErrorHandler');
const AppError = require('./utils/appError');

const port= process.env.port || 7000;
const app= express();
app.use(cors({
    origin: '*'
}));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// set security http headers
app.use(helmet());
// error handling middleware
app.use(globalErrorHandler);
// console.log(process.env);
app.use('/transfer', transferRoutes);

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on the server`, 404));
});
  


app.listen(port, () => {
    console.log(`Listening port ${port}`);
    
})