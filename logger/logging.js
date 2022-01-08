const winston = require("winston");
require("express-async-errors");

const myFormat = winston.format.printf(
  ({ level, message, timestamp, ...metadata }) => {
    let msg = `${level}: ${timestamp}: `;
    if (metadata) {
      msg += JSON.stringify(metadata);
    }
    return msg;
  }
);

module.exports = function () {
  winston.add(
    new winston.transports.File({
      filename: "logfile.log",
      handleExceptions: true,
      colorize: { all: true },
      format: winston.format.combine(
        winston.format.timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
        winston.format.splat(),
        winston.format.align(),
        myFormat
      ),
    })
  );
};
