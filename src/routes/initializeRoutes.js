const express = require('express');
const { initialize } = require('../controllers/initializeController');

const router = express.Router();

router.post('/', initialize);

module.exports = router;