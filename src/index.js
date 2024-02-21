const express = require('express');
const bankRouter = require('./routes/bankRouter');
const connectToDbFunc = require('./config/dbConnect');
require('dotenv').config();

const PORT = process.env.PORT || 5000;
const app = express();

setTimeout(() => {
    connectToDbFunc();
}, 3000);

app.use(express.json())
app.use('/api', bankRouter);

/**
 * Server Activation
 */
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})