import { Router } from "express";
import { authenticateToken } from "../middleware/authorisation";
import { createTransfer, getTransferHistory } from "../controllers/transfer";
import { checkAccountAuthorization } from "../middleware/userAuth";

const router = Router();

router.post("/", authenticateToken, createTransfer);
router.get(
  "/history/:accountId",
  authenticateToken,
  checkAccountAuthorization,
  getTransferHistory
);

export default router;
