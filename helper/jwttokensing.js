const jwt = require("jsonwebtoken");
const { trycatchBlock } = require("../utils/trycatchblock");

exports.authloginJwt = async (user) => {
  const secret = process.env.JWT_SECRET;

  const token = jwt.sign({ userid: user._id }, secret, { expiresIn: "1h" });

  return token;
};
