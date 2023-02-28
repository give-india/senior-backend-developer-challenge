import { IsEmail, IsString, IsNotEmpty, IsEnum } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  public first_name: string;
  
  @IsString()
  @IsNotEmpty()
  public last_name: string;
  
  @IsString()
  @IsNotEmpty()
  public address: string;
  
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsString()
  @IsNotEmpty()
  public password: string;
  
  @IsString()
  @IsNotEmpty()
  @IsEnum(['Savings', 'Current', 'BasicSavings'])
  public account_type: string;
}
