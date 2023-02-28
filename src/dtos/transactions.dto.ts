import {  IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateTransactionDto {
  @IsString()
  @IsNotEmpty()
  public fromAccount: string;
  
  @IsString()
  @IsNotEmpty()
  public toAccount: string;
  
  @IsNumber()
  @IsNotEmpty()
  public amount: number;
  
}
