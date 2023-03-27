import express from "express";
import bankController from "../controllers/bank.js";
const router = express.Router();

router.get("/accounts", bankController.getAllAccounts);
router.post("/accounts", bankController.createNewAccount);
router.post("/transfer", bankController.moneyTransfer);

export default router;
