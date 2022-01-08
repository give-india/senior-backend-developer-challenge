const express = require("express");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
require("dotenv").config();
require("./logger/logging")();

const account = require("./routes/account/account");
const user = require("./routes/users/user");
const error = require("./middleware/error");

app.use("/", express.static(__dirname + "/"));
app.use(
  express.json({ limit: "50mb" }),
  express.urlencoded({ extended: true, limit: "50mb", parameterLimit: 10000 }),
  cookieParser(),
  helmet(),
  cors()
);

//User routes
app.use("/api/users", user);

//Banking routes
app.use("/api/account", account);

//error log
app.use(error);

app.listen(process.env.PORT, () => {
  console.log(`App running on port ${process.env.PORT || 3000}.`);
});
