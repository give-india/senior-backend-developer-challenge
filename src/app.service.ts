import {
  HttpException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, MoreThanOrEqual, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUsersAndAccountsDTO } from './dto/create-user-and-accounts.dto';
import { Account, AccountType } from './entities/account.entity';
import { TransferDto } from './dto/transfer.dto';
import { ResponseDto } from './dto/response.dto';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {}

  async createUsersAndAccounts(dto: CreateUsersAndAccountsDTO) {
    const users = dto.users.map(async (dto) => {
      const user = this.userRepository.create();
      const accounts = this.accountRepository.create(dto.accounts);
      user.accounts = await this.accountRepository.save(accounts);
      return user;
    });
    return this.userRepository.save(await Promise.all(users));
  }

  async transferMoney(dto: TransferDto): Promise<ResponseDto> {
    try {
      const fromAccount = await this.accountRepository.findOne({
        where: { id: dto.from },
        relations: ['user'],
      });
      if (!fromAccount) {
        throw new NotFoundException('From account not found');
      }
      if (fromAccount.balance < dto.amount) {
        throw new NotAcceptableException(
          'Insufficient balance in from account',
        );
      }
      const toAccount = await this.accountRepository.findOne({
        where: { id: dto.to },
        relations: ['user'],
      });
      if (!toAccount) {
        throw new NotFoundException('To account not found');
      }
      if (fromAccount.id === toAccount.id) {
        throw new NotAcceptableException('Cannot transfer to same account');
      }
      if (fromAccount.user.id === toAccount.user.id) {
        throw new NotAcceptableException('Cannot transfer between same users');
      }
      if (
        toAccount.type === AccountType.BASIC &&
        // @ts-ignore
        toAccount.balance + dto.amount > 5_000_000n
      ) {
        throw new NotAcceptableException(
          'Basic account cannot have more than 50000 inr balance',
        );
      }
      const transfer = this.transactionRepository.create({
        amount: dto.amount,
        from: fromAccount,
        to: toAccount,
      });
      const t = await this.transactionRepository.save(transfer);
      // @ts-ignore
      fromAccount.balance -= dto.amount;
      // @ts-ignore
      toAccount.balance += dto.amount;
      // can be move to transfer subscriber
      await this.accountRepository.save([fromAccount, toAccount]);
      return {
        newSrcBalance: fromAccount.balance,
        totalDestBalance: toAccount.balance,
        timestamp: t.createdAt.toUTCString(),
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(error.message, 500);
    }
  }
}
