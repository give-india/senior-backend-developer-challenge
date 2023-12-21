import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';
import { Account } from './entities/account.entity';
import { User } from './entities/user.entity';
import { Transaction } from './entities/transaction.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: path.join(__dirname, '..', 'db.sqlite'),
      entities: [path.join(__dirname, '**/*.entity{.ts,.js}')],
      synchronize: true,
      logging: true,
    }),
    TypeOrmModule.forFeature([User, Account, Transaction]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
