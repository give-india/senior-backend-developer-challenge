import express from 'express';
const router = express.Router();
import { getToken } from '../controllers/user.controller.js';

router.post("/token", getToken);
export default router;