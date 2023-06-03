import { Request, Response, NextFunction } from "express";
import { Secret } from "jsonwebtoken";
import { Account } from "../models/accountModel";
import { ERROR_CODES, ERROR_MESSAGES } from "../constants/user";
import dotenv from "dotenv";
dotenv.config();

interface AuthenticatedRequest extends Request {
  userId?: string;
}

const JWT_SECRET: Secret = process.env.JWT_SECRET || "";

export const checkAccountAuthorization = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const accountId = req.params.accountId;
    const { userId } = req;

    // Find the account by ID
    const account = await Account.findById(accountId);
    if (!account) {
      throw {
        errorCode: ERROR_CODES.ACCOUNT_NOT_FOUND,
        errorMessage: ERROR_MESSAGES.ACCOUNT_NOT_FOUND,
      };
    }

    // Check if the account belongs to the authenticated user
    if (account.userId.toString() !== userId) {
      throw {
        errorCode: ERROR_CODES.UNAUTHORIZED_ACCESS,
        errorMessage: ERROR_MESSAGES.UNAUTHORIZED_ACCESS,
      };
    }

    next();
  } catch (error) {
    res.status(401).json(error); // Unauthorized
  }
};
