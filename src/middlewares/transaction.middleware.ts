import { NextFunction, Request, Response } from 'express';
import { logger } from '@utils/logger';
import AccountService from '@services/accounts.service';
import { HttpException } from '@/exceptions/HttpException';

/* Validation needs to be added
1. Transfer between accounts belonging to the same user is not allowed.
2. Source account should have the required amount for the transaction to succeed
3. The balance in the ‘BasicSavings’ account type should never exceed Rs. 50,000 */

const accountService = new AccountService();
const transactionValidationMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let currrent_user_id = req.user._id; // getting current logged user id
    const accountData  = await accountService.findAccountById(req.body.toAccount);
    const fromaAccountData  = await accountService.findAccount({_id: req.body.fromAccount, userId: currrent_user_id});
    if(!fromaAccountData) {
      return next(new HttpException(500, 'Account does not exist'));
    }
    const newBalance = accountData.balance + req.body.amount;
    if(String(currrent_user_id) === String(accountData.userId)) {
      return next(new HttpException(500, 'Invalid request! Cannot transfer to the same user'));
    }
    else if(fromaAccountData.balance < req.body.amount) {
      return next(new HttpException(500, 'Insufficient Balance'));
    }
    else if(newBalance > 50000 && accountData.accountType === "BasicSavings") {
      return next(new HttpException(500, 'Problem with your benificiary account type - Basicsavings'));
    } 
    else {
      return next();
    }
  } catch (error) {
    next(error);
  }
};

export default transactionValidationMiddleware;

