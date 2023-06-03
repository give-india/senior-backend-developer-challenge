import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import userRoutes from "./src/routes/user";
import accountRoutes from "./src/routes/account";
import transferRoutes from "./src/routes/transfer";
import "./src/db";
import { authenticateToken } from "./src/middleware/authorisation";
dotenv.config();

const app = express();
app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the Money Transfer API!");
});

app.use("/users", userRoutes);
app.use("/accounts", authenticateToken, accountRoutes);
app.use("/transfer", authenticateToken, transferRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
