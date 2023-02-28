import { Router } from 'express';
import TransactionsController from '@controllers/transactions.controller';
import { CreateTransactionDto } from '@dtos/transactions.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import transactionValidationMiddleware from '@/middlewares/transaction.middleware';
import authMiddleware from '@/middlewares/auth.middleware';

class TransactionsRoute implements Routes {
  public path = '/transactions';
  public router = Router();
  public transactionsController = new TransactionsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.transactionsController.getTransactions);
    this.router.get(`${this.path}/:id`, authMiddleware, this.transactionsController.getTransactionById);
    this.router.post(`${this.path}`, authMiddleware, validationMiddleware(CreateTransactionDto, 'body'), transactionValidationMiddleware, this.transactionsController.createTransaction);
    this.router.put(`${this.path}/:id`, authMiddleware, validationMiddleware(CreateTransactionDto, 'body', true), this.transactionsController.updateTransaction);
    this.router.delete(`${this.path}/:id`, authMiddleware, this.transactionsController.deleteTransaction);
  }
}

export default TransactionsRoute;
