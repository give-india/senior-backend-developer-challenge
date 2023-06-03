import { Router } from "express";
import { validateUserData } from "../middleware/userValidators";
import { createUser, getAllUsers, login } from "../controllers/user";

const router = Router();

router.post("/", validateUserData, createUser);
router.post("/login", login);
router.get("/", getAllUsers);

export default router;
