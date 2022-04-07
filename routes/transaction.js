const express = require('express');
const {body} = require('express-validator')
const { getAccount, putAccount, createAccount } = require('../controllers/transactions');
const router = express.Router();

// router.get('/account/:id',getAccount);
router.put('/transfer',putAccount);
router.post('/account',[body('accountType').trim().isLength({min:3}),body('accountId').trim().isLength({min:3}),body('balance').trim().isLength({min:3}),body('userId').trim().isLength({min:3})],createAccount);


module.exports = router;