const winston = require("winston");

module.exports = function (err, req, res, next) {
  winston.error(err.message, err);
  console.log(err);
  return res.status(400).json({ message: "Something failed" });
};
