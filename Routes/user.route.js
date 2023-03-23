const express = require("express");
const router = express.Router();

const { ctrladdAccount, ctrlUserDetail } = require("../controller/ctrlUser");

router.get("/userDetails", ctrlUserDetail);
router.put("/addaccount", ctrladdAccount);

module.exports = router;
