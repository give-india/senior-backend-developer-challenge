import { hash } from 'bcrypt';
import { CreateAccountDto } from '@dtos/accounts.dto';
import { HttpException } from '@exceptions/HttpException';
import { Account } from '@interfaces/accounts.interface';
import accountModel from '@models/accounts.model';
import { isEmpty } from '@utils/util';
import { Schema } from 'mongoose';

class AccountService {
  public accounts = accountModel;

  public async addAmountToAccount(accountId:string, amount: number): Promise<Account> {
    const updateAccountById: Account = await this.accounts.findByIdAndUpdate(accountId, { $inc: { balance: amount }}, { new: true} );
    return updateAccountById;
  }
  
  public async subAmountToAccount(accountId:string, amount: number): Promise<Account> {
    const updateAccountById: Account = await this.accounts.findByIdAndUpdate(accountId, { $inc: { balance: -amount }}, { new: true} );
    return updateAccountById;
  }

  public async getBalanceByUserId(userId): Promise<Number> {
    const accounts: Account[] = await this.accounts.find({userId});
    return accounts.reduce((a, c) => {
      return a + c.balance;
    }, 0);
  }
  
  public async findAllAccount(): Promise<Account[]> {
    const accounts: Account[] = await this.accounts.find();
    return accounts;
  }
  
  public async findAllAccountsById(userId): Promise<Account[]> {
    const accounts: Account[] = await this.accounts.find({userId});
    return accounts;
  }

  public async findAccount(cond): Promise<Account> {
    const accounts: Account = await this.accounts.findOne(cond);
    return accounts;
  }

  public async findAccountById(accountId: string): Promise<Account> {
    if (isEmpty(accountId)) throw new HttpException(400, "AccountId is empty");

    const findAccount: Account = await this.accounts.findOne({ _id: accountId });
    if (!findAccount) throw new HttpException(409, "Account doesn't exist");

    return findAccount;
  }

  public async createAccount(accountData: CreateAccountDto): Promise<Account> {
    if (isEmpty(accountData)) throw new HttpException(400, "accountData is empty");

    const createAccountData: Account = await this.accounts.create({ ...accountData });

    return createAccountData;
  }

  public async updateAccount(accountId: string, amount: number): Promise<Account> {
    if (isEmpty(accountId)) throw new HttpException(400, "accountData is empty");

    const updateAccountById: Account = await this.accounts.findByIdAndUpdate(accountId, { balance: amount });
    if (!updateAccountById) throw new HttpException(409, "Account doesn't exist");

    return updateAccountById;
  }

  public async deleteAccount(accountId: string): Promise<Account> {
    const deleteAccountById: Account = await this.accounts.findByIdAndDelete(accountId);
    if (!deleteAccountById) throw new HttpException(409, "Account doesn't exist");

    return deleteAccountById;
  }
}

export default AccountService;
