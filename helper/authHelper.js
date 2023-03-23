const jwt = require("jsonwebtoken");

exports.isauthUser = async (req) => {
  let token = req.headers.authorization;
  token = token.split(" ")[1];
  let decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded.userid;
};
