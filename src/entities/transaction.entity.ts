import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Account } from './account.entity';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('bigint')
  amount: BigInt;

  @OneToOne(() => Account)
  from: Account;

  @OneToOne(() => Account)
  to: Account;

  @CreateDateColumn()
  createdAt: Date;
}
