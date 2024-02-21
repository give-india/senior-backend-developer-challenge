const { Router } = require('express');
const httpStatus = require('http-status');
const { transferMoneyFunc } = require('../controllers/bankController');

const bankRouter = Router();

bankRouter.post('/transfer', transferMoneyFunc);

// Health check
bankRouter.get('/ping', (req, res) => {
    res.status(httpStatus.OK).send("Pong")
})

module.exports = bankRouter