var express = require('express');
var router = express.Router();

// Endpoint to create a account
router.post('/', function(req, res, next) {
  const { fromAccountId, toAccountId, amount } = req.body;
 
  res.json({ success: true, message: 'Transfer successful', data: req.body});

});

module.exports = router;
