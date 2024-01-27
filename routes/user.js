var express = require('express');
var router = express.Router();

// Endpoint for transferring amount to different account
router.post('/', function(req, res, next) {
  const { firstName, lastName } = req.body;
  const userData = {
    first_name: firstName,
    last_name: lastName,
    status: 'active'
  };
  req.repo.add("user", userData);
  res.json({ success: true, message: 'User Created successful', data: req.body});
});

module.exports = router;
