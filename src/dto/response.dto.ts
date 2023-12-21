import { Transform } from 'class-transformer';
import { IsDateString } from 'class-validator';
import { IsBigInt } from 'class-validator-extended';

export class ResponseDto {
  @IsBigInt()
  @Transform(({ value }) => BigInt(value))
  newSrcBalance: BigInt;

  @IsBigInt()
  @Transform(({ value }) => BigInt(value))
  totalDestBalance: BigInt;

  @IsBigInt()
  timestamp: string;
}
