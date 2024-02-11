import express from 'express';
const router = express.Router();
import connectDb from '../config/db.js';
connectDb();
import transactionRoutes from "./transaction.route.js"
import userRoutes from "./user.route.js"

const defaultRoutes = [
    {
        path: "/user", route: userRoutes
    },
    {
        path: "/transactions", route: transactionRoutes
    }
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route)
});

export default router;