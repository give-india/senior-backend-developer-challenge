import { hash } from 'bcrypt';
import { CreateTransactionDto } from '@dtos/transactions.dto';
import { HttpException } from '@exceptions/HttpException';
import { Transaction } from '@interfaces/transactions.interface';
import transactionModel from '@models/transactions.model';
import { isEmpty } from '@utils/util';

class TransactionService {
  public transactions = transactionModel;

  public async findAllTransaction(): Promise<Transaction[]> {
    const transactions: Transaction[] = await this.transactions.find();
    return transactions;
  }

  public async findTransactionById(transactionId: string): Promise<Transaction> {
    if (isEmpty(transactionId)) throw new HttpException(400, "TransactionId is empty");

    const findTransaction: Transaction = await this.transactions.findOne({ _id: transactionId });
    if (!findTransaction) throw new HttpException(409, "Transaction doesn't exist");

    return findTransaction;
  }

  public async createTransaction(transactionData: CreateTransactionDto): Promise<Transaction> {
    if (isEmpty(transactionData)) throw new HttpException(400, "transactionData is empty");

    const createTransactionData: Transaction = await this.transactions.create({ ...transactionData });

    return createTransactionData;
  }

  public async updateTransaction(transactionId: string, transactionData: CreateTransactionDto): Promise<Transaction> {
    if (isEmpty(transactionData)) throw new HttpException(400, "transactionData is empty");

    const updateTransactionById: Transaction = await this.transactions.findByIdAndUpdate(transactionId, { transactionData });
    if (!updateTransactionById) throw new HttpException(409, "Transaction doesn't exist");

    return updateTransactionById;
  }

  public async deleteTransaction(transactionId: string): Promise<Transaction> {
    const deleteTransactionById: Transaction = await this.transactions.findByIdAndDelete(transactionId);
    if (!deleteTransactionById) throw new HttpException(409, "Transaction doesn't exist");

    return deleteTransactionById;
  }
}

export default TransactionService;
