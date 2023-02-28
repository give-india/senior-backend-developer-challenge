import { NextFunction, Request, Response } from 'express';
import { CreateTransactionDto } from '@dtos/transactions.dto';
import { Transaction } from '@interfaces/transactions.interface';
import AccountService from '@/services/accounts.service';
import TransactionService from '@services/transactions.service';

class TransactionController {
  public transactionService = new TransactionService();
  public accountService = new AccountService();

  public getTransactions = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllTransactionsData: Transaction[] = await this.transactionService.findAllTransaction();

      res.status(200).json({ data: findAllTransactionsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getTransactionById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const transactionId: string = req.params.id;
      const findOneTransactionData: Transaction = await this.transactionService.findTransactionById(transactionId);

      res.status(200).json({ data: findOneTransactionData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createTransaction = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const destAccount = await this.accountService.addAmountToAccount(req.body.toAccount, req.body.amount);
      const srcAccount = await this.accountService.subAmountToAccount(req.body.fromAccount, req.body.amount);
      const transactionData: CreateTransactionDto = req.body;
      const createTransactionData: Transaction = await this.transactionService.createTransaction(transactionData);
      res.status(201).json({ data: { srcBalance: srcAccount.balance, destBalance: destAccount.balance, timestamp: createTransactionData.created_at }, message: 'Transaction completed' } );
    } catch (error) {
      next(error);
    }
  };

  public updateTransaction = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const transactionId: string = req.params.id;
      const transactionData: CreateTransactionDto = req.body;
      const updateTransactionData: Transaction = await this.transactionService.updateTransaction(transactionId, transactionData);

      res.status(200).json({ data: updateTransactionData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteTransaction = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const transactionId: string = req.params.id;
      const deleteTransactionData: Transaction = await this.transactionService.deleteTransaction(transactionId);

      res.status(200).json({ data: deleteTransactionData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default TransactionController;
