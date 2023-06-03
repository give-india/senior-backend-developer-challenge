import { Router } from "express";
import { checkAccountAuthorization } from "../middleware/userAuth";
import {
  createAccount,
  getAllAccounts,
  updateAccount,
  deleteAccount,
} from "../controllers/account";

const router = Router();

router.post("/", createAccount);
router.get("/", getAllAccounts);
router.put("/:accountId", checkAccountAuthorization, updateAccount);
router.delete("/:accountId", checkAccountAuthorization, deleteAccount);

export default router;
