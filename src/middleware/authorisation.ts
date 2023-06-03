import { Request, Response, NextFunction } from "express";
import jwt, { Secret } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

interface AuthenticatedRequest extends Request {
  userId?: string;
}

const JWT_SECRET: Secret = process.env.JWT_SECRET || "";

// Create a middleware to authenticate the token and set the userId in the request object
export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      throw {
        errorCode: "UNAUTHORIZED_ACCESS",
        errorMessage: "No token provided",
      };
    }

    // Verify the token and extract the userId
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    const userId = decoded.userId;

    // Set the userId in the request object
    (req as AuthenticatedRequest).userId = userId;

    next();
  } catch (error) {
    res.status(401).json(error); // Unauthorized
  }
};
