const { expressjwt } = require("express-jwt");

const jwtAuth = () => {
  return expressjwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
  }).unless({
    path: ["/api/auth/*"],
  });
};

module.exports = jwtAuth;
