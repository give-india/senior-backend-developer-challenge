import express from 'express';
const router = express.Router();
import { sendMoney } from '../controllers/transaction.controller.js';
import { checkAuth } from '../middlewares/checkAuth.js';
router.post("/",checkAuth, sendMoney);
export default router;