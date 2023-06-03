import { Request, Response } from "express";
import { Account } from "../models/accountModel";
import { User } from "../models/userModel";
import { ERROR_CODES, ERROR_MESSAGES } from "../constants/account";
import { AccountType } from "../enums/accountEnums";

interface AuthenticatedRequest extends Request {
  userId?: string;
}

export const createAccount = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const { accountType, balance } = req.body;
    const { userId } = req;

    // Find the user associated with the provided userId
    const user = await User.findById(userId);
    if (!user) {
      throw {
        errorCode: ERROR_CODES.USER_NOT_FOUND,
        errorMessage: ERROR_MESSAGES.USER_NOT_FOUND,
      };
    }

    // Check if the account type is 'BasicSavings' and the balance exceeds the limit
    if (accountType === AccountType.BasicSavings && balance > 50000) {
      throw {
        errorCode: ERROR_CODES.BALANCE_LIMIT_EXCEEDED,
        errorMessage: ERROR_MESSAGES.BALANCE_LIMIT_EXCEEDED,
      };
    }

    // Check if the balance is less than 0
    if (balance < 0) {
      throw {
        errorCode: ERROR_CODES.INVALID_BALANCE,
        errorMessage: ERROR_MESSAGES.INVALID_BALANCE,
      };
    }

    // Create a new account associated with the user
    const account = new Account({
      userId: user._id,
      accountType,
      balance,
    });

    // Save the account in the database
    await account.save();

    res.status(201).json(account);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getAllAccounts = async (req: Request, res: Response) => {
  try {
    // Retrieve all accounts from the database
    const accounts = await Account.find();

    res.json(accounts);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const updateAccount = async (req: Request, res: Response) => {
  try {
    const accountId = req.params.accountId;
    const { accountType, balance } = req.body;

    // Find the account by ID
    const account = await Account.findById(accountId);
    if (!account) {
      throw {
        errorCode: ERROR_CODES.ACCOUNT_NOT_FOUND,
        errorMessage: ERROR_MESSAGES.ACCOUNT_NOT_FOUND,
      };
    }

    // Update the account details
    account.accountType = accountType;

    // Check if the account type is "BasicSavings" and the balance exceeds 50,000
    if (accountType === AccountType.BasicSavings && balance > 50000) {
      throw {
        errorCode: ERROR_CODES.BALANCE_LIMIT_EXCEEDED,
        errorMessage: ERROR_MESSAGES.BALANCE_LIMIT_EXCEEDED,
      };
    }
    // Check if the balance is less than 0
    if (balance < 0) {
      throw {
        errorCode: ERROR_CODES.INVALID_BALANCE,
        errorMessage: ERROR_MESSAGES.INVALID_BALANCE,
      };
    }

    account.balance = balance;

    // Save the updated account in the database
    await account.save();

    res.json(account);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const deleteAccount = async (req: Request, res: Response) => {
  try {
    const accountId = req.params.accountId;

    // Find the account by ID
    const account = await Account.findById(accountId);
    if (!account) {
      throw {
        errorCode: ERROR_CODES.ACCOUNT_NOT_FOUND,
        errorMessage: ERROR_MESSAGES.ACCOUNT_NOT_FOUND,
      };
    }

    // Delete the account
    await Account.deleteOne({ _id: accountId });

    res.json({ message: "Account deleted successfully" });
  } catch (error) {
    res.status(400).json(error);
  }
};
