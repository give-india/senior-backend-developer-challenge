const express = require("express");
const { ctrllogin, ctrlsingup } = require("../controller/ctrllogin");

const router = express.Router();

router.post("/singup", ctrlsingup);
router.post("/login", ctrllogin);

module.exports = router;
