var express = require('express');
var router = express.Router();

// Endpoint for transferring amount to different account
router.post('/', function(req, res, next) {
  const { fromAccountId, toAccountId, amount } = req.body;
  const transferData = {
    from_account_id: fromAccountId,
    to_account_id: toAccountId,
    amount: amount,
    status: 'ok',
    status_code: 200,
    messages: "Success"
  };
  req.repo.add("transfer", transferData);
  res.json({ success: true, message: 'Transfer successful', data: req.body});
});

module.exports = router;
