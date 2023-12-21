import { Transform } from 'class-transformer';
import { IsInt } from 'class-validator';
import { IsBigInt } from 'class-validator-extended';
import { CreateDateColumn } from 'typeorm';

export class TransferDto {
  @IsInt()
  from: number;

  @IsInt()
  to: number;

  @IsBigInt()
  @Transform(({ value }) => BigInt(value))
  amount: BigInt;

  @CreateDateColumn()
  createdAt: Date;
}
