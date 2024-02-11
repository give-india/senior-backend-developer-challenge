import UserModel from "../models/users.model.js";
import jwt from 'jsonwebtoken';

const TOKEN = process.env.TOKEN_KEY || "aBCDEFGHIJKLM";
export async function checkAuth(req, res, next) {
    try {
        let token = req.headers["token"];
        if (token) {
            try {
                const decoded = jwt.verify(token, TOKEN);
                req.user = decoded;

                const user = await UserModel.findOne({ emailId: decoded.emailId });
                if (!user) {
                    return res.send("Authentication failed");
                }
                next();
            } catch (error) {
                return res.status(401).json({ msg: "Invalid User Auth Token", err: error.message });
            }
        }
        else {
            return res.status(400).json({ msg: "No Auth Token Found", err: "No Auth Token Found" });
        }
    } catch (error) {
        throw new Error(error.message);
    }
}