import {  IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { Schema } from 'mongoose';

export class CreateAccountDto {
  @IsString()
  @IsNotEmpty()
  public userId: Schema.Types.ObjectId;
  
  @IsString()
  @IsNotEmpty()
  public accountType: string;

  @IsNumber()
  @IsNotEmpty()
  public balance: number;
  
}
