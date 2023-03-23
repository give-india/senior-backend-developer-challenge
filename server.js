const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const connectDB = require("./config/dbconfig");

//port
const PORT = process.env.PORT || 4000;

//impport routes
const AuthRoute = require("./Routes/auth.route");
const balancetransferRoute = require("./Routes/balanceTransfer.route");
const userRoute = require("./Routes/user.route");

//import middilwares
const errorMiddleware = require("./middlewares/Error");
const jwtAuth = require("./middlewares/authmiddleware");

//rest object
const app = express();
connectDB();
//middlewares

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes middlewares
app.use("/api/v1/auth", AuthRoute);
app.use(jwtAuth());
app.use("/api/v1", balancetransferRoute);
app.use("/api/v1", userRoute);

//error middleware

app.use(errorMiddleware);

//RUN SERVER
app.listen(PORT, () => {
  console.log(`server runting on http://localhost:${PORT}`);
});
