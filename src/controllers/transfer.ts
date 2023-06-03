import { Request, Response } from "express";
import { Transaction } from "../models/transactionModel";
import { Account } from "../models/accountModel";
import { ERROR_CODES, ERROR_MESSAGES } from "../constants/transfer";
import { AccountType } from "../enums/accountEnums";

interface AuthenticatedRequest extends Request {
  userId?: string;
}

export const createTransfer = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const { fromAccountId, toAccountId, amount } = req.body;
    const { userId } = req;

    // Check if the source and destination accounts belong to different users
    const fromAccount = await Account.findById(fromAccountId);
    const toAccount = await Account.findById(toAccountId);

    if (!fromAccount || !toAccount) {
      throw {
        errorCode: ERROR_CODES.ACCOUNT_NOT_FOUND,
        errorMessage: ERROR_MESSAGES.ACCOUNT_NOT_FOUND,
      };
    }
    // Check if the account belongs to the authenticated user
    if (fromAccount.userId.toString() !== userId) {
      throw {
        errorCode: "UNAUTHORIZED_ACCESS",
        errorMessage: "Unauthorized access to account",
      };
    }
    // Check if the accounts belong to the same user
    if (fromAccount.userId.toString() === toAccount.userId.toString()) {
      throw {
        errorCode: ERROR_CODES.SAME_USER_TRANSFER,
        errorMessage: ERROR_MESSAGES.SAME_USER_TRANSFER,
      };
    }

    // Check if the source account has sufficient balance
    if (fromAccount.balance < amount) {
      throw {
        errorCode: ERROR_CODES.INSUFFICIENT_BALANCE,
        errorMessage: ERROR_MESSAGES.INSUFFICIENT_BALANCE,
      };
    }

    // Check if the BasicSavings account exceeds the maximum balance limit
    if (
      toAccount.accountType === AccountType.BasicSavings &&
      toAccount.balance + amount > 50000
    ) {
      throw {
        errorCode: ERROR_CODES.BALANCE_LIMIT_EXCEEDED,
        errorMessage: ERROR_MESSAGES.BALANCE_LIMIT_EXCEEDED,
      };
    }

    // Check if the source and destination accounts are the same
    if (fromAccountId === toAccountId) {
      throw {
        errorCode: ERROR_CODES.SAME_ACCOUNT_TRANSFER,
        errorMessage: ERROR_MESSAGES.SAME_ACCOUNT_TRANSFER,
      };
    }

    // Perform the transfer
    fromAccount.balance -= amount;
    toAccount.balance += amount;

    // Save the updated account balances and create a transaction record
    await Promise.all([fromAccount.save(), toAccount.save()]);
    const transaction = new Transaction({
      fromAccountId,
      toAccountId,
      amount,
    });
    await transaction.save();

    res.json({
      newSrcBalance: fromAccount.balance,
      totalDestBalance: toAccount.balance,
      transferedAt: transaction.transferedAt,
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getTransferHistory = async (req: Request, res: Response) => {
  try {
    const { accountId } = req.params;

    // Check if the account exists
    const account = await Account.findById(accountId);

    if (!account) {
      throw {
        errorCode: ERROR_CODES.ACCOUNT_NOT_FOUND,
        errorMessage: ERROR_MESSAGES.ACCOUNT_NOT_FOUND,
      };
    }

    // Retrieve transaction history for the account
    const transactions = await Transaction.find({
      $or: [{ fromAccountId: accountId }, { toAccountId: accountId }],
    });

    res.json(transactions);
  } catch (error) {
    res.status(400).json(error);
  }
};
