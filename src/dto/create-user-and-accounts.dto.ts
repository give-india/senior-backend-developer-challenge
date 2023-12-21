import { Transform, Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsDefined,
  IsEnum,
  Min,
  MinLength,
  ValidateNested,
  isDefined,
} from 'class-validator';
import { IsBigInt } from 'class-validator-extended';
import { AccountType } from 'src/entities/account.entity';

class CrateAccountDTO {
  @IsBigInt()
  @Transform(({ value }) => BigInt(value))
  balance: BigInt;

  @IsEnum(AccountType)
  type: AccountType;
}

class CreateUsersDTO {
  @ValidateNested({ each: true })
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => CrateAccountDTO)
  accounts: CrateAccountDTO[];
}

export class CreateUsersAndAccountsDTO {
  @ValidateNested({ each: true })
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => CreateUsersDTO)
  users: CreateUsersDTO[];
}
