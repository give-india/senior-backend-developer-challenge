const errorMiddleware = (err, req, res, next) => {
  err.message = err.message || "Internal Server Error";
  err.statusCode = err.statusCode || 500;
  console.log(err.type);
  if (err.type === "entity.parse.failed") {
    err.message = "Please check the payload and try again";
  }
  res.status(err.statusCode).json({
    status: false,
    message: err.message,
  });
};

module.exports = errorMiddleware;
