const express = require("express");
const router = express.Router();
const { transfer } = require("../controllers/Account");

router.route("/").patch(transfer);

module.exports = router;
