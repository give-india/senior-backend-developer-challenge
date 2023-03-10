import express from "express";
import { BankRoutes } from "./bank";

const router = express.Router();

router.use("/api", new BankRoutes().router);

export { router as routes };
