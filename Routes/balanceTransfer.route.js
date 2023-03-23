/*Impport details */
const express = require("express");
const router = express.Router();

/* Imports Controler */
const {
  ctrlBalancetransfer,
  ctrlAddBalance,
} = require("../controller/ctrlBalanceTransfer");

router.post("/balancetransfer", ctrlBalancetransfer);
router.post("/addbalance", ctrlAddBalance);

module.exports = router;
