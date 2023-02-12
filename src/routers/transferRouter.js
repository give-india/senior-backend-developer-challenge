const express = require('express');
const transferController = require('../controllers/transferController');
const checkAccount = require('../middlewares/checkAccount');

const router = express.Router();
router.use(checkAccount);


router.route('/').post(transferController.sendMoney);

module.exports = router;
